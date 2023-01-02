import {FC} from 'react';
import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: FC = () => {
  return <h1 className={styles.root}>Ничего не нашлось 😧</h1>;
};

export default NotFoundBlock;
