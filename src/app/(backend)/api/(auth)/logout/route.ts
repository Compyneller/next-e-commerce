import { NextResponse } from "next/server";

export async function GET(){
    try {
        const response = NextResponse.json({
            message : "Logout Successful",
            success  : true
        }, {
            status : 200
        })
        response.cookies.set('token', "", {
            httpOnly : true, expires : new Date(0)
        })
        return response
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