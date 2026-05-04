"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import logoSvg from "../../public/img/logo.svg";
import { menuItems, noodles, Rice, prepare_dish, sideMenus, drinkMenus } from "@/constants/datas";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // 1. 이미지 미리 받아두기 (핵심)
    const allImages = [
      ...menuItems,
      ...noodles,
      ...Rice,
      ...prepare_dish,
      ...sideMenus,
      ...drinkMenus,
    ].map(item => item.imageUrl);

   allImages.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });

    // 2. 3초 후 이동
    const timer = setTimeout(() => {
      router.push("/main");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="randing_page_wrapper">
      <Image src={logoSvg} width={30} height={30} alt="qbit logo" />
      <div className="firtst_loading">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}