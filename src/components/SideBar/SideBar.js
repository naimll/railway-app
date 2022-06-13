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
import { Avatar } from "@mui/material";
import { orange } from "@mui/material/colors";

const SideBar = () => {
  const [value, setValue] = useState(0);
  const adminSideBar = (
    <ul className="side-bar-elements">
      <li>Home</li>
      <li>Add Routes</li>
      <li>Travel</li>
      <li>Reports</li>
    </ul>
  );
  const userSideBar = (
    <ul className="side-bar-elements">
      <li>Home</li>
      <li>My Tickets</li>
      <li>Book a ticket</li>
      <li>Notification</li>
      <li>Weather</li>
      <li>Travel</li>
      <li>Active Routes</li>
    </ul>
  );
  const storage = localStorage.getItem("persist:root");
  const temp = JSON.parse(storage);
  const user = JSON.parse(temp.auth);
  console.log(user.name);
  function handleChange(event, newValue) {
    setValue(newValue);
    console.log(value);
  }
  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      "aria-controls": `scrollable-auto-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className="main ">
        <div className="side-bar-elements ">
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
              <Tab label="Routes 1" {...a11yProps(0)} />
              <Tab label="Routes 2" {...a11yProps(1)} />
            </Tabs>
          </Box>

          <Avatar sx={{ bgcolor: orange }}>N</Avatar>
        </div>
        <div className="panel">
          <TabContext value="0" orientation="vertical">
            <TabPanel value={value.toString()} index={0}>
              item one
            </TabPanel>
          </TabContext>
          <TabContext value="1">
            <TabPanel value={value.toString()} index={1}>
              item two
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

export default SideBar;
