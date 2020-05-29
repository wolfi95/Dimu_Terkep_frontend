import React from "react";
import { Slider } from "@material-ui/core";

const Timeline = (props) => {
  const handleChange = (event: any, newValue: number | number[]) => {
    props.onTimelineChange(event.target.value, newValue);
  };

  return (
    <div className="timelineContainer">
      <div className="timelineBlock">
        <Slider
          value={props.currentDates}
          onChange={handleChange}
          valueLabelDisplay="on"
          aria-labelledby="range-slider"
          min={props.initialDates[0]}
          max={props.initialDates[1]}
          marks={[
            { value: props.initialDates[0], label: props.initialDates[0] },
            { value: props.initialDates[1], label: props.initialDates[1] },
          ]}
        />
      </div>
    </div>
  );
};

export default Timeline;
