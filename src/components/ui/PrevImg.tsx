import Image from "next/image";

type prevImgType = {
  prevImg?: File;
  loading: boolean;
  defaultImage?: string;
};
const PrevImg = ({ prevImg, defaultImage }: prevImgType) => {
  return (
    <>
      <div className=" border relative   w-full border-dashed rounded-xl flex items-center justify-center overflow-hidden h-[200px]">
        {prevImg || defaultImage ? (
          <div className="w-full h-[200px]">
            <Image
              fill
              draggable={false}
              className="object-cover"
              src={
                prevImg
                  ? URL.createObjectURL(prevImg)
                  : `${defaultImage}?${Date.now()}}`
              }
              alt="Preview"
            />
          </div>
        ) : (
          <p className="text-xs absolute text-muted-foreground">Preview</p>
        )}
      </div>
    </>
  );
};

export default PrevImg;
