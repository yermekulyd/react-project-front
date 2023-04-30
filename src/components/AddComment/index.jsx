import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = ({setMyComments}) => {
  const [comment, setComment] = useState('');
  console.log("Set my comments: ", typeof(setMyComments))
  const handleComment = () => {
    if(!localStorage.getItem('comments')){
      let comments = [comment]
      setMyComments(comments)
      localStorage.setItem('comments', JSON.stringify(comments))
    }else{
      let comments = JSON.parse(localStorage.getItem('comments'))
      comments.push(comment)
      localStorage.setItem('comments', JSON.stringify(comments))
      setMyComments(comments)
      console.log("Type of: ", typeof(comments))
      console.log(comments)
    }
    setComment('')
  }

  const clearComments = () => {
    localStorage.clear()
    setMyComments([])
  }

  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-m.jpg"
        />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button variant="contained" onClick={handleComment}>Отправить</Button>
          {/* <Button variant="contained" onClick={clearComments}>Clear Comments</Button> */}
        </div>
      </div>
    </>
  );
};
