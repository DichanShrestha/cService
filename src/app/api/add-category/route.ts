import dbConnect from "@/lib/dbConnect";
import CategoryModel from "@/models/category.models";
import { ApiError, errorHandler } from "@/types/ApiError";
import { NextRequest, NextResponse } from "next/server";

export const config = {
  api: {
    bodyParser: true,
  },
};

export async function POST(req: NextRequest) {
  await dbConnect();

  try {
    const { name, subCategory } = await req.json();

    if (!name) {
      throw new ApiError(404, "Name not found");
    }

    const existingCategory = await CategoryModel.findOne({ name });

    if (existingCategory) {
      if (subCategory) {
        existingCategory.subCategory?.push(subCategory[0]);
        await existingCategory.save();
        return NextResponse.json(
          { success: true, message: "Category updated successfully" },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { success: false, message: "Category already exists" },
          { status: 409 }
        );
      }
    }

    const newCategory = new CategoryModel({
      name,
      subCategory: subCategory && subCategory.length > 0 ? subCategory : [],
    });

    await newCategory.save();

    return NextResponse.json(
      { success: true, message: "Category added successfully" },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error, NextResponse);
  }
}
