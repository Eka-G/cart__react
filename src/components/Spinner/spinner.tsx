"use client";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

interface SpinnerProps {
  children?: React.ReactNode;
  spinning: boolean;
}

const spinIcon = (
  <LoadingOutlined
    style={{
      fontSize: 40,
    }}
    spin
  />
);

const Spinner = ({ children, spinning }: SpinnerProps) => {
  return (
    <Spin indicator={spinIcon} spinning={spinning}>
      {children}
    </Spin>
  );
};

export default Spinner;
