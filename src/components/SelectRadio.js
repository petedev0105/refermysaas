"use client";
import React, { useState } from "react";
import { Radio, Select, Space } from "antd";

const SelectRadio = () => {
  const options = [];
  const [size, setSize] = useState("middle");
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }
  const handleChange = (value) => {
    console.log(`Selected: ${value}`);
  };
  return (
    <>
      <Space
        direction="vertical"
        style={{
          width: "100%",
        }}
      >
        <Select
          mode="multiple"
          size={size}
          placeholder="Please select"
          defaultValue={["a10", "c12"]}
          onChange={handleChange}
          style={{
            width: "100%",
          }}
          className="z-50"
          options={options}
        />
      </Space>
    </>
  );
};
export default SelectRadio;
