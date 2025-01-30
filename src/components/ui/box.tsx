import React, { FC } from "react";
import { ContainerProps } from "./container";
import { cn } from "@/lib/utils";

const Box: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("w-full p-5 rounded-lg border", className)}>
      {children}
    </div>
  );
};

export default Box;
