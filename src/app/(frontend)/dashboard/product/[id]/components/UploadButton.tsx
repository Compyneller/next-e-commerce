import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const UploadButton = ({
  images,
  setImages,
  setPrevImages,
  productId,
}: {
  images: File[];
  setImages: (images: File[]) => void;
  setPrevImages: (images: any[]) => void;
  productId: string | null;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const uploadImages = async () => {
    if (images.length > 10) {
      toast.error("Maximum 10 images allowed");
      setImages([]);
      setPrevImages([]);
      return;
    }
    const base64Images = await Promise.all(
      images.map(
        (image) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(image);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
          })
      )
    );

    try {
      setLoading(true);
      const res = await axios.post(
        "/api/product/image",
        JSON.stringify({ images: base64Images })
      );
      if (res.status === 200) {
        const response = res.data.map(async (image: any) => {
          return await axios.post(
            `/api/product/${
              productId ? productId : localStorage.getItem("productId")
            }/image`,
            {
              imgUrl: image.secure_url,
              public_id: image.public_id,
            }
          );
        });
        const results = await Promise.all(response);
        results.forEach((result) => {
          toast.success(result.data.message);
        });
        setLoading(false);
        setImages([]);
        setPrevImages([]);
        localStorage.removeItem("productId");
        router.push(`/dashboard/product`);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data || error.message);
      setLoading(false);
    }
  };
  return (
    <Button
      disabled={images.length === 0 || loading}
      className="mb-5 bg-blue-500"
      onClick={uploadImages}>
      {loading ? <Loader2 className="animate-spin" /> : <Upload />} Upload
      Images
    </Button>
  );
};

export default UploadButton;
