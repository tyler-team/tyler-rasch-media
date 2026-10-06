"use client";

import React from "react";
import Image from "next/image";
import { SanityContentBlock, urlFor } from "../lib/sanity";

const getYouTubeEmbedId = (url: string) => {
  if (!url) return null;
  const match = url.match(/^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/);
  return match && match[2].length === 11 ? match[2] : null;
};

export default function SanityBlockRenderer({ block }: { block: SanityContentBlock }) {
  if (!block) return null;

  // 1. Plain Text Paragraph
  if (typeof block === "string") {
    return <p className="leading-relaxed whitespace-pre-line break-keep text-zinc-300">{block}</p>;
  }

  // 2. Image Block
  if (block._type === "image" && block.asset) {
    try {
      const imageUrl = urlFor(block).width(1200).auto("format").fit("max").url();
      return (
        <figure className="my-8 space-y-3">
          <div className="relative w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/40">
            <Image
              src={imageUrl}
              alt={block.alt || block.caption || "Tyler Media Article Image"}
              width={1200}
              height={675}
              className="w-full h-auto object-cover rounded-2xl"
            />
          </div>
          {block.caption && (
            <figcaption className="text-center text-xs text-zinc-400 font-mono tracking-wide px-4">
              ▲ {block.caption}
            </figcaption>
          )}
        </figure>
      );
    } catch {
      return null;
    }
  }

  // 3. YouTube / Video Embed Block
  if (block._type === "videoEmbed" && block.url) {
    const videoId = getYouTubeEmbedId(block.url);
    return (
      <figure className="my-8 space-y-3">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title={block.caption || "YouTube Video"}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center p-6 text-center">
              <a
                href={block.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline text-sm hover:text-white transition-colors"
              >
                영상 바로가기: {block.url}
              </a>
            </div>
          )}
        </div>
        {block.caption && (
          <figcaption className="text-center text-xs text-zinc-400 font-mono tracking-wide px-4">
            ▶ {block.caption}
          </figcaption>
        )}
      </figure>
    );
  }

  return null;
}
