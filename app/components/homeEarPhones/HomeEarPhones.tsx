"use client";
import Image from "next/image";
import React from "react";
import HomeEarPhonesPic from "../../../public/images/homeearphones.jpg";
import { useRouter } from "next/navigation";
function HomeEarPhones() {
  const router = useRouter();
  return (
    <>
      <div className="w-full max-w-[1110px] mt-[44px] mx-auto flex  justify-between">
        <div className="w-[540px] h-[320px]">
          <Image
            src={HomeEarPhonesPic}
            alt="speakers"
            className="w-[540px] h-[320px] rounded-xl object-cover"
            width={340}
            height={400}
          ></Image>
        </div>
        <div className="w-[540px] h-[320px] bg-[#F1F1F1]  gap-5  rounded-xl flex justify-center flex-col pl-[88px]">
          <p className="font-bold text-[28px] leading-[100%] tracking-[2px] uppercase">
            YX1 EARPHONES
          </p>
          <div
            onClick={() => router.push("/product/685d559b647baee54a5e910b")}
            className="w-[160px] h-[48px] border-[1.5px] border-black text-black bg-transparent hover:bg-black hover:text-white transition-all duration-500 ease-in-out cursor-pointer mt-[24px] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase"
          >
            See Product
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeEarPhones;
