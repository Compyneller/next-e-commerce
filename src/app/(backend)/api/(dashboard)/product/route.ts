import { prismadb } from "@/db/db.config";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req : NextRequest){
    try {
        const userId = await getDataFromToken(req)
        const body = await req.json()
        const {prodName , category, mrp, price, stocks, desc, subCat, unit, dimension, type} = body
        if(!userId){
            return NextResponse.json({
                message : 'Unauthorize access',
                success : false

            }, {
                status : 401
            })
        }
        if(!prodName || !category || !mrp || !price || !stocks || !desc || !unit || !dimension || !type ){
            return NextResponse.json({
                message : 'All fields are required',
                success : false
            }, {
                status : 400
            })
        }
        const checkProduct = await prismadb.product.findFirst({
            where : {
                prodName : prodName
            }
        })

        if(checkProduct){
            return NextResponse.json({
                message : 'Product already exists',
                success : false
            }, {
                status : 400
            })
        }

        const product = await prismadb.product.create({
            data : {
                prodName,
                category,
                mrp : Number(mrp),
                price : Number(price),
                stocks : Number(stocks),
                desc,
                userId : Number(userId),
                subCat,
                unit,
                dimension,
                type
            }
        })
        return NextResponse.json({
            message : 'Product created successfully',
            success : true,
            product
        }, {
            status : 201
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : 'Internal server error',
            success : false
        }, {
            status : 500
        })
    }

}


export async function GET(req : NextRequest){
    try {
        const userId = await getDataFromToken(req)
        if(!userId){
            return NextResponse.json({
                message : 'Unauthorize access',
                success : false
            }, {
                status : 401
            })
        }

        const product = await prismadb.product.findMany({
            where : {
                userId : Number(userId)
            },
            include : {
                user : false,
                prodImage : true
            }
        })


        return NextResponse.json({
            message : 'Product fetched successfully',
            success : true,
            product
        }, {
            status : 200
        })

    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message : 'Internal server error',
            success : false
        }, {
            status : 500
        })
    }
}


export async function DELETE(req: NextRequest) {
    try {
       
            const userId = await getDataFromToken(req)
            const body = await req.json()
            const {productId} = body
            if(!userId){
                return NextResponse.json({
                    message: "Unauthorize access",
                    success: false
                }, {status: 401})
            }
            const response = await prismadb.product.delete({
                where: {
                    userId: Number(userId),
                    id: productId
                }
            })
            return NextResponse.json({
                message: "Product deleted successfully",
                response
            }, {status: 200})   
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Internal server error",
            success: false
        }, {status: 500})

    }
}
