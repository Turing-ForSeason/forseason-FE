import styles from './MyPage.module.css';
import { Link } from 'react-router-dom';

const MyPageNav = () => {
  return (
    <div className={styles.MyPageNav}>
      <div className={styles.container1}>
        <div className={styles.blankItem} />
        <div className={styles.container2}>
          <div className={styles.container1_font}>&nbsp;마이페이지</div>
        </div>
      </div>

      <hr width="260px" />

      <div className={styles.button_box}>
        <Link to="/mypage" className={styles.button_font}>
          &nbsp;프로필
        </Link>
      </div>
      <div className={styles.button_box}>
        <Link to="/mypage/myboard" className={styles.button_font}>
          &nbsp;작성한 게시글
        </Link>
      </div>
      <div className={styles.button_box}>
        <Link to="/mypage/mycomment" className={styles.button_font}>
          &nbsp;작성한 댓글
        </Link>
      </div>
    </div>
  );
};

export default MyPageNav;
