import { Box, Button } from "@mui/material";
import { toJS } from "mobx";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
// import useAxios from "../../Services/useAxios";
import swal from "sweetalert";

const StationList = () => {
  const [rooms, setRooms] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  //   let api = useAxios();
  let navigate = useNavigate();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cols = [
    {
      field: "stationName",
      headerName: "Station Name",
      minWidth: 300,
    },
    { field: "location", headerName: "Location", minWidth: 300 },
    { field: "city", headerName: "City", minWidth: 300 },

    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <a
              onClick={() => handleDeleteCell(params.row.id)}
              style={{ cursor: "pointer" }}
            >
              {/* <FontAwesomeIcon
                icon="fa-solid fa-trash"
                className="text-danger mx-1"
              /> */}
            </a>

            <Link to={`/edit-room/${params.row.id}`}>
              <i class="fa-solid fa-eye"></i>
            </Link>
          </>
        );
      },
    },
  ];
  //   useEffect(() => {
  //     api
  //       .get("/api/v1/room/get-rooms")
  //       .then((response) => {
  //         setRooms(response.data);
  //         // institutionBranchStore.setData(response.data);
  //         setIsLoading(false);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   }, [reload]);
  const handleDeleteCell = (id) => {
    setIsLoading(true);
    swal({
      title: "A jeni te sigurt?",
      text: "Nese fshihet nuk mund ta kthesh!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then(() => {
      //   api
      //     .get(`/api/v1/room/remove-room/${id}`)
      //     .then(() => {
      //       navigate("/rooms");
      //       setReload(!reload);
      //     })
      //     .catch((err) => {
      //       console.log(err);
      //     });
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
      <div className="ms-4">
        <h2 className="fw-lighter text-secondary">List of Stations</h2>
      </div>
      <div className="container row w-100 mw-100 ">
        <div className="content col9 w-100">
          <div className="add-country-btn d-flex justify-content-end"></div>
          <div style={{ height: 500 }} className="table-container">
            <DataGrid
              rows={rooms}
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
