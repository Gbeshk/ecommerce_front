"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface ProductFormData {
  name: string;
  category: string;
  price: string;
  desc: string;
  featuresTxt1: string;
  featuresTxt2: string;
  img: string;
  imgArray: string[];
  inTheBox: string;
  isNewEl: boolean;
}

interface FormErrors {
  [key: string]: string;
}

function AdminPanel() {
  const router = useRouter();

  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    category: "",
    price: "",
    desc: "",
    featuresTxt1: "",
    featuresTxt2: "",
    img: "",
    imgArray: ["", "", ""],
    inTheBox: "",
    isNewEl: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-gray-100");

    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  const categories = ["headphones", "speakers", "earphones"];

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageArrayChange = (index: number, value: string) => {
    const newImgArray = [...formData.imgArray];
    newImgArray[index] = value;
    setFormData((prev) => ({
      ...prev,
      imgArray: newImgArray,
    }));

    if (errors[`imgArray${index}`]) {
      setErrors((prev) => ({
        ...prev,
        [`imgArray${index}`]: "",
      }));
    }
  };

  const parseInTheBox = (inTheBoxText: string) => {
    const lines = inTheBoxText.split("\n").filter((line) => line.trim());
    return lines.map((line) => {
      const match = line.match(/^(\d+)x?\s*(.+)$/);
      if (match) {
        return {
          quantity: `${match[1]}x`,
          item: match[2].trim(),
        };
      } else {
        return {
          quantity: "1x",
          item: line.trim(),
        };
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.category.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (!/^\$\s[\d,]+$/.test(formData.price)) {
      newErrors.price = "Price must be in format $ 1,000";
    }

    if (!formData.desc.trim()) {
      newErrors.desc = "Description is required";
    } else if (formData.desc.length < 50) {
      newErrors.desc = "Description must be at least 50 characters";
    }

    if (!formData.featuresTxt1.trim()) {
      newErrors.featuresTxt1 = "Features text 1 is required";
    }

    if (!formData.featuresTxt2.trim()) {
      newErrors.featuresTxt2 = "Features text 2 is required";
    }

    if (!formData.img.trim()) {
      newErrors.img = "Main image URL is required";
    } else if (!isValidUrl(formData.img)) {
      newErrors.img = "Please enter a valid image URL";
    }

    formData.imgArray.forEach((img, index) => {
      if (!img.trim()) {
        newErrors[`imgArray${index}`] = `Image ${index + 1} URL is required`;
      } else if (!isValidUrl(img)) {
        newErrors[`imgArray${index}`] = `Please enter a valid URL for image ${
          index + 1
        }`;
      }
    });

    if (!formData.inTheBox.trim()) {
      newErrors.inTheBox = "In the box information is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0];
      const element = document.getElementById(firstErrorField);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
        element.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const formattedData = {
        ...formData,
        inTheBox: parseInTheBox(formData.inTheBox),
      };

      const response = await fetch("http://localhost:3001/electroniks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error("Server response:", response.status, errorData);
        throw new Error(`Server error: ${response.status} - ${errorData}`);
      }

      const result = await response.json();
      console.log("Success response:", result);
      alert("Product added successfully!");
      router.push(`/categories/${formData.category}`);
      setFormData({
        name: "",
        category: "",
        price: "",
        desc: "",
        featuresTxt1: "",
        featuresTxt2: "",
        img: "",
        imgArray: ["", "", ""],
        inTheBox: "",
        isNewEl: false,
      });
    } catch (error: any) {
      console.error("Submission error:", error);
      alert(`Error creating product: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInputClassName = (fieldName: string) => {
    const baseClass =
      "w-full h-[56px] px-4 rounded-xl border font-manrope font-bold text-[14px] leading-[100%] tracking-[-0.25px] placeholder:text-black placeholder:opacity-40 focus:outline-none";
    const errorClass = errors[fieldName]
      ? "border-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-[#D87D4A]";
    return `${baseClass} ${errorClass}`;
  };

  const getTextareaClassName = (fieldName: string) => {
    const baseClass =
      "w-full px-4 py-4 rounded-xl border font-manrope font-bold text-[14px] leading-[100%] tracking-[-0.25px] placeholder:text-black placeholder:opacity-40 focus:outline-none resize-none";
    const errorClass = errors[fieldName]
      ? "border-red-500 focus:ring-2 focus:ring-red-500"
      : "border-gray-300 focus:ring-2 focus:ring-[#D87D4A]";
    return `${baseClass} ${errorClass}`;
  };

  return (
    <div className="w-full max-w-[1110px] mx-auto">
      <p
        onClick={() => router.back()}
        className="text-black opacity-50 hover:text-[#D87D4A] transition-all duration-200 hover:opacity-100 font-normal text-[15px] leading-[25px] tracking-[0px] mt-[64px] hover:underline cursor-pointer"
      >
        Go Back
      </p>

      <div className="flex w-full justify-center">
        <div className="w-full max-w-[800px] bg-white rounded-lg px-8 py-12 mt-6">
          <p className="font-manrope font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase">
            ADD NEW PRODUCT
          </p>

          <form onSubmit={handleSubmit}>
            <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
              Basic Information
            </p>

            <div className="flex gap-6 mt-[24px]">
              <div className="flex-1">
                <label
                  htmlFor="name"
                  className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="XX99 Mark II Headphones"
                  className={getInputClassName("name")}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              <div className="flex-1">
                <label
                  htmlFor="category"
                  className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={getInputClassName("category")}
                >
                  <option value="">Select Category</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                )}
              </div>
            </div>

            <div className="flex gap-6 mt-[24px] items-center">
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="$2,999"
                  className={getInputClassName("price")}
                />
                {errors.price && (
                  <p className="text-red-500 text-sm mt-1">{errors.price}</p>
                )}
              </div>

              <div className="flex-1 flex items-end mt-[24px]">
                <label className="flex items-center cursor-pointer gap-2">
                  <input
                    type="checkbox"
                    name="isNewEl"
                    checked={formData.isNewEl}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-[#D87D4A] border-gray-300 rounded "
                  />
                  <span className="ml-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase">
                    New Product
                  </span>
                </label>
              </div>
            </div>

            <div className="mt-[24px]">
              <label
                htmlFor="desc"
                className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
              >
                Description
              </label>
              <textarea
                id="desc"
                name="desc"
                value={formData.desc}
                onChange={handleInputChange}
                placeholder="Product description..."
                rows={4}
                className={getTextareaClassName("desc")}
              />
              {errors.desc && (
                <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
              )}
            </div>

            <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
              Features
            </p>

            <div className="mt-[24px]">
              <label
                htmlFor="featuresTxt1"
                className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
              >
                Features Text 1
              </label>
              <textarea
                id="featuresTxt1"
                name="featuresTxt1"
                value={formData.featuresTxt1}
                onChange={handleInputChange}
                placeholder="First paragraph of features..."
                rows={4}
                className={getTextareaClassName("featuresTxt1")}
              />
              {errors.featuresTxt1 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.featuresTxt1}
                </p>
              )}
            </div>

            <div className="mt-[24px]">
              <label
                htmlFor="featuresTxt2"
                className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
              >
                Features Text 2
              </label>
              <textarea
                id="featuresTxt2"
                name="featuresTxt2"
                value={formData.featuresTxt2}
                onChange={handleInputChange}
                placeholder="Second paragraph of features..."
                rows={4}
                className={getTextareaClassName("featuresTxt2")}
              />
              {errors.featuresTxt2 && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.featuresTxt2}
                </p>
              )}
            </div>

            <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
              Images
            </p>

            <div className="mt-[24px]">
              <label
                htmlFor="img"
                className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
              >
                Main Image URL
              </label>
              <input
                type="url"
                id="img"
                name="img"
                value={formData.img}
                onChange={handleInputChange}
                placeholder="https://example.com/image.jpg"
                className={getInputClassName("img")}
              />
              {errors.img && (
                <p className="text-red-500 text-sm mt-1">{errors.img}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[24px]">
              {formData.imgArray.map((img, index) => (
                <div key={index}>
                  <label
                    htmlFor={`imgArray${index}`}
                    className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                  >
                    Gallery Image {index + 1}
                  </label>
                  <input
                    type="url"
                    id={`imgArray${index}`}
                    value={img}
                    onChange={(e) =>
                      handleImageArrayChange(index, e.target.value)
                    }
                    placeholder="https://example.com/image.jpg"
                    className={getInputClassName(`imgArray${index}`)}
                  />
                  {errors[`imgArray${index}`] && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors[`imgArray${index}`]}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
              In The Box
            </p>

            <div className="mt-[24px]">
              <label
                htmlFor="inTheBox"
                className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
              >
                In The Box Information
              </label>
              <textarea
                id="inTheBox"
                name="inTheBox"
                value={formData.inTheBox}
                onChange={handleInputChange}
                placeholder="1x Headphone Unit&#10;2x Replacement Earcups&#10;1x User Manual&#10;3.5mm 5m Audio Cable"
                rows={4}
                className={getTextareaClassName("inTheBox")}
              />
              <p className="text-xs text-gray-500 mt-1">
                Enter each item on a new line. Format: "2x Item Name" or just
                "Item Name" (defaults to 1x)
              </p>
              {errors.inTheBox && (
                <p className="text-red-500 text-sm mt-1">{errors.inTheBox}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`transition-all duration-300 cursor-pointer mt-8 w-full h-[48px] flex items-center justify-center font-manrope font-bold text-[13px] leading-[100%] tracking-[1px] text-center uppercase text-white select-none ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#D87D4A] hover:bg-[#FBAF85]"
              }`}
            >
              {isSubmitting ? "CREATING PRODUCT..." : "CREATE PRODUCT"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
