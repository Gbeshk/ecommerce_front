"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Description from "../Description/Description";
import CategoriesList from "../CategoriesList/CategoriesList";
import { useRouter } from "next/navigation";
interface InTheBoxItem {
  item: string;
  quantity: string;
}

interface ElectronikItem {
  _id: string;
  name: string;
  img: string;
  isNewEl: boolean;
  desc: string;
  price: string;
  priceInt: number;
  featuresTxt1: string;
  featuresTxt2: string;
  category: string;
  imgArray: string[];
  inTheBox: InTheBoxItem[];
}
export default function CategoryPageClient({ category }: { category: string }) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/electroniks`)
      .then((res) => res.json())
      .then((data: ElectronikItem[]) => {
        const filtered = data.filter((item) => item.category === category);

        const sorted = filtered.sort((a, b) => {
          if (a.isNewEl === b.isNewEl) {
            return b._id.localeCompare(a._id);
          }
          return a.isNewEl ? -1 : 1;
        });

        setProducts(sorted);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch products:", error);
        setLoading(false);
      });
  }, [category]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-[18px] text-black opacity-70 animate-pulse">
          Loading products...
        </p>
      </div>
    );
  }

  if (!products.length) {
    return (
      <p className="text-center mt-20 text-black text-xl">No products found.</p>
    );
  }

  return (
    <>
      <div className="w-full h-[240px] bg-[#0E0E0E] font-bold text-[40px] leading-[44px] tracking-[1.43px] text-center uppercase flex items-center justify-center text-white">
        {category}
      </div>

      <div className="max-w-[1110px] mx-auto pt-[100px] space-y-[150px]">
        {products.map((product: any, index: number) => (
          <div
            key={product._id}
            className={`flex flex-col md:flex-row justify-between ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            } gap-8 items-center`}
          >
            <Image
              src={product.img}
              alt={product.name}
              width={540}
              height={560}
              className="rounded-lg object-cover w-full max-w-[540px] h-auto"
            />
            <div className="flex flex-col justify-center text-center md:text-left items-center md:items-start">
              {product.isNewEl && (
                <p className="text-[#D87D4A] tracking-[10px] text-[14px] uppercase mb-[16px]">
                  New Product
                </p>
              )}
              <h2 className="text-black font-bold text-[40px] leading-[44px] tracking-[1.43px] uppercase max-w-[445px]">
                {product.name}
              </h2>
              <p className="opacity-50 mt-6 max-w-[445px] text-[15px] leading-[25px] tracking-[0px]">
                {product.desc}
              </p>
              <button
                onClick={() => {
                  router.push(`/product/${product._id}`);
                }}
                className="w-[160px] cursor-pointer h-[48px] bg-[#D87D4A] hover:bg-[#FBAF85] flex items-center justify-center text-white font-bold text-[13px] uppercase mt-8 transition"
              >
                See Product
              </button>
            </div>
          </div>
        ))}
      </div>
      <CategoriesList />
      <Description />
    </>
  );
}
