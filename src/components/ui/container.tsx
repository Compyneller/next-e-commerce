import { cn } from "@/lib/utils";
import React, { FC } from "react";

export type ContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const Container: FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={cn("w-[95%] max-w-7xl mx-auto", className)}>{children}</div>
  );
};

export default Container;
