import { prismadb } from "@/db/db.config"
import { getDataFromToken } from "@/helpers/getDataFromToken"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (req: NextRequest) => {
   try {
    const body = await req.json()
    
    const {productType} = body
    console.log(productType);
    
    const userId = await getDataFromToken(req)
    if(!userId){
        return NextResponse.json({message : "Unauthorize access"}, {status : 401})
    }
    if(!productType){
        return NextResponse.json({message : "Product type is required"}, {status : 400})
    }
    const response = await prismadb.typeOfProduct.create({
        data : {
            productType,
            userId : Number(userId)
        }
    })
    return NextResponse.json({message : "Product type created successfully", response, success : true}, {status : 200})
   } catch (error) {
    console.log(error);
    console.log(error);
    
    return NextResponse.json({message : "Internal server error", success : false}, {status : 500})
   }
    
}

export const GET = async (req: NextRequest) => {
  try {
    const userId = await getDataFromToken(req)
    if(!userId){
        return NextResponse.json({message : "Unauthorize access"}, {status : 401})
    }
    const response = await prismadb.typeOfProduct.findMany({
        where : {
            userId : Number(userId)
        }
    })
    return NextResponse.json({message : "Product type fetched successfully", response, success : true}, {status : 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message : "Internal server error", success : false}, {status : 500})

  }
}

export const DELETE = async (req: NextRequest) => {
  try {
    const body = await req.json();
  const { id } = body;
  console.log(id);
  
  const response = await prismadb.typeOfProduct.delete({
    where : {
      id : Number(id)
    }
  })
  return NextResponse.json({message : "Product type deleted successfully", response, success : true}, {status : 200})
  } catch (error) {
    console.log(error);
    return NextResponse.json({message : "Internal server error", success : false}, {status : 500})
  }
};
