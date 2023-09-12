import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Navbar from '../../components/Nav/Nav';
import {
  Upload,
  UploadTop,
  UploadTop1,
  UploadTop2,
  UploadTop3,
  UploadTitle,
  UploadContent,
  UploadHashTag,
  UploadHashTagInfo,
  UploadBtn,
  UploadBtnLink,
  UploadImage,
  UploadHashTagLink,
  TopBar,
  StyledSelectLocation,
} from './UploadCoordiPageElements';

/* 게시글 작성 / cloudinary 이미지 업로드 기능 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
const UploadCoordi = () => {
  // 상태 변수 선언
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageTitles, setUploadedImageTitles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('서울특별시');
  const [userToken, setUserToken] = useState('');
  const cloudinaryPreset = 'zxarsg3a';

  /* 토큰 설정 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  useEffect(() => {
    const authToken = localStorage.getItem('accessToken');
    console.log('Auth Token:', authToken);
    if (authToken) {
      setUserToken(authToken);
    } else {
      console.log('토큰 오류');
    }
  }, []);

  /* 게시글 제목 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  /* 게시글 내용 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  /* 게시글 해시태그 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const handleHashtagChange = hashtag => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(prevState => [...prevState, hashtag]);
    }
  };

  /* cloudinary 이미지 업로드 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const getImageUrlFromCloudinary = async imageData => {
    try {
      // formData 생성
      const formData = new FormData();
      // formData에 file, upload 프리셋 추가
      formData.append('file', imageData);
      formData.append('upload_preset', cloudinaryPreset);
      // body에 formData 객체 넣어서 전송
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/forseason/image/upload',
        formData,
      );
      return response.data.secure_url;
    } catch (error) {
      // 이미지 업로드 실패한 경우
      console.error('cloudinary 이미지 업로드 오류', error);
      throw error;
    }
  };

  /* 이미지 업로드 관리 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const handleImageUpload = async acceptedFiles => {
    try {
      // 첫 번째 이미지만 선택 (이미지 여러개 업로드 X)
      const file = acceptedFiles[0];
      const imageUrl = await getImageUrlFromCloudinary(file);
      setUploadedImages([imageUrl]);
      setUploadedImageTitles([file.name]);
    } catch (error) {
      console.error('Cloudinary 이미지 업로드 오류', error);
    }
  };

  /* 게시글 장소 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const handleLocationChange = event => {
    setSelectedLocation(event.target.value);
  };

  /* 게시글 업로드 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  const uploadBoard = async () => {
    try {
      // 헤더에 인증 토큰 넣기
      const axiosConfig = {
        headers: {
          Authorization: `${userToken}`, // 여기 바꿨는데 확인해주세요. (accessToken 자체가 Bearer를 붙어있음.)
        },
      };
      const imageUrls = uploadedImages.map(imageUrl => ({ imageUrl }));

      // 서버 엔드포인트로 post 요청
      const response = await axios.post(
        '/community/coordi/upload/board/',
        {
          boardTitle: title,
          boardContents: content,
          boardHashtags: selectedHashtags.join(' '),
          boardPicture: imageUrls,
          boardLocation: selectedLocation,
        },
        axiosConfig,
      );

      // 응답데이터 콘솔 표시
      const {
        boardId,
        boardTitle,
        boardContents,
        boardPicture,
        boardLikeNum,
        boardCommentNum,
        boardUserProfileNickname,
        user,
        boardHashtags,
        boardLocation,
        boardDate,
      } = response.data;
      console.log('게시글 업로드 성공:', response.data);
    } catch (error) {
      console.error('게시글 업로드 실패', error);
    }
  };

  return (
    <>
      <Navbar />
      <Upload>
        <UploadTop>
          <UploadTop1>Upload</UploadTop1>
          <UploadTop2>게시글 작성</UploadTop2>
          <UploadTop3>포시즌 유저와 오늘의 코디를 공유해보세요.</UploadTop3>
        </UploadTop>
        <TopBar>
          <UploadTitle className="UploadTitle">
            <input
              type="text"
              placeholder="제목을 입력하세요"
              onChange={handleTitleChange}
            />
          </UploadTitle>
          <StyledSelectLocation>
            <select onChange={handleLocationChange} value={selectedLocation}>
              <option value="서울특별시">서울특별시</option>
              <option value="경기도">경기도</option>
              <option value="강원도">강원도</option>
              <option value="충청북도">충청북도</option>
              <option value="충청남도">충청남도</option>
              <option value="경상북도">경상북도</option>
              <option value="경상남도">경상남도</option>
              <option value="전라북도">전라북도</option>
              <option value="전라남도">전라남도</option>
              <option value="제주특별자치도">제주특별자치도</option>
            </select>
          </StyledSelectLocation>
        </TopBar>
        <UploadContent>
          <CKEditor
            editor={ClassicEditor}
            onReady={editor => {
              editor.editing.view.change(writer => {
                writer.setStyle(
                  'height',
                  '190px',
                  editor.editing.view.document.getRoot(),
                );
              });
              console.log('Editor is ready to use!', editor);
            }}
            onChange={handleContentChange}
          />
        </UploadContent>
        <UploadImage>
          <Dropzone onDrop={handleImageUpload}>
            {({ getRootProps, getInputProps }) => (
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {uploadedImageTitles.length > 0 ? (
                  uploadedImageTitles.map((imageName, index) => (
                    <p key={index}>{imageName}</p>
                  ))
                ) : (
                  <p>여기에 이미지를 끌어다 놓거나 클릭하여 업로드하세요.</p>
                )}
              </div>
            )}
          </Dropzone>
        </UploadImage>
        <UploadHashTagInfo>
          ※ 코디를 나타낼 수 있는 해시태그를 선택해주세요.
        </UploadHashTagInfo>
        <UploadHashTag>
          <UploadHashTagLink
            to="#"
            onClick={() => handleHashtagChange('더위 많이 타는 편')}
            active={selectedHashtags.includes('더위 많이 타는 편')}
          >
            # 더위 많이 타는 편
          </UploadHashTagLink>
          <UploadHashTagLink
            to="#"
            onClick={() => handleHashtagChange('추위 많이 타는 편')}
            active={selectedHashtags.includes('추위 많이 타는 편')}
          >
            # 추위 많이 타는 편
          </UploadHashTagLink>
          <UploadHashTagLink
            to="#"
            onClick={() => handleHashtagChange('데일리 룩')}
            active={selectedHashtags.includes('데일리 룩')}
          >
            # 데일리 룩
          </UploadHashTagLink>
          <UploadHashTagLink
            to="#"
            onClick={() => handleHashtagChange('캐주얼 룩')}
            active={selectedHashtags.includes('캐주얼 룩')}
          >
            # 캐주얼 룩
          </UploadHashTagLink>
          <UploadHashTagLink
            to="#"
            onClick={() => handleHashtagChange('유니크 룩')}
            active={selectedHashtags.includes('유니크 룩')}
          >
            # 유니크 룩
          </UploadHashTagLink>
        </UploadHashTag>
        <UploadBtn>
          <UploadBtnLink onClick={uploadBoard} to="/community" activeStyle>
            작성하기
          </UploadBtnLink>
        </UploadBtn>
      </Upload>
    </>
  );
};

export default UploadCoordi;
