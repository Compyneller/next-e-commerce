import { NextRequest, NextResponse } from "next/server";
import {prismadb}  from "@/db/db.config";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";




export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;
    if (!email) {
      return NextResponse.json("Email is required", {
        status: 401,
      });
    }
    if (!password) {
      return NextResponse.json("Password is required", {
        status: 401,
      });
    }
    const checkUserExists = await prismadb.user.findUnique({
      where: { email },
    });
    if (!checkUserExists) {
      return NextResponse.json("User does not exits", {
        status: 400,
      });
    }

    const validatedPassword = await bcryptjs.compare(
      password,
      checkUserExists.password
    );
    if (!validatedPassword) {
      return NextResponse.json("Incorrect Password", {
        status: 400,
      });
    }
    const tokenData = {
      id: checkUserExists.id,
      email: checkUserExists.email,
    };
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1d",
    });

    const response = NextResponse.json(
      {
        message: "Login Successful",
        success: true,
      },
      {
        status: 200,
      }
    );
    response.cookies.set("token", token, {

      httpOnly: true,
      
    });
    return response;
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
