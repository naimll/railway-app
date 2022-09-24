import { Box, Button } from "@mui/material";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import useAxios from "../../Services/useAxios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import * as travelService from "../../services/TravelService";
import { Modal } from "bootstrap";
import ModalDialog from "../Templates/ModalDialog";

const AttractionList = () => {
  localStorage.setItem("activeTab", 0);
  const [attractions, setAttractions] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  //   let api = useAxios();
  let navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector((state) => state.auth.role);
  const [modalState, setModalState] = useState(false);
  const cols = [
    {
      field: "attractionName",
      headerName: "Attraction Name",
      minWidth: 300,
    },
    { field: "location", headerName: "Location", minWidth: 300 },
    { field: "description", headerName: "Description", minWidth: 300 },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return role === "Client" ? (
          <>
            {/* <Link to={`/edit-room/${params.row.id}`}> */}
            <i className="fa-solid fa-eye text-success"></i>
            {/* </Link> */}
          </>
        ) : (
          <>
            <a
              onClick={() => handleDeleteCell(params.row.id)}
              style={{ cursor: "pointer" }}
            >
              <i class="fa-solid fa-trash"></i>
              {/* <FontAwesomeIcon
                icon="fa-solid fa-trash"
                className="text-danger mx-1"
              /> */}
            </a>
            <Link to={`/edit-attraction/${params.row.id}`}>
              <i className="fa-solid fa-eye text-success"></i>
            </Link>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    travelService
      .GetAttractions()
      .then((response) => {
        setAttractions(response.data);
        // institutionBranchStore.setData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [reload]);
  const handleDeleteCell = (id) => {
    setIsLoading(true);
    swal({
      title: "Are you sure?",
      text: "!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(() => {
      travelService
        .DeleteAttraction(id)
        .then(() => {
          navigate("/");
          setReload(!reload);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  return (
    <>
      {/* <Box
        sx={{ display: { xs: "flex", justifyContent: "flex-end" } }}
        className="menu-box-items w-100"
      >
        <Link to={"/add-room"}>
          <Button
            variant="contained"
            margin="normal"
            className="add-country-btn d-flex mt-3 me-5 mb-3 justify-content-end"
          >
            Add New Room
          </Button>
        </Link>
      </Box> */}

      <div className="d-flex justify-content-between align-items-center ms-5 me-5">
        <p className="crudTitle">Attraction List</p>
        {role === "Admin" ? (
          <Link
            to="/add-attraction"
            className="btn btn-md btn-outline-primary w-25 mb-3 rounded-0"
          >
            <i className="fa fa-plus" aria-hidden="true"></i> Create
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <div className="container row w-100 mw-100 ">
        <div className="content col9 w-100">
          <div className="add-country-btn d-flex justify-content-end"></div>
          <div style={{ height: 500 }} className="table-container">
            <DataGrid
              rows={attractions}
              columns={cols}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 20]}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AttractionList;
