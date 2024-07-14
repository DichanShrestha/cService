import mongoose, { Schema, Document, model } from "mongoose";

interface ISubCategory extends Document {
  name: string;
}

const subCategorySchema = new Schema<ISubCategory>({
  name: {
    type: String,
    required: [true, "name of sub-category is required"],
  },
});

interface ICategory extends Document {
  name: string;
  subCategory?: ISubCategory[];
}

const categorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: [true, "name of category is required"],
  },
  subCategory: [subCategorySchema],
});

const CategoryModel =
  (mongoose.models.Category as mongoose.Model<ICategory>) ||
  model<ICategory>("Category", categorySchema);

export default CategoryModel;
