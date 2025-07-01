import CategoriesList from "@/app/components/CategoriesList/CategoriesList";
import Description from "@/app/components/Description/Description";
import HomeEarPhones from "@/app/components/homeEarPhones/HomeEarPhones";
import NewProduct from "@/app/components/NewProduct/NewProduct";
import OrangeSpeaker from "@/app/components/OrangeSpeaker/OrangeSpeaker";
import Zx7Headphonoe from "@/app/components/zx7headphone/Zx7Headphonoe";
import React from "react";

export default function page() {
  return (
    <>
      <div>
        <NewProduct />
        <CategoriesList />
        <OrangeSpeaker />
        <Zx7Headphonoe />
        <HomeEarPhones />
        <Description />
      </div>
    </>
  );
}
