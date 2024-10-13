"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Image from "next/image";
import qr_image from "@/public/image.png"
import img2 from "@/public/img2.png"
import img3 from "@/public/img3.png"
import img4 from "@/public/img4.png"
import { Github, Twitter, Youtube } from "lucide-react";
import { useState, useEffect } from "react";

export default function Home() {

  const [input, setInput] = useState("");
  const [limit, setLimit] = useState(5);

  const [repos, setRepos] = useState<any[]>([]);
  const [fRepos, setFRepos] = useState<any[]>([]);

  async function getRepos() {
    const res = await fetch("https://api.github.com/users/aapelix/repos?per_page=60&sort=created");
    const data = await res.json();

    setRepos(data);
  }

  useEffect(() => {
    getRepos();
  }, []);

  useEffect(() => {
    const filtered = repos.filter((item) =>
      item.name.toLowerCase().startsWith(input.toLowerCase()),
    );

    setFRepos(filtered);
  }, [input, repos]);

  const carouselItems = [
    {
      image: qr_image,
      alt: "Showcase image of my QR code generator",
      title: "aapelix/qr - qr code generator",
      github: "https://github.com/aapelix/qr",
      releases: "https://github.com/aapelix/qr/releases",
    },
    {
      image: img4,
      alt: "Showcase image of my weather app",
      title: "weather.aapelix.dev - weather app",
      github: "https://github.com/aapelix/weather.aapelix.dev",
      site: "https://weather.aapelix.dev",
    },
    {
      image: img3,
      alt: "Showcase image of blocksmined mod",
      title: "blocksmined - minecraft mod to track total blocks mined",
      github: "https://github.com/aapelix/blocksmined",
      modrinth: "https://modrinth.com/mod/blocksmined",
    },
    {
      image: img2,
      alt: "Showcase image of aocs",
      title: "aocs - docs generator made with rust",
      github: "https://github.com/aapelix/aocs",
    },
  ];

  const [randomItem, setRandomItem] = useState<any>(null);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * carouselItems.length);
    setRandomItem(carouselItems[randomIndex]);
  }, []);

  return (
    <div className="grid bg-black grid-rows-[20px_1fr_20px] items-center justify-items-center p-4 sm:p-8 lg:p-20 gap-8 sm:gap-16 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="mt-[40rem] lg:mt-16 md:mt-96 sm:mt-96">
      {randomItem && (
          <Carousel className="mt-[20rem] sm:mt-[40rem] lg:mt-[95rem] lg:block">
            <CarouselContent>
              <CarouselItem className="flex flex-col justify-center items-center">
                <Image src={randomItem.image} alt={randomItem.alt} className="rounded-3xl w-full sm:w-2/3 lg:w-1/2" />
                <div className="mt-2 flex gap-2">
                  <p className="text-zinc-300">{randomItem.title}</p>
                  <p className="text-zinc-300">|</p>
                  {randomItem.github && <a href={randomItem.github} className="text-zinc-300 hover:underline">Github</a>}
                  {randomItem.releases && <a href={randomItem.releases} className="text-zinc-300 hover:underline">Releases</a>}
                  {randomItem.site && <a href={randomItem.site} className="text-zinc-300 hover:underline">Site</a>}
                  {randomItem.modrinth && <a href={randomItem.modrinth} className="text-zinc-300 hover:underline">Modrinth</a>}
                </div>
              </CarouselItem>
            </CarouselContent>
          </Carousel>
        )}
        <div className="translate-y-24 sm:translate-y-44 pb-16">
          <h1 className="text-white font-extrabold text-4xl sm:text-6xl lg:text-9xl">It&apos;s me, aapelix</h1>
          <h1 className="text-white font-extrabold text-4xl sm:text-6xl lg:text-9xl rotate-180">It&apos;s me, aapelix</h1>
          
          <div id="socials" className="w-full flex justify-center items-center mt-5 text-white gap-3 flex-wrap">
            <a href="https://url.aapelix.dev/4rCO" className="bg-[#1a1a1a] rounded-3xl">
              <button className="w-full sm:w-auto px-6 py-3 sm:py-6 flex gap-2 hover:px-16 sm:hover:px-28 duration-300">
                <Github color="white" />
                <p className="font-bold">Github</p>
              </button>
            </a>
            <a href="https://url.aapelix.dev/eYMe" className="bg-[#1a1a1a] rounded-3xl">
              <button className="w-full sm:w-auto px-6 py-3 sm:py-6 flex gap-2 hover:px-16 sm:hover:px-28 duration-300">
                <Youtube color="white" />
                <p className="font-bold">Youtube</p>
              </button>
            </a>
            <a href="https://url.aapelix.dev/3rdE" className="bg-[#1a1a1a] rounded-3xl">
              <button className="w-full sm:w-auto px-6 py-3 sm:py-6 flex gap-2 hover:px-16 sm:hover:px-28 duration-300">
                <Twitter color="white" />
                <p className="font-bold">Twitter</p>
              </button>
            </a>
          </div>
          
          <div className="mt-10">
            <input
              type="search"
              autoComplete="false"
              className="focus:w-full w-56 duration-300 py-2 rounded-full px-5 bg-blue-500 placeholder:text-zinc-300"
              placeholder="Search my projects"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <ul className="bg-white text-black rounded-3xl px-5 py-2 mt-2 max-h-[300px] overflow-y-auto">
              {fRepos.slice(0, limit).map((project, index) => (
                <li
                  className="my-0.5 flex justify-between items-center"
                  key={index}
                >
                  <div>
                    <div className="flex flex-row gap-x-2">
                      <h1 className="font-bold">{project.name}</h1>
                      <p>{project.archived ? "(archived)" : ""}</p>
                      <p>{project.fork ? "(fork)" : ""}</p>
                    </div>
                    {!project.description && (
                      <p className="-translate-y-1">{project.full_name}</p>
                    )}
                    <p className="-translate-y-1">{project.description}</p>
                  </div>
                  <div className="flex gap-x-2">
                    <p>{project.language ? project.language : "N/A"}</p>
                    <a
                      href={project.html_url}
                      className="hover:scale-110 duration-300"
                    >
                      <Github />
                    </a>
                  </div>
                </li>
              ))}
              <button
                className="bg-blue-500 py-1 px-2 rounded-full text-white hover:scale-105 duration-300 disabled:cursor-not-allowed"
                disabled={limit >= fRepos.length}
                onClick={() => setLimit(limit + 3)}
              >
                Show more
              </button>
              <button
                className="bg-blue-500 ml-2 py-1 px-2 rounded-full text-white hover:scale-105 duration-300 disabled:cursor-not-allowed"
                disabled={ limit == 5}
                onClick={() => setLimit(5)}
              >
                Show less
              </button>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
