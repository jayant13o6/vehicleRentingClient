import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
  LinearProgress,
} from "@mui/material";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file

const VehicleModel = () => {
  const [value, setValue] = useState();
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: null,
      key: "selection",
    },
  ]);
  const [vehicleModels, setVehicleModels] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    console.log(e.target.id, ":", e.target.value);
    setValue(e.target.value);
  };

  const bookSelectedVehicle = (e) => {
    e.preventDefault();
    ///************ needs a check function here */
    const selectedDrive = vehicleModels.filter(
      (vehicleModel) => vehicleModel.modelName == value
    );
    console.log(
      "selected drive",
      typeof Date.parse(selectedDrive[0]?.startBookingDate),
      Date.parse(dateRange[0]?.startDate)
    );
    if (
      Date.parse(dateRange[0]?.startDate) >=
        Date.parse(selectedDrive[0]?.startBookingDate) &&
      Date.parse(dateRange[0]?.startDate) <=
        Date.parse(selectedDrive[0]?.endBookingDate)
    ) {
      window.alert(
        `no booking available for ${value} for ${dateRange[0]?.startDate} to ${dateRange[0]?.endDate}`
      );
    } else if (
      Date.parse(dateRange[0]?.endDate) >=
        Date.parse(selectedDrive[0]?.startBookingDate) &&
      Date.parse(dateRange[0]?.endDate) <=
        Date.parse(selectedDrive[0]?.endBookingDate)
    ) {
      window.alert(
        `no booking available for ${value} for ${dateRange[0]?.startDate} to ${dateRange[0]?.endDate}`
      );
    } else {
      if (value) {
        const res = fetch("http://localhost:8080/bookSelectedVehicle", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          // data send to server
          body: JSON.stringify({ value, dateRange }),
        })
          .then((res) => {
            console.log("res:", res);
            const data = res.json();
            if (res.status !== 200 || !data) {
              window.alert("data invalid, something wrong");
              console.log("invslid register");
            } else {
              window.alert("valid register", "success");
              console.log("vslid register", data);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/vehicleModel")
      .then((response) => response.json())
      .then((data) => {
        setVehicleModels(data);
        console.log("my result", vehicleModels, id);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!vehicleModels.length) {
    console.log(vehicleModels.length);
    return <LinearProgress />;
  }

  return (
    <div>
      <div className="formControl">
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Choose your vehicle model:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {vehicleModels?.map(
              (ele) =>
                ele.vehicleType == id && (
                  <FormControlLabel
                    value={ele.modelName}
                    key={ele._id}
                    control={<Radio />}
                    label={ele.modelName}
                  />
                )
            )}
          </RadioGroup>
        </FormControl>
      </div>

      <div>
        <DateRangePicker
          editableDateInputs={true}
          onChange={(item) => {
            console.log("date::", item);
            setDateRange([item.selection]);
          }}
          moveRangeOnFirstSelection={false}
          ranges={dateRange}
        />
      </div>
      <Button
        variant="contained"
        href="#contained-buttons"
        onClick={bookSelectedVehicle}
      >
        Book
      </Button>
    </div>
  );
};

export default VehicleModel;
