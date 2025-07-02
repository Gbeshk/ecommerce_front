"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CategoriesList from "@/app/components/CategoriesList/CategoriesList";
import Description from "@/app/components/Description/Description";
import Suggestions from "@/app/components/Suggestions/Suggestions";
import { useCart } from "../CartProvider/CartProvider";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  name: string;
  category: string;
  img: string;
  isNewEl: boolean;
  desc: string;
  price: number;
  priceInt: number;
  featuresTxt1: string;
  featuresTxt2: string;
  inTheBox: { item: string; quantity: string }[];
  imgArray: string[];
}

export default function ProductPageClient({
  productId,
}: {
  productId: string;
}) {
  const { cartArray, setCartArray } = useCart();

  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState(false);
  const [x, setX] = useState(1);
  useEffect(() => {`${process.env.NEXT_PUBLIC_SERVER_URL}/electroniks/${productId}`
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/electroniks/${productId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch product");

        return res.json();
      })
      .then(setProduct)
      .catch(() => setError(true));
  }, [productId]);

  if (error) return <p className="text-center mt-20">Product not found.</p>;
  if (!product) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="w-full">
      <div className="w-full max-w-[1110px] mx-auto">
        <button
          onClick={() => router.back()}
          className="text-black w-[100px] hover:text-[#D87D4A] transition-all duration-200 hover:opacity-100 opacity-50 font-normal text-[15px] leading-[25px] tracking-[0px] mt-[64px] hover:underline cursor-pointer inline-block"
        >
          Go Back
        </button>
        <div className="w-full max-w-[1110px] mx-auto flex justify-between items-center mt-[48px] flex-col md:flex-row gap-8">
          <Image
            src={product.img}
            width={540}
            height={560}
            alt={product.name}
            className="rounded-lg"
          />
          <div className="flex flex-col">
            {product.isNewEl && (
              <p className="font-normal text-[14px] leading-[100%] tracking-[10px] uppercase text-[#D87D4A]">
                NEW PRODUCT
              </p>
            )}
            <p className="text-black font-bold text-[40px] leading-[44px] tracking-[1.43px] uppercase max-w-[445px] w-full mt-[24px]">
              {product.name}
            </p>
            <p className="text-black opacity-50 font-normal text-[15px] leading-[25px] tracking-[0px] max-w-[445px] w-full mt-[36px]">
              {product.desc}
            </p>
            <p className="font-bold text-[18px] leading-[100%] tracking-[1.29px] uppercase mt-[36px] text-black">
              {product.price}
            </p>

            <div className="flex items-center gap-4 mt-[36px]">
              <div className="w-[120px] h-[48px] bg-[#F1F1F1] flex justify-around items-center select-none">
                <p
                  onClick={() => {
                    if (x > 1) {
                      setX(x - 1);
                    }
                  }}
                  className="opacity-25 text-black font-bold text-[13px] leading-[100%] tracking-[1px] text-center uppercase cursor-pointer"
                >
                  -
                </p>
                <p className="font-bold text-[13px] leading-[100%] tracking-[1px] text-center uppercase">
                  {x}
                </p>
                <p
                  onClick={() => {
                    setX(x + 1);
                  }}
                  className="opacity-25 text-black font-bold text-[13px] leading-[100%] tracking-[1px] text-center uppercase cursor-pointer"
                >
                  +
                </p>
              </div>

              <div
                onClick={() => {
                  if (!product) return;

                  const newProduct = {
                    name: product.name,
                    price: `${product.price.toLocaleString()}`,
                    priceInt: product.priceInt,
                    img: product.img,
                    quantity: x,
                    id: product._id,
                  };

                  setCartArray((prev) => {
                    const existingCart = prev || [];

                    const productIndex = existingCart.findIndex(
                      (item) => item.name === newProduct.name
                    );

                    if (productIndex !== -1) {
                      const updatedCart = [...existingCart];
                      updatedCart[productIndex].quantity = newProduct.quantity;
                      return updatedCart;
                    } else {
                      return [...existingCart, newProduct];
                    }
                  });
                }}
                className="w-[160px] h-[48px] cursor-pointer bg-[#D87D4A] hover:bg-[#FBAF85] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase text-white transition-colors duration-500 ease-in-out"
              >
                Add to cart
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-[1110px] mx-auto mt-[156px] flex justify-between flex-col md:flex-row gap-12 md:gap-0">
          <div className="max-w-[635px] w-full">
            <p className="font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase">
              Features
            </p>
            <p className="text-black font-normal text-[15px] mt-[36px] leading-[25px] tracking-[0px] opacity-50">
              {product.featuresTxt1}
            </p>
            <p className="text-black font-normal mt-[24px] text-[15px] leading-[25px] tracking-[0px] opacity-50">
              {product.featuresTxt2}
            </p>
          </div>
          <div className="max-w-[350px] w-full">
            <p className="font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase">
              In the box
            </p>
            <div className="mt-[36px] space-y-4">
              {product.inTheBox.map((item, index) => (
                <div className="flex gap-4" key={index}>
                  <p className="text-[#D87D4A] font-bold text-[15px] leading-[25px] tracking-[0px]">
                    {item.quantity}
                  </p>
                  <p className="text-black opacity-50 font-normal text-[15px] leading-[25px]">
                    {item.item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {product.imgArray && product.imgArray.length >= 3 && (
          <div className="flex max-w-[1110px] w-full mx-auto mt-[156px] justify-between flex-col md:flex-row gap-8">
            <div className="flex flex-col gap-8">
              <Image
                src={product.imgArray[0]}
                alt="Gallery Image 1"
                width={445}
                height={280}
                className="w-[445px] h-[280px] rounded-lg object-cover"
              />
              <Image
                src={product.imgArray[1]}
                alt="Gallery Image 2"
                width={445}
                height={280}
                className="w-[445px] h-[280px] rounded-lg object-cover"
              />
            </div>
            <div>
              <Image
                src={product.imgArray[2]}
                alt="Gallery Image 3"
                width={635}
                height={592}
                className="w-[635px] h-[592px] rounded-lg object-cover"
              />
            </div>
          </div>
        )}
      </div>

      <Suggestions />
      <CategoriesList />
      <Description />
    </div>
  );
}
