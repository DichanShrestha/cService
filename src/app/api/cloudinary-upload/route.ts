import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import { writeFile } from 'fs/promises';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import upload from '@/lib/multer';
import { ApiError } from '@/types/ApiError';
import { join } from 'path';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware to handle file uploads
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const req = request as unknown as NextApiRequest;
  const res = {} as NextApiResponse; // Dummy response object for middleware
  
  try {
    // Run multer middleware to process the file upload
    const multerResult = await runMiddleware(req, res, upload.single('file'));

    if (!multerResult) {
      throw new ApiError(500, "failed to upload file in the temp dir")
    }

    // Log the file information

    const data = await request.formData()
    const file: File | null = data.get("localFilePath") as unknown as File;
    const filePath = './public/temp/' + file?.name;
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // const bytes = await file.arrayBuffer()
    // const buffer = Buffer.from(bytes)

    // const path = join('/', 'public', 'temp', file?.name)
    // await writeFile(path, buffer)

    // console.log(path);
    // const filePath = path;

    // Upload file to Cloudinary
    const response = await cloudinary.uploader.upload(filePath, { resource_type: 'auto' });
    console.log(response);
    
    // Remove local file after upload
    fs.unlinkSync(filePath);

    // Respond with Cloudinary URL
    return NextResponse.json({ url: response.secure_url });
  } catch (error: any) {
    console.error('Error:', error); // Log the error for debugging
    return NextResponse.json({ error: `Something went wrong: ${error.message}` }, { status: 500 });
  }
}