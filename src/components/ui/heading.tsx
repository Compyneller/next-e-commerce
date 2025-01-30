import { cn } from "@/lib/utils";
import { FC } from "react";

type headingProps = {
  title: string;
  text?: string;
  className?: string;
};

const Heading: FC<headingProps> = ({ title, text, className }) => {
  return (
    <div className="mb-5">
      <h1 className={cn("text-4xl mb-2 font-bold", className)}>{title}</h1>
      {text && <p className=" text-muted-foreground">{text}</p>}
    </div>
  );
};

export default Heading;
