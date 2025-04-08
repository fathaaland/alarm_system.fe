import * as React from "react";

interface SkeletonProps {
  w: number;
  h: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ w, h }) => {
  return <div style={{ width: w, height: h }}></div>;
};
