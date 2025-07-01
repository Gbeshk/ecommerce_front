"use client"
import React from "react";
import Speakers from "../../../public/images/speakerpic.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

function OrangeSpeaker() {
  const router = useRouter();
  return (
    <div className="w-full max-w-[1110px] mx-auto rounded-lg mt-[188px] bg-[#D87D4A] h-[500px] flex justify-evenly items-center overflow-hidden relative">
      <div className="absolute w-[944px] h-[944px] border-2 border-white/20 rounded-full -top-6 -left-42"></div>
      <div className="absolute w-[542px] h-[542px] border-2 border-white/20 rounded-full top-[164px] left-[48px]"></div>
      <div className="absolute w-[472px] h-[472px] border-2 border-white/20 rounded-full top-[198px] left-[82px]"></div>
      <div className="w-[340px] h-[420px]">
        <Image
          src={Speakers}
          alt="speakers"
          className="w-[340px] h-[420px] mt-[118px] z-10 relative object-cover"
          width={340}
          height={400}
        ></Image>
      </div>
      <div className="z-10 relative">
        <p className="text-[56px] font-bold leading-[58px] tracking-[2px] uppercase w-full max-w-[261px] text-white">
          ZX9 SPEAKER
        </p>
        <p className="w-full text-[15px] leading-[25px] tracking-[0px] text-white opacity-75 mt-[24px] max-w-[350px]">
          Upgrade to premium speakers that are phenomenally built to deliver
          truly remarkable sound.
        </p>
        <div
          onClick={() => router.push("/product/685d537d647baee54a5e8f09")}
          className="w-[160px] h-[48px] bg-black text-white cursor-pointer mt-[24px] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase transition-all duration-500 ease-in-out hover:bg-[#4C4C4C]"
        >
          See Product
        </div>
      </div>
    </div>
  );
}

export default OrangeSpeaker;
