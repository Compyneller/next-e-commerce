import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import {prismadb} from "@/db/db.config";


export async function POST(req: NextRequest) {
  try {
   
    const userId = await getDataFromToken(req)
    const body = await req.json();
    const { catName, imgUrl, public_id } = body;

    if(!userId){
      return NextResponse.json("Unauthorize user", { status: 403 });
    }

    if (!catName) {
      return NextResponse.json("Please enter category name", { status: 400 });
    }
    if (!imgUrl) {
      return NextResponse.json("Please upload category image", { status: 400 });
    }
    const ifCategory = await prismadb.category.findFirst({
      where : {
        catName
      }
    })   
    if(ifCategory){
      return NextResponse.json("Category already create try different name", {
        status : 401
      })
    } 
    // Create the category with the user ID
    const response = await prismadb.category.create({
      data: {
        catName,
        imgUrl,
        userId : Number(userId),
        public_id // Set the userId from the token
      },
    });

    return NextResponse.json({
      response ,
      success : true
    }, {
      status : 200
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
    return NextResponse.json("An unknown error occurred", {
      status: 500,
    });
  }
}




export async function GET(req : NextRequest){
  const userId = await getDataFromToken(req)
  try {
    console.log('hitting get route');

      const data : any  = await prismadb.category.findMany(
        
       {
        where : {
          userId :Number(userId) 
        },
        
          include : {
            subCat : true
          }
        
       }
      );        
      return NextResponse.json({
        data,
        success : true
      }, {
        status : 200
      })
  } catch (error : any) {
    console.log(error);
    if (error instanceof Error) {
      return NextResponse.json(error.message, {
        status: 500,
      });
    }
    return NextResponse.json("An unknown error occurred", {
      status: 500,
    });
  }
  
}


export async function DELETE(req: Request) {
  try {
      const body = await req.json()
      const {id} = body
      console.log(body.id);
      
      
      if (!body.id) {
          return NextResponse.json({ message: "Category not found" }, {
              status: 400
          })
      }
      const deleteCategory = await prismadb.category.delete({
          where: {
              id: Number(id),
          },
      })
      return NextResponse.json(deleteCategory)
  } catch (error : any) {
    console.log(error);
    
      return NextResponse.json({ error: error.message }, {
          status: 500
      })
  }
}