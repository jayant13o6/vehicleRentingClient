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

const VehicleType = () => {
  const [value, setValue] = useState();
  const [vehicleTypes, setVehicleTypes] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const handleChange = (e) => {
    console.log(e.target.id, ":", e.target.value);
    setValue(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/VehicleModel/${value}`);
    }
  };

  useEffect(() => {
    fetch("http://localhost:8080/vehicleType")
      .then((response) => response.json())
      .then((data) => {
        setVehicleTypes(data);
        console.log("my result", vehicleTypes, id);
      })
      .catch((err) => console.error(err));
  }, []);

  if (!vehicleTypes.length) {
    console.log(vehicleTypes.length);
    return <LinearProgress />;
  }

  return (
    <div>
      <div className="formControl">
        <FormControl>
          <FormLabel id="demo-controlled-radio-buttons-group">
            Choose your vehicle type:
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={value}
            onChange={handleChange}
          >
            {vehicleTypes?.map(
              (ele) =>
                ele.numberOfWheels == id && (
                  <FormControlLabel
                    value={ele.vehicleTypeName}
                    key={ele._id}
                    control={<Radio />}
                    label={ele.vehicleTypeName}
                  />
                )
            )}
          </RadioGroup>
        </FormControl>
      </div>
      <Button
        variant="contained"
        href="#contained-buttons"
        onClick={submitData}
      >
        Next
      </Button>
    </div>
  );
};

export default VehicleType;
