"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Product = {
  _id: string;
  name: string;
  img: string;
};

function trimName(name: string): string {
  const words = name.split(" ");
  if (words.length === 1) {
    return words[0].length > 10 ? words[0].slice(0, 10) + "..." : words[0];
  }
  const firstTwo = words[0] + " " + words[1];
  if (firstTwo.length <= 10) {
    return firstTwo;
  }
  return words[0].length > 10 ? words[0].slice(0, 10) + "..." : words[0];
}

export default function Suggestions() {
  const router = useRouter();
  const pathname = usePathname();
  const [products, setProducts] = useState<Product[]>([]);
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const currentProductId = pathname?.split("/").pop() || "";

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/electroniks`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      const filtered = products.filter((p) => p._id !== currentProductId);
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      setSuggestions(shuffled.slice(0, 3));
    }
  }, [loading, products, currentProductId]);

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-[18px] text-black opacity-70 animate-pulse">
          Loading suggestions...
        </p>
      </div>
    );

  return (
    <div className="max-w-[1110px] w-full mx-auto flex flex-col items-center mt-[112px]">
      <p className="font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase">
        you may also like
      </p>
      <div className="flex justify-between max-w-[1110px] items-center mt-[64px] w-full">
        {suggestions.map(({ _id, name, img }) => (
          <div key={_id} className="flex flex-col items-center">
            <Image
              src={img}
              width={350}
              height={318}
              className="w-[350px] h-[318px] object-contain"
              alt={name}
            />
            <p className="font-bold text-[24px] leading-[100%] tracking-[1.71px] text-center uppercase mt-[32px]">
              {trimName(name)}
            </p>
            <div
              onClick={() => router.push(`/product/${_id}`)}
              className="w-[160px] h-[48px] mt-[32px] cursor-pointer bg-[#D87D4A] hover:bg-[#FBAF85] flex items-center justify-center font-bold text-[13px] leading-[100%] tracking-[1px] uppercase text-white transition-colors duration-500 ease-in-out"
            >
              See Product
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
