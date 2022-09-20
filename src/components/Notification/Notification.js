import MenuItem from "@material-ui/core/MenuItem";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import * as notificationService from "../../services/notificationService";
import "react-notifications/lib/notifications.css";
import {
  Button,
  CardActions,
  CardContent,
  Popover,
  Typography,
} from "@mui/material";
export const Notification = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [connection, setConnection] = useState(null);
  const [userConnection, setUserConnection] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.id);
  const [notification, setNotification] = useState([]);
  const [connectionId, setConnectionId] = useState();
  useEffect(() => {
    notificationService.getUserNotification().then((response) => {
      setNotification(response.data);
    });
    setConnection(notificationService.connect(token));
    setUserConnection(
      notificationService.connectToUser(token, userId.toString())
    );
  }, []);

  useEffect(() => {
    if (!connection) return;

    if (connection) {
      connection
        .start()
        .then((result) => {
          // connection.on("ReceiveBroadcast", (test) => {
          //   test;
          //   console.log(test);
          //   setNotification(test);
          //   console.log(notification);
          // });
          // connection.start().then((result) => {
          connection.on("ReceiveBroadcast", (test) => {
            NotificationManager.info(test.body, test.subject);
            // setNotification([...notification, test]);
            notification.push(test);
            console.log(notification);
          });
          // });
          // connection.invoke("send", "woooooo").catch(function (err) {
          //   return console.error(err.toString());
          // });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [connection]);

  // useEffect(() => {
  //   if (userConnection) {
  //     userConnection.start().then((result) => {
  //       connection.invoke("getConnectionId").then(() => {
  //         setConnectionId(connectionId);
  //         console.log(connectionId, "sdfssssssssssssssssssssssssss");
  //       });
  //     });
  //   }
  // }, [userConnection]);
  useEffect(() => {
    if (userConnection) {
      userConnection.start().then((result) => {
        userConnection.on("sendToUser", (test) => {
          console.log(test);
          setNotification(test);
          NotificationManager.info(
            test.notificationMessage,
            test.notificationSubject
          );
        });
      });
    }
  }, [userConnection]);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <button
        className="btn-icon notify d-flex justify-content-end m-3"
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24.489"
          height="30.003"
          viewBox="0 0 13.489 15.003"
        >
          <g id="Group_1301" data-name="Group 1301" transform="translate(0 -1)">
            <g id="Layer_2" data-name="Layer 2" transform="translate(0 1)">
              <g id="bell">
                <path
                  id="Path_510"
                  data-name="Path 510"
                  d="M16.144,11.91l-1.35-1.358V7.206a5.146,5.146,0,0,0-4.366-5.161,5.056,5.056,0,0,0-5.716,5v3.5L3.362,11.91A1.23,1.23,0,0,0,4.232,14h2.52v.255a2.88,2.88,0,0,0,3,2.745,2.88,2.88,0,0,0,3-2.745V14h2.52a1.23,1.23,0,0,0,.87-2.093Zm-4.891,2.348a1.41,1.41,0,0,1-1.5,1.245,1.41,1.41,0,0,1-1.5-1.245V14h3ZM4.885,12.5l.885-.885a1.5,1.5,0,0,0,.443-1.065v-3.5a3.548,3.548,0,0,1,1.215-2.67A3.5,3.5,0,0,1,10.233,3.5a3.646,3.646,0,0,1,3.061,3.676v3.376a1.5,1.5,0,0,0,.435,1.065l.893.885Z"
                  transform="translate(-3.009 -2.002)"
                  fill="#afafaf"
                />
              </g>
            </g>
          </g>
        </svg>
      </button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        className="mw-50"
      >
        {notification.map((item, i) => {
          return (
            <>
              <CardContent className="mb-0 pb-0">
                <Typography color="text.secondary" className="text-primary">
                  {item.subject}
                </Typography>
                <Typography variant="body2">{item.body}</Typography>
              </CardContent>
              <CardActions className="border-bottom-1 mt-0">
                <Button size="small" className="border-bottom-1">
                  Learn More
                </Button>
              </CardActions>
            </>
          );
        })}
      </Popover>

      <NotificationContainer />
    </>
  );
};
