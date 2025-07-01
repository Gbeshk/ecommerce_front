"use client";
import Image from "next/image";
import Logo from "../../../public/images/logo.svg";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  return (
    <>
      <div className="w-full bg-[#0E0E0E] h-[368px] p-1 pb-[24px] mt-[188px]">
        <div className="w-full max-w-[1110px] mx-auto">
          <div className="h-[4px] w-[111px] bg-[#D87D4A] mt-[-4px]"></div>
        </div>
        <div className="w-full max-w-[1110px] mx-auto mt-[64px]  flex justify-between">
          <Image
            src={Logo}
            width={100}
            height={100}
            className="w-[143px] h-[25px]"
            alt="logo"
          ></Image>
          <div className="flex gap-8">
            <p
              onClick={() => router.push("/")}
              className="font-bold text-[13px] text-white cursor-pointer leading-[25px] tracking-[2px] uppercase hover:text-[#D87D4A] transition-colors duration-300 ease-in-out"
            >
              Home
            </p>
            <p
              onClick={() => router.push("/category/headphones")}
              className="font-bold text-[13px] leading-[25px] text-white cursor-pointer tracking-[2px] uppercase hover:text-[#D87D4A] transition-colors duration-300 ease-in-out"
            >
              HEADPHONES
            </p>
            <p
              onClick={() => router.push("/category/speakers")}
              className="font-bold text-[13px] leading-[25px] tracking-[2px] uppercase text-white cursor-pointer hover:text-[#D87D4A] transition-colors duration-300 ease-in-out"
            >
              SPEAKERS
            </p>
            <p
              onClick={() => router.push("/category/earphones")}
              className="font-bold text-[13px] leading-[25px] tracking-[2px] uppercase text-white cursor-pointer hover:text-[#D87D4A] transition-colors duration-300 ease-in-out"
            >
              EARPHONES
            </p>
          </div>
        </div>
        <div className="flex w-full max-w-[1110px] mx-auto justify-between mt-[36px]">
          <p className="text-white max-w-[540px] opacity-50 font-normal text-[15px] leading-[25px] tracking-[0px]">
            Audiophile is an all in one stop to fulfill your audio needs. We're
            a small team of music lovers and sound specialists who are devoted
            to helping you get the most out of personal audio. Come and visit
            our demo facility – we're open 7 days a week.
          </p>

          <div className="flex gap-5 self-end">
            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="cursor-pointer fill-white hover:fill-[#D87D4A] transition-colors duration-300"
            >
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>

            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="cursor-pointer fill-white hover:fill-[#D87D4A] transition-colors duration-300"
            >
              <path
                d="M23.954 4.569c-.885.392-1.83.656-2.825.775   1.014-.611 1.794-1.574 2.163-2.723-.949.564-2.005.974-3.127   1.195-.896-.959-2.173-1.559-3.591-1.559-2.717
       0-4.92 2.203-4.92 4.917 0 .39.045.765.127
    1.124-4.09-.205-7.719-2.165-10.148-5.144-.424.729-.666
    1.577-.666 2.475 0 1.708.869 3.213 2.188
    4.096-.807-.026-1.566-.248-2.229-.616v.061c0
    2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314
    0-.615-.03-.916-.086.631 1.953 2.445 3.376
    4.6 3.417-1.68 1.319-3.809 2.105-6.102
    2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768
    2.209 7.557 2.209 9.054 0 14-7.496 14-13.986
    0-.21 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"
              />
            </svg>

            <svg
              width="24"
              height="24"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="cursor-pointer fill-white hover:fill-[#D87D4A] transition-colors duration-300"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
            </svg>
          </div>
        </div>
        <div className="mx-auto w-full max-w-[1110px]">
          <p className="text-white opacity-50 font-bold text-[15px] leading-[25px] tracking-[0px] mt-[64px]">
            Copyright 2021. All Rights Reserved
          </p>
        </div>
      </div>
    </>
  );
}
