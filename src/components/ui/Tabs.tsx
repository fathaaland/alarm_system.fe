import * as React from "react";
import { Household } from "../assets";
import { DevicesTab } from "./DevicesTab";
import { MembersTab } from "./MembersTab";
import { LogsTab } from "./LogsTab";

interface TabsProps {
  data?: Household;
}

export const Tabs: React.FC<TabsProps> = ({ data }) => {
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <>
      {/* tab selection menu */}
      <div>
        <button key={"devices"} onClick={() => setActiveTab(0)}>
          Devices
        </button>
        <button key={"members"} onClick={() => setActiveTab(1)}>
          Members
        </button>
        <button key={"logs"} onClick={() => setActiveTab(2)}>
          History
        </button>
      </div>
      {/* content of active tab */}
      {activeTab === 0 && <DevicesTab devices={data?.devices} />}
      {activeTab === 1 && <MembersTab members={data?.members} />}
      {activeTab === 2 && <LogsTab logs={data?.logs} />}
    </>
  );
};
