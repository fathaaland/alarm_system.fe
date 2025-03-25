import * as React from "react";
import { Device } from "../../assets";
import { CirclePlus } from "lucide-react";
import { DeviceCard } from "../cards";
import { ModalWindow } from "../ModalWindow";
import { CreateDeviceForm } from "../forms/CreateDeviceForm";

interface TabsProps {
  devices?: Device[];
}

export const DevicesTab: React.FC<TabsProps> = ({ devices }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {/* devices tab toolbar */}
      <h3>Devices</h3>
      <button onClick={() => setIsOpen(true)}>
        <CirclePlus />
        Add Device
      </button>
      {/* device cards */}
      {devices?.map((device) => (
        <DeviceCard key={device.id} device={device} />
      ))}

      {/* modal for create household form */}
      <ModalWindow open={isOpen} onClose={() => setIsOpen(false)}>
        <CreateDeviceForm onCancel={() => setIsOpen(false)} />
      </ModalWindow>
    </>
  );
};
