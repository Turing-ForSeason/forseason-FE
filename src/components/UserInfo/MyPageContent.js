import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';

const MyPageContent = () => {
  return (
    <div className={styles.myPageContent}>
      <div className={styles.contentContainer1}>
        <div className={styles.contentItem1}>
          <div className={styles.blankItem2} />
          <div className={styles.profilePicture}>
            <div className={styles.profilePictureBox}>
              {/* 프로필 사진을 보여줄 이미지 엘리먼트 */}
              <img
                className={styles.profile}
                src="프로필 사진 URL"
                alt="프로필 사진"
              />
            </div>
          </div>
          <div className={styles.buttonContainer}>
            <Link to="/mypage/editprofile" className={styles.button2}>
              <div className={styles.button_font2}>프로필 수정</div>
            </Link>
            <div className={styles.blankItem3} />
            <Link to="/" className={styles.button2}>
              <div className={styles.button_font2}>로그아웃</div>
            </Link>
          </div>
        </div>
        <div className={styles.contentItem2}>
          <div className={styles.blankItem2} />
          <div className={styles.textBox}>
            <div className={styles.textLine}>
              {/* 닉네임은 useState로 받기..?  <MyPageContent nickname=""/> 이런식으로 하고 저 위 MyPageContent(props)로 받아서 {props.nickname}님 이렇게 구현하기*/}
              <span className={styles.button_font3}>메타몽</span>
              <span className={styles.button_font4}>님</span>
            </div>
          </div>
          <div className={styles.textBox}>
            <div className={styles.button_font5}>turing@forseason.com</div>
          </div>
          <div className={styles.blankItem4} />
          <div className={styles.numberBox}>
            <div className={styles.numberBox2}>
              <Link to="/mypage/myboard" className={styles.textBox2}>
                10
              </Link>
              <div className={styles.textBox3}>게시글 수</div>
            </div>
            <div className={styles.line} />
            <div className={styles.numberBox2}>
              <Link to="/mypage/mycomment" className={styles.textBox2}>
                100
              </Link>
              <div className={styles.textBox3}>댓글 수</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.contentContainer2}>탈퇴하기</div>
    </div>
  );
};

export default MyPageContent;
