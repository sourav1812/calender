import React, { useEffect } from "react";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";

export default function ResponsiveDateTimePickers({
  event,
  timeStamp,
  getDate,
}) {
  const [value, setValue] = React.useState(dayjs(new Date()));

  useEffect(() => {
    console.log("ResponsiveDateTimePickers", event);
    const date = `${value.$D}-${value.$M}-${value.$y}`;
    const time = `${value.$H}-${value.$m}-${value.$s}`;
    getDate({
      date,
      time,
    });
  }, [value, event]);

  useEffect(() => {
    if (!timeStamp.date) setValue(dayjs(new Date()));
  }, [timeStamp]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoItem label="Static variant">
        <StaticDateTimePicker
          defaultValue={dayjs("2022-04-17T15:30")}
          label="Controlled picker"
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoItem>
    </LocalizationProvider>
  );
}
