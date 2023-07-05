import { FC } from 'react';
import styles from './NotFoundBlock.module.scss';
import { Link } from 'react-router-dom';

export const NotFoundBlock: FC = () => {
  return (
    <>
      <div className={styles.root}>
        <h1 className={styles.title}>404</h1>
        <h2 className={styles.subtitle}>This place doesn't exist 🤷‍♂️</h2>
        <div className={styles.btnWrapper}>
          <Link to={'/'}>
            <button>Go to home</button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundBlock;
