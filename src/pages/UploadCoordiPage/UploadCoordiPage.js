import React, { Component } from 'react';
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

/* 게시글 작성 / cloudinary 이미지 업로드 기능 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
class UploadCoordi extends Component {
  constructor(props) {
    // 초기화 설정
    super(props);
    this.state = {
      title: '',
      content: '',
      selectedHashtags: [],
      uploadedImages: [],
      uploadedImageTitles: [],
      selectedLocation: '서울특별시',
    };
  }

  /* 토큰 설정 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  componentDidMount() {
    const authToken = localStorage.getItem('Authorization');
    console.log('Auth Token:', authToken);
    if (authToken) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;
    } else {
      console.log('토큰 오류');
    }
  }

  /* 게시글 제목 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  handleTitleChange = event => {
    this.setTitle(event.target.value);
  };

  /* 게시글 내용 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  // CKEditor 사용
  handleContentChange = (event, editor) => {
    const data = editor.getData();
    this.setContent(data);
  };

  /* 게시글 해시태그 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  handleHashtagChange = hashtag => {
    const { selectedHashtags } = this.state;
    if (!selectedHashtags.includes(hashtag)) {
      this.setState(prevState => ({
        selectedHashtags: [...prevState.selectedHashtags, hashtag],
      }));
    }
  };

  /* cloudinary 이미지 업로드 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  handleImageUpload = async acceptedFiles => {
    try {
      const file = acceptedFiles[0];
      // formData 생성
      const formData = new FormData();
      // formData에 file, upload 프리셋 추가
      formData.append('file', file);
      formData.append('upload_preset', 'zxarsg3a');
      // body에 formData 객체 넣어서 전송
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/forseason/image/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      const imageUrl = response.data.secure_url;
      this.setState(prevState => ({
        uploadedImages: [...prevState.uploadedImages, imageUrl],
        uploadedImageTitles: [...prevState.uploadedImageTitles, file.name],
      }));
      // 이미지 업로드 실패한 경우
    } catch (error) {
      console.error('Cloudinary 이미지 업로드 오류', error);
    }
  };

  /* 게시글 장소 변경 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  handleLocationChange = event => {
    this.setSelectedLocation(event.target.value);
  };

  /* 게시글 업로드 함수 ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */
  uploadBoard = async () => {
    try {
      const authToken = localStorage.getItem('Authorization');
      const {
        title,
        content,
        selectedHashtags,
        uploadedImages,
        selectedLocation,
      } = this.state;
      const response = await axios.post('/community/coordi/upload/board', {
        boardTitle: title,
        boardContents: content,
        boardHashtags: selectedHashtags.join(' '),
        boardPicture: uploadedImages,
        boardLocation: selectedLocation,
      });
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
  render() {
    const {
      selectedLocation,
      uploadedImageTitles,
      selectedHashtags,
      title,
      content,
    } = this.state;
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
                onChange={this.handleTitleChange}
              />
            </UploadTitle>
            <StyledSelectLocation>
              <select
                onChange={this.handleLocationChange}
                value={selectedLocation}
              >
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
              onChange={this.handleContentChange}
            />
          </UploadContent>
          <UploadImage>
            <Dropzone onDrop={this.handleImageUpload}>
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
              onClick={() => this.handleHashtagChange('더위 많이 타는 편')}
              active={selectedHashtags.includes('더위 많이 타는 편')}
            >
              # 더위 많이 타는 편
            </UploadHashTagLink>
            <UploadHashTagLink
              to="#"
              onClick={() => this.handleHashtagChange('추위 많이 타는 편')}
              active={selectedHashtags.includes('추위 많이 타는 편')}
            >
              # 추위 많이 타는 편
            </UploadHashTagLink>
            <UploadHashTagLink
              to="#"
              onClick={() => this.handleHashtagChange('데일리 룩')}
              active={selectedHashtags.includes('데일리 룩')}
            >
              # 데일리 룩
            </UploadHashTagLink>
            <UploadHashTagLink
              to="#"
              onClick={() => this.handleHashtagChange('캐주얼 룩')}
              active={selectedHashtags.includes('캐주얼 룩')}
            >
              # 캐주얼 룩
            </UploadHashTagLink>
            <UploadHashTagLink
              to="#"
              onClick={() => this.handleHashtagChange('유니크 룩')}
              active={selectedHashtags.includes('유니크 룩')}
            >
              # 유니크 룩
            </UploadHashTagLink>
          </UploadHashTag>
          <UploadBtn>
            <UploadBtnLink
              onClick={this.uploadBoard}
              to="/community"
              activeStyle
            >
              작성하기
            </UploadBtnLink>
          </UploadBtn>
        </Upload>
      </>
    );
  }
}

export default UploadCoordi;
