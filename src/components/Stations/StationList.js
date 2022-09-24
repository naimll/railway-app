import { Box, Button } from "@mui/material";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import useAxios from "../../Services/useAxios";
import swal from "sweetalert";
import { useSelector } from "react-redux";
import * as travelService from "../../services/TravelService";

const StationList = () => {
  localStorage.setItem("activeTab", 1);

  const [stations, setStations] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  //   let api = useAxios();
  let navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const role = useSelector((state) => state.auth.role);

  const cols = [
    {
      field: "stationName",
      headerName: "Station Name",
      minWidth: 300,
    },
    { field: "longitude", headerName: "Longitude", minWidth: 300 },
    { field: "latitude", headerName: "Latitude", minWidth: 300 },
    { field: "country", headerName: "Country", minWidth: 300 },
    { field: "city", headerName: "City", minWidth: 300 },
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
              <i class="fa-solid fa-trash me-2"></i>
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
      .GetStations()
      .then((response) => {
        setStations(response.data);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
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
        .DeleteStation(id)
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
      <div className="d-flex justify-content-between align-items-center ms-5 me-5">
        <p className="crudTitle">Station List</p>
        {role === "Admin" ? (
          <Link
            to="/add-station"
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
              rows={stations}
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

export default StationList;
