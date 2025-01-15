"use client";

import React, { Suspense } from "react";
import { Icon } from "@iconify/react/dist/iconify.js";
import searchIcon from "@iconify/icons-mdi/magnify";
import Image, { StaticImageData } from "next/image";
import regular from "../../../assets/regular.png";
import prime from "../../../assets/prime.png";
import premium from "../../../assets/premium.png";
import vip from "../../../assets/vip.png";
import CardDetailPage from "./[id]";
import { cards } from "@/utils/cards";
import { useRouter, useSearchParams } from "next/navigation";

// Define an interface for a single card object
interface FanCard {
  image: StaticImageData;
  rank: string;
  price: string;
  id: number;
}

// Typing for the FanCards component props
interface FanCardsProps {
  fanCards: FanCard[];
  onCardClick: (id: number) => void;
}

const FanCards: React.FC<FanCardsProps> = ({ fanCards, onCardClick }) => {
  return (
    <div className="grid md:grid-cols-2 md:justify-start xl:w-[80%] gap-[2rem] md:gap-y-[6rem] mt-[1rem]">
      {fanCards.map(({ image, rank, price, id }, index) => (
        <div key={index} className="flex items-center justify-between gap-7">
          <div>
            <Image
              src={image}
              className="w-[172.55px] lg:w-[282.55px] h-[270.91px] lg:h-[330px] object-contain"
              alt={`${rank} Fan-card`}
            />
          </div>
          <div className="flex-1">
            <h2 className="text-[24px] text-[#fff] font-bold leading-[36px]">
              {rank} <br />
              Fan-card <br />
              {price}
            </h2>
            <button
              className="text-[#fff] text-[16px] bg-gradient-to-l from-[#18FFFF] to-[#9B51E0] px-3 py-3 rounded-[20px] flex items-center justify-center gap-1 mt-4 w-full"
              onClick={() => onCardClick(id)}
            >
              <Icon icon="solar:card-bold" width="21" height="20" />
              Purchase
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

const PurchaseContent: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const card = cards.find((card) => card.id === parseInt(id as string, 10));

  const fanCards: FanCard[] = [
    { image: regular, rank: "Regular", price: "$199", id: 1 },
    { image: prime, rank: "Prime", price: "$499", id: 2 },
    { image: premium, rank: "Premium", price: "$999", id: 3 },
    { image: vip, rank: "VIP", price: "$1,999", id: 4 },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/purchase?id=${id}`);
  };

  return (
    <div>
      <section>
        <div className="p-4 xl:p-7">
          <header className="w-full flex justify-end">
            <div className="flex items-center w-full lg:w-[40%] p-4 gap-3">
              <label htmlFor="search" className="sr-only">Search</label>
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search"
                className="px-4 py-2 rounded-full bg-[#ffffff27] text-[16px] w-[70%]"
              />
              <div className="w-[40px] h-[40px] rounded-full bg-[#ffffff27]">
                <Icon icon={searchIcon} className="ml-[10px] mt-[10px] text-gray-500 text-[20px]" />
              </div>
            </div>
          </header>
          <header className="h-[410px] xl:h-[448px] bg-gradient-to-b from-cyan-400 via-cyan-400/10 via-cyan-400/2 to-cyan-400/0 p-[2rem] xl:px-[7rem] xl:py-[4rem] rounded-[20px]">
            <h1 className="text-[34px] md:text-[40px] xl:text-[62px] text-[#fff] font-bold leading-[41px] lg:leading-[70px] md:w-[73%]">
              Unlock Ultimate Artist Experience with Fan-Cards
            </h1>
            <p className="text-[15px] lg:text-[18px] text-[#EBEBF599] font-normal leading-[20px] mt-3 md:w-[60%] xl:w-[80%]">
              With our exclusive Fan-Cards, you gain unparalleled access to your
              favorite record label, ArtistSphere, and their incredible lineup
              of talent. From exclusive content to behind-the-scenes updates and more.
            </p>
          </header>
          <FanCards fanCards={fanCards} onCardClick={handleCardClick} />
        </div>
      </section>
      {id && card && (
        <CardDetailPage card={card} onClose={() => router.push("/purchase")} />
      )}
    </div>
  );
};

const Purchase: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PurchaseContent />
    </Suspense>
  );
};

export default Purchase;
