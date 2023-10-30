import React from 'react';
import Image from 'next/image';
import styles from '../../styles/postcard.module.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import ShareIcon from '@mui/icons-material/Share';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import MoreVertIcon from '@mui/icons-material/MoreVert';

//TODO: add date created to postcard, likes, comments, etc.
  
  type PostCardProps = {
    id: string;
    content: string;
    avatar: string;
    time: string;
  };
  
  const PostCard: React.FC<PostCardProps> = ({ id, content, avatar, time }) => {
  
      // TODO: handlers for like, comment, and share buttons
  
      const handleLike = () => {
          console.log("like button pressed");
          // handle like for post id : id
      };
  
      const handleComment = () => {
          console.log("comment button pressed");
          //TODO: handle comment for post id : id
      };
  
      const handleShare = () => {
          console.log("share button pressed");
      };

      const handleMorePostCard = () => {
        console.log("more button pressed");
      };

      const date = new Date(time);
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


      //TODO:    add delete button for posts depending on if the post belongs to the current user
      /*
      {post.userId === currentUser.id && (
        <button onClick={() => deletePost(post.id)}>Delete</button>
        )}
       */ 

      return (
        <div className={styles.card}>
          <div className={styles.header}>
            {avatar ? (
                <Image width={3} height={3} src={avatar} alt="User Avatar" className={styles.avatar} />
            ) : (
                <AccountBoxIcon fontSize="large" />
            )}
        </div>
          <p className={styles.content}>{content}</p>
          <p className={styles.timestamp}>{formattedDate}</p>
          <div className={styles.buttons}>
              <button className={styles.button} onClick={handleLike}><ThumbUpIcon /></button>
              <button className={styles.button} onClick={handleComment}><CommentIcon /></button>
              <button className={styles.button} onClick={handleShare}><ShareIcon /></button>
          </div>
          <div className={styles.more}>
              <button className={styles.button} onClick={handleMorePostCard}><MoreVertIcon /></button>
          </div>
        </div>
      );
  };
  
  export default PostCard;