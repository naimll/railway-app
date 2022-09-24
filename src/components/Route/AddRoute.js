import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { makeStyles } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import * as yup from "yup";
import MainMenu from "../MainMenu/MainMenu";
import { yupResolver } from "@hookform/resolvers/yup";
import * as travelService from "../../services/TravelService";

const AddRoute = () => {
  const [loading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [attraction, setAttraction] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({
    label: "",
    value: "",
  });
  const [stations, setStations] = useState([]);

  const handleChangeStation1 = (event) => {
    setValue("startPoint", event.value);
    setSelectedStatus(event);
  };
  const handleChangeStation2 = (event) => {
    setValue("endPoint", event.value);
    setSelectedStatus(event);
  };

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    travelService.getStationSelect().then((response) => {
      setStations(response.data);
    });
  }, []);

  const onSubmit = (event) => {
    console.log("event");
    travelService
      .AddRoute(event.startPoint, event.endPoint)
      .then((response) => {
        console.log(response);
      });
    setIsLoading(true);
  };

  return (
    <>
      <MainMenu />
      <div className="form-container card-rounded-1 m-4 mt-5">
        <div className="form-header bg-primary rounded-3 p-3 ">
          <h3 className="text-light"> Add new Route</h3>
        </div>

        <div className="card rounded-2 mt-2">
          <div className="card-body p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row justify-content-center">
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>Start Station</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <Select
                      {...register("startPoint")}
                      options={stations}
                      onChange={handleChangeStation1}
                      className="rounded-0"
                    />
                    <span className="text-danger">
                      {errors.startPoint?.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>End Station</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <Select
                      {...register("endPoint")}
                      options={stations}
                      onChange={handleChangeStation2}
                      className="rounded-0"
                    />
                    <span className="text-danger">
                      {errors.endPoint?.message}
                    </span>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="d-flex justify-content-end  form-group mt-3">
                    <button
                      type="button"
                      onClick={() => navigate(-1)}
                      className="btn btn-md btn-secondary rounded-0 me-3"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-md btn-primary rounded-0"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddRoute;
