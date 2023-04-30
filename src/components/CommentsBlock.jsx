import React, { useEffect, useState } from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";

export const CommentsBlock = ({ myComments,children, isLoading = true }) => {
  const [items, setItems] = useState()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const request = async () => {
      const options = {
        method: 'GET',
        url: 'https://dummyapi.io/data/v1/comment',
        headers: {
          "app-id": "636ab2e85895315693340c2b"
        }
      };
      setLoading(true);
      await axios.request(options).then(function (response) {
        setLoading(false)
        setItems(response.data.data)
        console.log(response.data.data);
      }).catch(function (error) {
        console.error(error);
      });
    }
    request()
    
  }, [])
  useEffect(() => {
    console.log("My commets: ", myComments)
  }, [myComments])
  return (
    <SideBlock title="Комментарии">
      {
        items && (
          <List>
            {(isLoading ? [...Array(5)] : items).map((obj, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    {isLoading ? (
                      <Skeleton variant="circular" width={40} height={40} />
                    ) : (
                      <Avatar alt={obj.owner.firstName} src={obj.owner.picture} />
                    )}
                  </ListItemAvatar>
                  {isLoading ? (
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <Skeleton variant="text" height={25} width={120} />
                      <Skeleton variant="text" height={18} width={230} />
                    </div>
                  ) : (
                    <ListItemText
                      primary={obj.owner.firstName}
                      secondary={obj.message}
                    />
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
            {
              myComments && myComments.map((comment, index) => (
                <React.Fragment key={index}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      
                    <Avatar alt={'Alter'} src='https://thypix.com/wp-content/uploads/2021/11/sponge-bob-profile-picture-thypix-m.jpg' />
                      
                    </ListItemAvatar>
                    {isLoading ? (
                      <div style={{ display: "flex", flexDirection: "column" }}>
                        <Skeleton variant="text" height={25} width={120} />
                        <Skeleton variant="text" height={18} width={230} />
                      </div>
                    ) : (
                      <ListItemText
                        primary={'Tursynbek'}
                        secondary={comment}
                      />
                    )}
                  </ListItem>
                  <Divider variant="inset" component="li" />
              </React.Fragment>
              ))
            }
          </List>
        )
      }

      {children}
    </SideBlock>
  );
};
