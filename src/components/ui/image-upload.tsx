import Image from "next/image";
import { FC } from "react";

interface imageUploadProps {
  progress: any;
  prevImage: any;
  folderName?: string;
}
const ImageUpload: FC<imageUploadProps> = ({ progress, prevImage }) => {
  return (
    <>
      <div className="w-full mb-3 border border-dashed rounded-lg h-[200px]">
        <Image
          src={prevImage && URL.createObjectURL(prevImage)}
          fill
          className="object-cover w-full h-[200px]"
          alt=""
        />
      </div>
      <h1 className="text-3xl font-bold">{progress}%</h1>
      <div className="w-full h-[10px] relative  bg-secondary-foreground">
        <div
          className="absolute left-0 h-[10px] bg-blue-500 top-0 bottom-0"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>
    </>
  );
};

export default ImageUpload;
