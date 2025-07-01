"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useCart } from "../CartProvider/CartProvider";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  zip: string;
  city: string;
  country: string;
  enumber: string;
  epin: string;
}

interface FormErrors {
  [key: string]: string;
}

function CheckOutClient() {
  const router = useRouter();
  const { cartArray, setCartArray } = useCart();

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    address: "",
    zip: "",
    city: "",
    country: "",
    enumber: "",
    epin: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.body.classList.add("bg-gray-100");

    return () => {
      document.body.classList.remove("bg-gray-100");
    };
  }, []);

  const [selected, setSelected] = useState(0);
  const totalPrice = cartArray.reduce(
    (acc, item) => acc + item.priceInt * item.quantity,
    0
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.zip.trim()) {
      newErrors.zip = "ZIP code is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.country.trim()) {
      newErrors.country = "Country is required";
    }

    if (selected === 0) {
      newErrors.payment = "Please select a payment method";
    }

    if (selected === 1) {
      if (!formData.enumber.trim()) {
        newErrors.enumber = "e-Money number is required";
      }

      if (!formData.epin.trim()) {
        newErrors.epin = "e-Money PIN is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartArray.length === 0) {
      alert("Your cart is empty. Please add items before proceeding.");
      return;
    }

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
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setCartArray([]);

      router.push("/");
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error processing your order. Please try again.");
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

  return (
    <>
      <div className="w-full max-w-[1110px] mx-auto">
        <p
          onClick={() => router.back()}
          className="text-black opacity-50 hover:text-[#D87D4A] transition-all duration-200 hover:opacity-100 font-normal text-[15px] leading-[25px] tracking-[0px] mt-[64px] hover:underline cursor-pointer"
        >
          Go Back
        </p>
        <div className="flex w-full justify-between gap-8 items-start">
          <div className="w-full max-w-[730px] bg-white rounded-lg px-8 py-12 mt-6">
            <p className="font-manrope font-bold text-[32px] leading-[36px] tracking-[1.14px] uppercase">
              CHECKOUT
            </p>
            <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
              Billing Details
            </p>
            <form className="max-w-[650px]" onSubmit={handleSubmit}>
              <div className="flex gap-6 mt-[24px]">
                <div className="flex-1 max-w-[309px]">
                  <label
                    htmlFor="name"
                    className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Alexei Ward"
                    className={getInputClassName("name")}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="flex-1 max-w-[309px]">
                  <label
                    htmlFor="email"
                    className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="alexei@mail.com"
                    className={getInputClassName("email")}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
              <div className="max-w-[309px]">
                <label
                  htmlFor="phone"
                  className="block mb-2 mt-[24px] font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 202-555-0136"
                  className={getInputClassName("phone")}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <p className="text-[#D87D4A] font-manrope font-bold text-[13px] leading-[25px] tracking-[0.93px] uppercase mt-[48px]">
                shipping info
              </p>
              <div className="w-full">
                <label
                  htmlFor="address"
                  className="block mb-2 mt-[24px] font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="1137 Williams Avenue"
                  className={getInputClassName("address")}
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>
              <div className="flex gap-6 mt-[24px]">
                <div className="flex-1 max-w-[309px]">
                  <label
                    htmlFor="zip"
                    className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    id="zip"
                    name="zip"
                    value={formData.zip}
                    onChange={handleInputChange}
                    placeholder="10001"
                    className={`${getInputClassName(
                      "zip"
                    )} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none`}
                  />
                  {errors.zip && (
                    <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
                  )}
                </div>

                <div className="flex-1 max-w-[309px]">
                  <label
                    htmlFor="city"
                    className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder="New York"
                    className={getInputClassName("city")}
                  />
                  {errors.city && (
                    <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                  )}
                </div>
              </div>
              <div className="max-w-[309px]">
                <label
                  htmlFor="country"
                  className="block mb-2 mt-[24px] font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="United States"
                  className={getInputClassName("country")}
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
              <p className="text-[#D87D4A] font-manrope font-bold text-[13px] mt-[48px] leading-[25px] tracking-[0.93px] uppercase ">
                payment details
              </p>
              <div className="flex justify-between mt-[24px]">
                <p className="font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px]">
                  Payment Method
                </p>
                <div>
                  <div
                    onClick={() => setSelected(1)}
                    className={`w-[309px] h-[56px] bg-white border rounded-xl flex items-center px-4 cursor-pointer  ${
                      selected === 1
                        ? "border-[#D87D4A] ring-2 ring-[#D87D4A]"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selected === 1 && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D87D4A]" />
                      )}
                    </div>
                    <p className="ml-4 font-manrope font-bold text-[14px]">
                      e-Money
                    </p>
                  </div>

                  <div
                    onClick={() => setSelected(2)}
                    className={`w-[309px] h-[56px] mt-[24px] bg-white border rounded-xl flex items-center px-4 cursor-pointer ${
                      selected === 2
                        ? "border-[#D87D4A] ring-2 ring-[#D87D4A]"
                        : "border-gray-300"
                    }`}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center">
                      {selected === 2 && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#D87D4A]" />
                      )}
                    </div>
                    <p className="ml-4 font-manrope font-bold text-[14px]">
                      Cash on Delivery
                    </p>
                  </div>
                  {errors.payment && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.payment}
                    </p>
                  )}
                </div>
              </div>
              {selected === 1 && (
                <div className="flex gap-6 mt-[32px]">
                  <div className="flex-1 max-w-[309px]">
                    <label
                      htmlFor="enumber"
                      className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                    >
                      e-Money Number
                    </label>
                    <input
                      type="text"
                      id="enumber"
                      name="enumber"
                      value={formData.enumber}
                      onChange={handleInputChange}
                      placeholder="238521993"
                      className={`${getInputClassName(
                        "enumber"
                      )} [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none appearance-none`}
                    />
                    {errors.enumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.enumber}
                      </p>
                    )}
                  </div>

                  <div className="flex-1 max-w-[309px]">
                    <label
                      htmlFor="epin"
                      className="block mb-2 font-manrope font-bold text-[12px] leading-[100%] tracking-[-0.21px] uppercase"
                    >
                      e-Money PIN
                    </label>
                    <input
                      type="text"
                      id="epin"
                      name="epin"
                      value={formData.epin}
                      onChange={handleInputChange}
                      placeholder="6891"
                      className={getInputClassName("epin")}
                    />
                    {errors.epin && (
                      <p className="text-red-500 text-sm mt-1">{errors.epin}</p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>
          <div className="w-[350px] bg-white flex flex-col p-[36px] rounded-xl mt-[24px] self-start">
            {cartArray.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-4">
                  <p className="font-manrope font-bold text-[18px] leading-[100%] tracking-[1.29px] uppercase">
                    Summary
                  </p>
                </div>

                <div className="space-y-4">
                  {cartArray.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div className="flex gap-4 justify-between w-full">
                        <div className="flex gap-4">
                          <Image
                            src={item.img}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="rounded-lg"
                          />
                          <div>
                            <p className="font-manrope font-bold text-[15px] leading-[25px] tracking-[0px]">
                              {item.name}
                            </p>
                            <p className="font-manrope font-bold text-[14px] leading-[25px] tracking-[0px] opacity-50 text-black">
                              {item.price}
                            </p>
                          </div>
                        </div>
                        <p className="font-manrope font-bold text-[14px] leading-[25px] tracking-[0px] opacity-50 text-black">
                          x{item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mt-6">
                  <div className="flex items-center justify-between">
                    <p className="text-black opacity-50 font-manrope font-normal text-[15px] leading-[25px] tracking-[0px]">
                      TOTAL
                    </p>
                    <p className="font-bold text-[15px] leading-[25px] tracking-[0px]">
                      ${totalPrice.toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black opacity-50 font-manrope font-normal text-[15px] leading-[25px] tracking-[0px]">
                      SHIPPING
                    </p>
                    <p className="font-bold text-[15px] leading-[25px] tracking-[0px]">
                      $50
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black opacity-50 font-manrope font-normal text-[15px] leading-[25px] tracking-[0px]">
                      VAT (INCLUDED)
                    </p>
                    <p className="font-bold text-[15px] leading-[25px] tracking-[0px]">
                      $1,079
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-black opacity-50 font-manrope font-normal text-[15px] leading-[25px] tracking-[0px]">
                      Grand Total
                    </p>
                    <p className="font-bold text-[15px] text-[#D87D4A] leading-[25px] tracking-[0px]">
                      ${(totalPrice + 50 + 1079).toLocaleString()}
                    </p>
                  </div>
                </div>

                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`transition-all duration-300 cursor-pointer mt-6 w-full h-[48px] flex items-center justify-center font-manrope font-bold text-[13px] leading-[100%] tracking-[1px] text-center uppercase text-white select-none ${
                    isSubmitting
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#D87D4A] hover:bg-[#FBAF85]"
                  }`}
                >
                  {isSubmitting ? "PROCESSING..." : "CONTINUE & PAY"}
                </button>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center py-8">
                <p className="font-manrope font-normal text-[15px] opacity-50 text-center">
                  Your cart is empty.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckOutClient;
