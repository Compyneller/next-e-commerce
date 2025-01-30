import { prismadb } from '@/db/db.config';
import {v2 as cloudinary} from 'cloudinary'
import { NextRequest, NextResponse } from 'next/server'

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json()
    const { public_id, id } = body

    const result = await cloudinary.uploader.destroy(public_id)

    // Corrected Cloudinary response check
    if (result.result === 'ok') {
      const response = await prismadb.productImages.delete({
        where: {
          id: Number(id)
        }
      })
      return NextResponse.json({ message: "Image deleted successfully", response, success : true }, { status: 200 })
    }

    return NextResponse.json({ message: "Image not deleted from Cloudinary" }, { status: 400 })

  } catch (error: any) {
    console.error(error)
    // Added return statement for error response
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}