import * as React from "react";
import { Log } from "../../assets";

interface LogCardProps {
  log?: Log;
}

export const LogCard: React.FC<LogCardProps> = ({ log }) => {
  return (
    <>
      <div>
        <h4>{log?.type}</h4>
      </div>
    </>
  );
};
