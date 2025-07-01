import Image from "next/image";
import React from "react";
import ManPic from "../../../public/images/man.png";
export default function Description() {
  return (
    <>
      <div className="w-full max-w-[1110px] h-[588px]   mt-[188px] mx-auto flex  items-center justify-between">
        <div>
          <p className="max-w-[445px] w-full text-black font-bold text-[40px] leading-[44px] tracking-[1.43px] uppercase">
            Bringing you the <span className="text-[#D87D4A]">best</span> audio
            gear
          </p>
          <p className="max-w-[445px] w-full text-black opacity-50 mt-[24px] font-normal text-[15px] leading-[25px] tracking-[0px]">
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
        <Image
          src={ManPic}
          width={540}
          height={540}
          alt="arrow"
          className="w-[540px] h-[588px] "
        ></Image>
      </div>
    </>
  );
}
