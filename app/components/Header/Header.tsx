"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Cart from "../cart/Cart";
import { useCart } from "../CartProvider/CartProvider";
import Cookies from "js-cookie";
import Image from "next/image";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  role?: string;
  city?: string;
  country?: string;
}

export default function Header() {
  const router = useRouter();
  const [cartShow, setCartShow] = useState(false);
  const { cartArray } = useCart();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isAdmin: false,
  });

  useEffect(() => {
    setMounted(true);
    const token = Cookies.get("token");
    if (!token) return;

    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/current-user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Unauthorized");
        const user: User = await res.json();
        setAuthState({
          isLoggedIn: true,
          isAdmin: user.role === "admin",
        });
      })
      .catch(() => {
        Cookies.remove("token");
        setAuthState({ isLoggedIn: false, isAdmin: false });
      });
  }, []);

  const handleLogout = () => {
    Cookies.remove("token");
    localStorage.removeItem("isLoggedIn");
    setAuthState({ isLoggedIn: false, isAdmin: false });
    router.push("/");
  };

  const Logo = () => (
    <Image
      width={10}
      height={10}
      src="/images/logo.svg"
      alt="logo"
      className="w-[143px] h-[25px] cursor-pointer"
      onClick={() => {
        if (pathname === "/") {
          window.location.reload();
        } else {
          router.push("/");
        }
      }}
    />
  );

  const CartIconImg = () => (
    <Image
      width={10}
      height={10}
      src="/images/cart-icon.svg"
      alt="cart icon"
      className="w-[24px] h-[20px] cursor-pointer"
      onClick={() => setCartShow(!cartShow)}
    />
  );

  if (!mounted) {
    return (
      <div className="w-full bg-[#0E0E0E] h-[98px] p-1 pb-[24px]">
        <div className="w-full max-w-[1110px] mx-auto mt-[24px] flex justify-between">
          <Logo />

          <div className="flex gap-8">
            <p className="font-bold text-[13px] text-white leading-[25px] tracking-[2px] uppercase">
              Home
            </p>
            <p className="font-bold text-[13px] leading-[25px] text-white tracking-[2px] uppercase">
              HEADPHONES
            </p>
            <p className="font-bold text-[13px] leading-[25px] tracking-[2px] uppercase text-white">
              SPEAKERS
            </p>
            <p className="font-bold text-[13px] leading-[25px] tracking-[2px] uppercase text-white">
              EARPHONES
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button className="font-bold text-[13px] text-white leading-[25px] tracking-[2px] uppercase border border-white px-4 py-2 rounded opacity-0">
              SIGN IN
            </button>

            <div className="relative">
              <CartIconImg />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0E0E0E] h-[98px] p-1 pb-[24px]">
      <div className="w-full max-w-[1110px] mx-auto mt-[24px] flex justify-between">
        <Logo />

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
          {authState.isAdmin && (
            <p
              onClick={() => router.push("/adminpanel")}
              className="font-bold text-[13px] leading-[25px] tracking-[2px] text-white uppercase  cursor-pointer hover:text-[#D87D4A] transition-colors duration-300 ease-in-out"
            >
              ADMIN PANEL
            </p>
          )}
        </div>

        <div className="flex items-center gap-4">
          {authState.isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="font-bold text-[13px] text-white cursor-pointer leading-[25px] tracking-[2px] uppercase hover:text-[#D87D4A] transition-colors duration-300 ease-in-out border border-white px-4 py-2 rounded hover:border-[#D87D4A]"
            >
              LOGOUT
            </button>
          ) : (
            <button
              onClick={() => router.push("/sign-in")}
              className="font-bold text-[13px] text-white cursor-pointer leading-[25px] tracking-[2px] uppercase hover:text-[#D87D4A] transition-colors duration-300 ease-in-out border border-white px-4 py-2 rounded hover:border-[#D87D4A]"
            >
              SIGN IN
            </button>
          )}

          <div className="relative">
            <CartIconImg />
            {cartArray.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#D87D4A] text-white text-[12px] font-bold w-[16px] h-[16px] rounded-full flex items-center justify-center">
                {cartArray.length}
              </div>
            )}
            {cartShow && (
              <div
                className="absolute top-[88px] right-0 z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <Cart cartShow={cartShow} setCartShow={setCartShow} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}