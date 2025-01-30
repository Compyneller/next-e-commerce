import { NextRequest, NextResponse } from "next/server";
import pLimit from "p-limit";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
  
  })
export const POST = async (req: NextRequest) => {
    
    try {
        const limit = pLimit(10);
        const {images} = await req.json();
        

    if(!images) return NextResponse.json("No images provided", {status: 400});
    if(images.length > 10) return NextResponse.json("Maximum 10 images allowed", {status: 400});

        const imageUpload = images.map((image: any)=>{
            
            return limit(async()=>{
                const result = await cloudinary.uploader.upload(image, {
                    folder: "product"
                });
                return result
            })
        })
        const results = await Promise.all(imageUpload);
        return NextResponse.json(results);
    } catch (error) {
        console.log(error);
        
        return NextResponse.json("Error uploading images", {status: 500});
    }
}

export const DELETE = async (req: NextRequest) => {
    try {
        const {public_id} = await req.json();


        const result = await cloudinary.api.delete_resources(public_id);
    

        return NextResponse.json(result, {status: 200});
        


   
    } catch (error) {
        console.log(error);
        
        return NextResponse.json("Error deleting images", {status: 500});
    }
}

