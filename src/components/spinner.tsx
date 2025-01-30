import { Loader } from "lucide-react";
import React, { FC } from "react";

type spinnerProps = {
  loading: boolean;
  size?: number;
};
const Spinner: FC<spinnerProps> = ({ loading, size }) => {
  return <>{loading && <Loader size={size} className="animate-spin" />}</>;
};

export default Spinner;
