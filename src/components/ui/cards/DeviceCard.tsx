import * as React from "react";
import { Device } from "../../assets";

interface DeviceCardProps {
  device?: Device;
}

export const DeviceCard: React.FC<DeviceCardProps> = ({ device }) => {
  return (
    <>
      <div>
        <h4>{device?.name}</h4>
      </div>
    </>
  );
};
