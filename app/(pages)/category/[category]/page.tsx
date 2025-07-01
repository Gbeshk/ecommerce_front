import CategoryPageClient from "@/app/components/categoryPageClient/CategoryPageClient";
import React from "react";

export default async function Page({
  params,
}: {
  params: { category: string };
}) {
  const { category } =  params;
  console.log(category);
  

  return (
    <div>
      <CategoryPageClient category={category} />
    </div>
  );
}
