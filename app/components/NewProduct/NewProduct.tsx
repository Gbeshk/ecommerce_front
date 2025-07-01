"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";
import MainImage from "../../../public/images/homeHeadphones.svg";
export default function NewProduct() {
  const router = useRouter();

  return (
    <div className="w-full bg-[#0E0E0E] h-[652px] mx-auto rounded-b-md">
      <div className="w-full max-w-[1110px] bg-white h-[1px] opacity-20 mx-auto"></div>
      <div className="w-full max-w-[1110px] mx-auto flex items-center justify-between ">
        <div>
          <p className="opacity-50 font-normal text-white text-[14px] leading-[100%] tracking-[10px] uppercase">
            New Product
          </p>
          <p className="w-[400px] mt-[24px] text-white font-manrope font-bold text-[56px] leading-[58px] tracking-[2px] uppercas">
            XX99 Mark II Headphones
          </p>
          <p className="w-[350px] mt-[24px] text-white  text-[15px] leading-[25px] tracking-[0px]">
            Experience natural, lifelike audio and exceptional build quality
            made for the passionate music enthusiast.
          </p>
          <div
            onClick={() => router.push("/product/685d4261f05f27a20d0d8e3a")}
            className="w-[160px] h-[50px] cursor-pointer mt-[36px] bg-[#D87D4A] hover:bg-[#FBAF85] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase text-white transition-colors duration-500 ease-in-out"
          >
            SEE PRODUCT
          </div>
        </div>
        <Image
          src={MainImage}
          width={651}
          height={651}
          alt="mainHeadPhones"
          className="h-[651px] w-[628px] object-contain"
        ></Image>
      </div>
    </div>
  );
}
