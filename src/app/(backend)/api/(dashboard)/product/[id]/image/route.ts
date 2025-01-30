import { prismadb } from "@/db/db.config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, context: { params: any}) {
   try {
    const userId = await getDataFromToken(req)
    const { params } = context;
    const id =  params.id; 
    console.log("ID:", id);
    
    const {imgUrl, public_id} = await req.json();
    if(!id) {
        return NextResponse.json({error: "Product id is required"}, {status: 400});
    }
    if(!imgUrl || !public_id) {
        return NextResponse.json({error: "Image url and public id are required"}, {status: 400});
    }

    const product = await prismadb.productImages.create({
        data: {
            imgUrl,
            public_id,
            productId: id,
            userId: Number(userId)
        }
    })
    return NextResponse.json({message: "Image uploaded successfully", product}, {status: 200})
   } catch (error) {
    console.log(error);
    
    return NextResponse.json({error: "Internal server error"}, {status: 500})
   }
}




