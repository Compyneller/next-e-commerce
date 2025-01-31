import { prismadb } from "@/db/db.config";
import { NextResponse } from "next/server";

export async function GET() {
 
    try {
        const categories = await prismadb.category.findMany({
           include : {
            subCat : true
           }
        });
        return NextResponse.json({categories,
            message: "Categories fetched successfully",
            
        }, {
             status : 200
        });
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
