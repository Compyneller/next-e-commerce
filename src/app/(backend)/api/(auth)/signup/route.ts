import { NextRequest, NextResponse } from "next/server";
import {prismadb}  from "@/db/db.config";
import bcryptjs from 'bcryptjs'

export async function POST(req:NextRequest) {
    try {
        const body = await req.json()
        
        const {email, password} = body
        if(!email){
            return NextResponse.json('Email is required', {
                status : 401,  
            })
        }
        if(!password){
           return NextResponse.json('Password is required', {
                status : 401,  
            })
        }
        const checkUserExists = await prismadb.user.findUnique(
            {
                where : {email}
            }
        )
        if(checkUserExists){
            return NextResponse.json("User already exits try different email",{
                status : 400
            })
        }


        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)
       const res = await prismadb.user.create({
            data : {
                email,
                password : hashedPassword
            }
        })

        return NextResponse.json(
            {
                message : 'user created',
                res,
                success : true
            }, {
                status  : 200
            }
        )
        
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            return NextResponse.json(error.message, {
                status: 500
            });
        }
        return NextResponse.json('An unknown error occurred', {
            status: 500
        });  
    }
}