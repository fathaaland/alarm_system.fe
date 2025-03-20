import * as React from "react";
import { Device } from "../assets";
import { DeviceCard } from "./DeviceCard";
import { CirclePlus } from "lucide-react";

interface TabsProps {
  devices?: Device[];
}

export const DevicesTab: React.FC<TabsProps> = ({ devices }) => {
  return (
    <>
      {/* devices tab toolbar */}
      <h3>Devices</h3>
      <button>
        <CirclePlus />
        Add Device
      </button>
      {/* device cards */}
      {devices?.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}
    </>
  );
};
