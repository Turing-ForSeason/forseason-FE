import React, { useState, useEffect } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import Navbar from '../../components/Nav/Nav';
import styled from 'styled-components';
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

const UploadCoordi = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedHashtags, setSelectedHashtags] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [uploadedImageTitles, setUploadedImageTitles] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('서울특별시');
  const [userToken, setUserToken] = useState('');
  const cloudinaryPreset = 'zxarsg3a';

  useEffect(() => {
    // 컴포넌트가 마운트될 때 로컬 스토리지에서 토큰을 가져오고 설정
    const authToken = localStorage.getItem('Authorization');
    console.log('Auth Token:', authToken);
    if (authToken) {
      setUserToken(authToken);
    } else {
      console.log('토큰 오류');
    }
  }, []);

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event, editor) => {
    const data = editor.getData();
    setContent(data);
  };

  const handleHashtagChange = hashtag => {
    if (!selectedHashtags.includes(hashtag)) {
      setSelectedHashtags(prevState => [...prevState, hashtag]);
    }
  };

  const getImageUrlFromCloudinary = async imageData => {
    try {
      const formData = new FormData();
      formData.append('file', imageData);
      formData.append('upload_preset', cloudinaryPreset);
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/forseason/image/upload',
        formData,
      );
      return response.data.secure_url;
    } catch (error) {
      console.error('cloudinary 이미지 업로드 오류', error);
      throw error;
    }
  };

  const handleImageUpload = async acceptedFiles => {
    try {
      // 첫 번째 이미지만 선택
      const file = acceptedFiles[0];
      const imageUrl = await getImageUrlFromCloudinary(file);
      setUploadedImages([imageUrl]);
      setUploadedImageTitles([file.name]);
    } catch (error) {
      console.error('Cloudinary 이미지 업로드 오류', error);
    }
  };

  const handleLocationChange = event => {
    setSelectedLocation(event.target.value);
  };

  const uploadBoard = async () => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      };

      const response = await axios.post(
        '/community/coordi/upload/board',
        {
          boardTitle: title,
          boardContents: content,
          boardHashtags: selectedHashtags.join(' '),
          boardPicture: uploadedImages,
          boardLocation: selectedLocation,
        },
        axiosConfig,
      );

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
