import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { TabPanel } from "@mui/lab";
import { TabContext } from "@mui/lab";
import { Tab } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Box from "@mui/material/Box";
import "./SideBar.css";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Notification } from "../Notification/Notification";
import AttractionList from "../Attraction/AttractionList";
import StationList from "../Stations/StationList";
import RouteList from "../Route/RouteList";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as actions from "../../store/actions";
import MainMenu from "../MainMenu/MainMenu";

const AdminSideBar = () => {
  const activeTab = localStorage.getItem("activeTab");
  console.log(typeof activeTab);
  const [value, setValue] = useState(activeTab.toString());
  const name1 = useSelector((state) => state.auth.name);
  const dispatch = useDispatch();
  const storage = localStorage.getItem("persist:root");
  const temp = JSON.parse(storage);
  const user = JSON.parse(temp.auth);
  function handleChange(event, newValue) {
    setValue(newValue);
  }
  const navigate = useNavigate();
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
    navigate("/sign-in");
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <MainMenu title="Admin Dashboard" />
      <div className="main mt-3">
        <div className="side-bar-elements bg-light sidebar col-sm w-25 border rounded  ms-4">
          <Box orientation="vertical">
            <Tabs
              value={value}
              orientation="vertical"
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Attractions" {...a11yProps(activeTab)} />
              <Tab label="Stations" {...a11yProps(activeTab)} />
              <Tab label="Routes" {...a11yProps(2)} />
            </Tabs>
          </Box>

          <Avatar sx={{ bgcolor: orange }}>N</Avatar>
        </div>
        <div className="panel">
          <TabContext value="0" orientation="vertical">
            <TabPanel value={value.toString()} index={0} className="w-100">
              <AttractionList />
            </TabPanel>
          </TabContext>
          <TabContext value="1">
            <TabPanel value={value.toString()} index={1} className="w-100">
              <StationList />
            </TabPanel>
          </TabContext>
          <TabContext value="2">
            <TabPanel value={value.toString()} index={2} className="w-100">
              <RouteList />
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </>
    // <>
    //   <Tabs
    //     orientation="vertical"
    //     variant="scrollable"
    //     value={value}
    //     onChange={handleChange}
    //     sx={{ borderRight: 1, borderColor: "divider" }}
    //   >
    //     <Tab
    //       label="Symbolt"
    //       {...a11yProps(0)}
    //       onClick={() => console.log("label")}
    //     />
    //     <Tab label="ShipHawk" {...a11yProps(1)} />
    //     <Button>Add new</Button>
    //   </Tabs>
    //   <TabPanel value={value} index={0}>
    //     TAb one
    //   </TabPanel>
    //   <TabPanel value={value} index={1}>
    //     TAb Two
    //   </TabPanel>
    // </>
  );
};

export default AdminSideBar;
