import { prismadb } from "@/db/db.config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    const body = await request.json();
    console.log(body);
    
    const { catId, subCatName } = body;
    if (!userId) {
      return NextResponse.json("Unauthorize user", {
        status: 403,
      });
    }
    if (!catId) {
      return NextResponse.json("Category required to add sub category", {
        status: 401,
      });
    }
    if (!subCatName) {
      return NextResponse.json("Please enter sub category name", {
        status: 401,
      });
    }

    const response = await prismadb.subCategory.create({
      data: {
        catId : parseInt(catId),
        subCatName,
        userId : Number(userId),
      },
    });

    return NextResponse.json(
      {
        response,
        success: true,
      },
      {
        status: 200,
      }
    );
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
  } finally {
    prismadb.$disconnect();
  }
}


export async function DELETE(req: Request) {
    try {
        const id = await req.json()
        
        
        
        if (!id) {
            return NextResponse.json({ message: "Category not found" }, {
                status: 400
            })
        }
        const deleteCategory = await prismadb.subCategory.delete({
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