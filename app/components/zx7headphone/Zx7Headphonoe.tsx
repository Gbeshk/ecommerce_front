"use client";
import React from "react";
import Zx7 from "../../../public/images/headphonezx7.jpg";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Zx7Headphonoe() {
  const router = useRouter();
  return (
    <div className="relative w-full max-w-[1110px] h-[320px] mx-auto mt-[44px] rounded-lg overflow-hidden">
      <Image src={Zx7} alt="zx7" className="rounded-lg object-cover" />
      <div className="flex absolute left-24 top-[100px]  gap-5 flex-col">
        <p className="font-bold text-[28px] leading-[100%] tracking-[2px] uppercase">
          ZX7 SPEAKER
        </p>
        <div
          onClick={() => router.push("/product/685d5423647baee54a5e8f10")}
          className="w-[160px] h-[48px] border-[1.5px] border-black text-black bg-transparent hover:bg-black hover:text-white transition-all duration-500 ease-in-out cursor-pointer mt-[24px] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase"
        >
          See Product
        </div>
      </div>
    </div>
  );
}

export default Zx7Headphonoe;
