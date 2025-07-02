import CategoryPageClient from "@/app/components/categoryPageClient/CategoryPageClient";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  console.log(category);

  return (
    <div>
      <CategoryPageClient category={category} />
    </div>
  );
}
