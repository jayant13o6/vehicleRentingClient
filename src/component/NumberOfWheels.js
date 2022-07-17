import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  FormControlLabel,
} from "@mui/material";

const NumberOfWheels = () => {
  const [value, setValue] = useState();
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(e.target.id, ":", e.target.value);
    setValue(e.target.value);
  };

  const submitData = (e) => {
    e.preventDefault();
    if (value) {
      navigate(`/numberOfWheels/${value}`);
    }
  };

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
            <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
            <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
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

export default NumberOfWheels;
