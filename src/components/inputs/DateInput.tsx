import { Input } from "antd";
import { useState } from "react";
import "./inputs_styles.scss";

export const DateInput = ({}: {}) => {
  const [orderDate, setOrderDate] = useState<string>("");

  return (
    <>
      <div className={"order-date-input-container"}>
        <Input
          className={"order-date-input"}
          value={orderDate}
          onChange={(e) => {
            setOrderDate(e.target.value);
          }}
          type="date"
          // type="datetime-local"
          status={""}
          placeholder={"Select a date"}
          allowClear
          //   defaultValue={"26/04/2023"}
        />
      </div>
    </>
  );
};
