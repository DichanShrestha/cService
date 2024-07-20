import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { NextRequest, NextResponse } from 'next/server';
import path from 'path';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {  
  try {
    // get the form data
    const data = await request.formData();
    const file: File | null = data.get("localFilePath") as unknown as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), "public", "temp", file.name)
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // save in the local directory
    await writeFile(filePath, buffer)
    
    // Upload into cloudinary
    const response = await cloudinary.uploader.upload(filePath, { resource_type: 'auto' });
    console.log(response);
    
    // Remove local file after upload
    fs.unlinkSync(filePath);

    const cloudinaryResData = {
      url: response.secure_url,
      height: response.height,
      width: response.width
    }

    // Respond with Cloudinary URL
    return NextResponse.json({ data: cloudinaryResData, message: "Image uploaded successfully" }, {status: 200});

  } catch (error: any) {
    console.error('Error:', error); // Log the error for debugging
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}