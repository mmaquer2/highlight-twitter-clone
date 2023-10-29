import React from 'react';
import styles from '../../styles/postcard.module.css';


//TODO: add date created to postcard, likes, comments, etc.
interface PostCardProps {
    id: number;
    content: string;
  }
  
  const PostCard: React.FC<PostCardProps> = ({ id, content }) => {
    return (
      <div className={styles.card}>
        <p className={styles.content}>{content}</p>
      </div>
    );
  }
  
  export default PostCard;