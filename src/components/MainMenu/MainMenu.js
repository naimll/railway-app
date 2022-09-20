import React from "react";
import { Notification } from "../Notification/Notification";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";

const MainMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name1 = useSelector((state) => state.auth.name);
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleLogout = () => {
    // mainStore.setToken("");
    dispatch(actions.logout());
    navigate("/login");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="bg-primary w-100 main-header text-light d-flex justify-content-between">
      <h3 className="align-middle">Client Dashboard</h3>
      <div className="d-flex">
        <Notification />
        <div className="mx-2">
          <IconButton onClick={handleMenu} className="m-1">
            <Avatar sx={{ bgcolor: "#76BA99" }} className="m-2">
              {name1 ? name1.charAt(0) : ""}
            </Avatar>
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleLogout}>Log out</MenuItem>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
