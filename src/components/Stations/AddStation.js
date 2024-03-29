import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { makeStyles } from '@mui/material/styles';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import MainMenu from "../MainMenu/MainMenu";
import * as travelService from "../../services/TravelService";
// import { yupResolver } from "@hookform/resolvers/yup";

const AddStation = () => {
  localStorage.setItem("activeTab", 2);
  const [loading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [attraction, setAttraction] = useState([]);

  const schema = yup.object({
    description: yup
      .string()
      .required("Ju lutem vendosni përshkrimin e qytetit në gjuhën shqipe"),
    countryId: yup.string().required("Ju lutem vendosni përshkrimin e shtetit"),
    statusAPID: yup.string().required("Ju lutem vendosni statusin e qytetit"),
  });
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // resolver: yupResolver(schema),
  });
  useEffect(() => {}, []);

  const onSubmit = (event) => {
    travelService.AddStation(event).then((response) => {
      navigate("/admin");
    });
    setIsLoading(true);
  };

  return (
    <>
      <MainMenu />
      <div className="form-container card-rounded-1 m-4 mt-5">
        <div className="form-header bg-primary rounded-3 p-3 ">
          <h3 className="text-light"> Add new Station</h3>
        </div>

        <div className="card rounded-2 mt-2">
          <div className="card-body p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row justify-content-center">
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>Station Name</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      {...register("stationName")}
                      name="stationName"
                      placeholder="Station Name"
                    />
                    <span className="text-danger">
                      {errors.description?.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>Longitude</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control rounded-0"
                      {...register("longitude")}
                      name="longitude"
                      placeholder="Longitude Description"
                    />
                    <span className="text-danger">
                      {errors.description?.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>Latitude</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control rounded-0"
                      {...register("latitude")}
                      name="latitude"
                      placeholder="Latitude Description"
                    />
                    <span className="text-danger">
                      {errors.description?.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>Country</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      {...register("country")}
                      name="country"
                      placeholder="Country Name"
                    />
                    <span className="text-danger">
                      {errors.description?.message}
                    </span>
                  </div>
                </div>
                <div className="col-lg-4 mb-5">
                  <div className="form-group">
                    <label>
                      <strong>City</strong>
                      <span className="text-danger fw-bold">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control rounded-0"
                      {...register("city")}
                      name="city"
                      placeholder="City Name"
                    />
                    <span className="text-danger">
                      {errors.description?.message}
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

export default AddStation;
