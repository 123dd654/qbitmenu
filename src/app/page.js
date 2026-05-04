"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import logoSvg from "../../public/img/logo.svg";
import { menuItems, noodles, Rice, prepare_dish, sideMenus, drinkMenus } from "@/constants/datas";
import { preload } from 'react-dom';

export default function Home() {
  const router = useRouter();

 useEffect(() => {
  const allImages = [
    ...menuItems,
    ...noodles,
    ...Rice,
    ...prepare_dish,
    ...sideMenus,
    ...drinkMenus,
  ].map(item => item.imageUrl);

  allImages.forEach((src) => {
    preload(src, { as: 'image' });
  });

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