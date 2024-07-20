"use client";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { FormEvent, useState } from "react";

const Page = () => {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    stocks: 0,
    price: 0,
    image: null as File | null,
  });
  const [imageURL, setImageURL] = useState<string>('/defaultImg.png');
  const [imgDimension, setImgDimension] = useState({
    height: 0 as number,
    width: 0 as number,
  })
  const [imgLoading, setImgLoading] = useState<boolean>(false);

  const addImg = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (product.image) {
      formData.append("localFilePath", product.image);
    }

    try {
      setImgLoading(true)
      const response = await axios.post("/api/cloudinary-upload", formData);
      console.log(response.data.data);
      setImageURL(response.data.data.url)
      setImgDimension({height: response.data.data.height, width: response.data.data.width})
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setImgLoading(false)
    }
  };

  return (
    <>
      <div className="flex justify-between mx-5 w-screen">
        <div>
          <h1 className="font-bold text-xl">Products (Todo)</h1>
          <span className="text-gray-500 text-xs">Add your product</span>
          <div className="relative mt-2 w-screen">
            <hr className="border-gray-400 w-full -ml-[55px]" />
          </div>
        </div>
      </div>
      <div className="mt-5">
        <div className="flex gap-4">
          <div>
            <Label htmlFor="images" className="font-bold text-white">
              Images
            </Label>
            <Input
              id="images"
              type="file"
              className="w-[109px] mt-2"
              onChange={(e) =>
                setProduct({ ...product, image: e.target.files ? e.target.files[0] : null })
              }
            />
          </div>
          <Button onClick={addImg} className="mt-8" variant="outline" disabled={imgLoading}>
            {imgLoading ? <><Loader2 className="animate-spin h-4 w-4 mr-2"/>Uploading</> : <>Add Image</>}
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <div className="flex flex-wrap gap-5 mt-4 w-full lg:w-3/5">
            <div>
              <Label htmlFor="Name" className="font-bold text-white">
                Name
              </Label>
              <Input
                id="Name"
                className="w-44 mt-2"
                value={product.name}
                onChange={(e) =>
                  setProduct({ ...product, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="Price" className="font-bold text-white">
                Price
              </Label>
              <Input
                id="Price"
                className="w-44 mt-2"
                value={product.price || 0}
                onChange={(e) =>
                  setProduct({ ...product, price: parseFloat(e.target.value) })
                }
              />
            </div>
            <div>
              <Label htmlFor="Category" className="font-bold text-white">
                Category
              </Label>
              <Input
                id="Category"
                className="w-44 mt-2"
                value={product.category}
                onChange={(e) =>
                  setProduct({ ...product, category: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="Stocks" className="font-bold text-white">
                Stocks
              </Label>
              <Input
                id="Stocks"
                className="w-44 mt-2"
                value={product.stocks || 0}
                onChange={(e) =>
                  setProduct({ ...product, stocks: parseInt(e.target.value) })
                }
              />
            </div>
            <div>
              <Button variant="outline" className="mt-8" onClick={addImg}>
                Submit
              </Button>
            </div>
          </div>
          <div className="mt-4 lg:mt-0 lg:w-2/5 ">
            <h1 className="text-lg font-bold mb-4 text-center">
              Your product will be displayed like this
            </h1>
            <ProductCard
              className=""
              name={product.name}
              category={product.category}
              price={product.price}
              stocks={product.stocks}
              image={imageURL}
              height={imgDimension.height}
              width={imgDimension.width}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
