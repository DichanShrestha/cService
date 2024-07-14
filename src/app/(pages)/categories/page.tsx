"use client";
import Wrapper from "@/components/Wrapper";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { Loader2 } from "lucide-react";

const page = () => {
  const [wantCategory, setWantCategory] = useState(false);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const data = {
      name: category,
      subCategory: subCategory ? [{ name: subCategory }] : [],
    };
    setLoading(true);
    try {
      const response = await axios.post("/api/add-category", data);
      console.log(response);

      toast({
        title: "Success",
        description: response.data.message,
      });
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Failed",
        description:
          axiosError.response?.data.message ??
          "Failed to fetch message settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="flex gap-5">
        <div className="bg-gray-300 w-1/6 h-auto mt-16 ml-5 overflow-y-auto">
          List categories
        </div>

        <div className="flex justify-between mx-5 w-5/6">
          <div>
            <h1 className="font-bold text-xl">Categories (Todo)</h1>
            <span className="text-gray-500 text-xs">Choose your product</span>
          </div>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">+ Add New</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      id="name"
                      defaultValue="Tyres"
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex gap-2 ml-10">
                    <input
                      id="check"
                      type="checkbox"
                      onChange={() => setWantCategory(!wantCategory)}
                    />
                    <Label htmlFor="check" className="text-sm cursor-pointer">
                      Check to add sub category
                    </Label>
                  </div>

                  {wantCategory && (
                    <>
                      <h1 className="mt-4 font-bold">Add Sub Category</h1>
                      <div className="grid gap-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name" className="text-right">
                            Name
                          </Label>
                          <Input
                            value={subCategory}
                            onChange={(e) => setSubCategory(e.target.value)}
                            id="name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={submit} disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please Wait
                      </>
                    ) : (
                      <>Add</>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        {/* display items in each category */}
      </div>
    </Wrapper>
  );
};

export default page;
