"use client";

import Image from "next/image";
import React, { useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";

export default function ProductCard({
  className,
  name = "name",
  price = 99,
  category = "category",
  stocks = 2,
  image = "",
}: {
  className?: string;
  name: string;
  price: number;
  category: string;
  stocks: number;
  image: string;
}) {
  const [reviews, setReviews] = useState(0);
  return (
    <div className={className}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
      />
      <CardContainer className="inter-var">
        <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[20rem] h-auto rounded-xl p-4 border">
          <CardItem
            translateZ="50"
            className="text-lg font-bold text-neutral-600 dark:text-white"
          >
            {`${name}(${stocks || 0})`}
          </CardItem>

          <CardItem translateZ="100" className="w-full mt-4">
            <Image
              src="/defaultImg.png"
              height="800"
              width="800"
              className="h-40 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="flex justify-between items-center mt-16">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-3 rounded-xl text-xl font-normal dark:text-white"
            >
              Rs {price || 0}
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-3 py-1 rounded-xl"
            >
              <span className="material-symbols-outlined">shopping_cart</span>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </div>
  );
}
