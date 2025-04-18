import * as React from "react";
import { Log } from "../../assets";
import { LogCard } from "../cards/LogCard";

interface TabsProps {
  logs?: Log[];
}

export const LogsTab: React.FC<TabsProps> = ({ logs }) => {
  return (
    <>
      {/* logs tab toolbar */}
      <h3>Logs</h3>
      {/* log cards */}
      {logs?.map((log) => (
        <LogCard key={log._id} log={log} />
      ))}
    </>
  );
};
