import React from 'react';
import styles from './index.module.css';

type Props = {
  id: string;
};

const YouTube = ({ id }: Props) => {
  return (
    <iframe
      className={styles.youtube}
      title="YouTube"
      src={`https://www.youtube.com/embed/${id}`}
    ></iframe>
  );
};

export default YouTube;
