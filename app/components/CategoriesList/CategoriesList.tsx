"use client";
import { useRouter } from "next/navigation";
import React from "react";
import EarPhones from "../../../public/images/earphones.png";
import Speakers from "../../../public/images/speakers.png";
import HeadPhones from "../../../public/images/headphones.png";
import ArrrowRight from "../../../public/images/arrowright.png";
import Image from "next/image";

function CategoriesList() {
  const router = useRouter();

  return (
    <>
      <div className="mt-[198px] flex justify-center gap-8">
        <div
          onClick={() => router.push("/category/headphones")}
          className="w-[350px] bg-[#F1F1F1] h-[224px] flex group flex-col items-center cursor-pointer"
        >
          <Image
            src={HeadPhones}
            width={100}
            height={100}
            alt="headPhones"
            className="mt-[-64px] w-[123px] h-[160px] object-contain"
            style={{ filter: "drop-shadow(0 35px 35px rgba(0, 0, 0, 0.6))" }}
          ></Image>
          <p className="font-bold text-[18px] leading-[100%] mt-[52px] tracking-[1.29px] text-center uppercase">
            HeadPhones
          </p>
          <div className="flex items-center gap-2 mt-[16px]  cursor-pointer">
            <p className="opacity-50 font-bold text-[13px] leading-[100%] tracking-[1px] uppercase transition-all duration-300 ease-in-out group-hover:text-[#D87D4A] group-hover:opacity-100">
              Shop
            </p>
            <Image
              src={ArrrowRight}
              width={100}
              height={100}
              alt="arrow"
              className="w-[8px] h-[10px]"
            />
          </div>
        </div>

        <div
          onClick={() => router.push("/category/speakers")}
          className="w-[350px] bg-[#F1F1F1] h-[224px] flex flex-col items-center cursor-pointer group"
        >
          <Image
            src={Speakers}
            width={100}
            height={100}
            alt="speakers"
            className="mt-[-64px] w-[123px] h-[160px] object-contain"
            style={{ filter: "drop-shadow(0 35px 35px rgba(0, 0, 0, 0.6))" }}
          ></Image>
          <p className="font-bold text-[18px] leading-[100%] mt-[52px] tracking-[1.29px] text-center uppercase">
            speakers
          </p>
          <div className="flex items-center gap-2 mt-[16px]">
            <p className="opacity-50 font-bold text-[13px] leading-[100%] tracking-[1px] uppercase group-hover:text-[#D87D4A] group-hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer">
              Shop
            </p>
            <Image
              src={ArrrowRight}
              width={100}
              height={100}
              alt="arrow"
              className="w-[8px] h-[10px]"
            ></Image>
          </div>
        </div>

        <div
          onClick={() => router.push("/category/earphones")}
          className="w-[350px] bg-[#F1F1F1] h-[224px] flex flex-col items-center cursor-pointer group"
        >
          <Image
            src={EarPhones}
            width={100}
            height={100}
            alt="EarPhones"
            className="mt-[-64px] w-[178px] h-[161px] object-contain"
            style={{ filter: "drop-shadow(0 35px 35px rgba(0, 0, 0, 0.6))" }}
          ></Image>
          <p className="font-bold text-[18px] leading-[100%] mt-[48px] tracking-[1.29px] text-center uppercase">
            EarPhones
          </p>
          <div className="flex items-center gap-2 mt-[16px]">
            <p className="opacity-50 font-bold text-[13px] leading-[100%] tracking-[1px] uppercase group-hover:text-[#D87D4A] group-hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer">
              Shop
            </p>
            <Image
              src={ArrrowRight}
              width={100}
              height={100}
              alt="arrow"
              className="w-[8px] h-[10px]"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesList;
