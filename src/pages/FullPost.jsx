import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from 'react-markdown'
import axios from "../axios";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";


export const FullPost = () => {
  const [data, setData] = useState();
  const [isLoading, setLoading] = useState(true);
  const { id } = useParams();
  const [myComments, setMyComments] = useState()
  useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then(res => {
        setData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.warn(err);
        alert('Ошибка при получении статьи');
      })
    setMyComments(JSON.parse(localStorage.getItem('comments')))
  }, []);
  useEffect(() => {
    console.log("My comments: ", myComments)
  }, [myComments])

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }
  
  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ''}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={20}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock
        myComments={myComments}
        items={[
          {
            user: {
              fullName: 'Yerkanatova Tamila',
              avatarUrl: 'https://preview.redd.it/v0caqchbtn741.jpg?auto=webp&s=c5d05662a039c031f50032e22a7c77dfcf1bfddc',
            },
            text: 'Good article btw<3',
          },
          {
            user: {
              fullName: 'Saduakas Aizhan',
              avatarUrl: 'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
          },
        ]}
        isLoading={false}
      ><Index setMyComments={setMyComments} />
      </CommentsBlock>
    </>
  );
};
