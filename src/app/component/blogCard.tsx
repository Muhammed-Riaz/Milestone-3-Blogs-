"use client";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";

 interface data {
  title: string;
  slug: { current: string };
  author: { name: string; profileImage?: string };
  publishedDate: string;
  category: string;
  image?: { asset: { _ref: string } };
}

interface dataprop {
  data: data;
}

function Blogcard({ data }: dataprop) {
  return (
    <section className="font-sans">
      <Link href={`/blogs/${data.slug.current}`}>
        <div className="group max-w-[392px] shadow-lg px-4 py-4 rounded-xl border m-4 transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl">
          {/* Blog Image */}
          <div className="relative max-w-[360px] h-[240px] rounded-[6px] overflow-hidden">
            <Image
              src={
                data.image?.asset._ref
                  ? urlFor(data.image.asset._ref).url()
                  : "/img1.png"
              }
              width={360}
              height={240}
              alt={data.title || "Fallback Image"}
              className="object-cover w-full h-full rounded-[6px] transition-transform duration-300 transform group-hover:scale-105 "
            />
          </div>

          {/* Blog Text */}
          <div className="max-w-[400px] lg:h-[205px] h-[300x] my-5 px-2 py-3 pb-5 space-y-2 border rounded-[6px] transition-colors duration-300 group-hover:bg-blue-50 text-muted-foreground">
            {/* Category */}
            <div className="rounded-[6px] bg-slate-200 w-[97px] h-[28px]">
              <button className="text-[14px] px-3 font-sans text-[#4B6BFB]">
                {data.category || "Uncategorized"}
              </button>
            </div>

            {/* Title */}
            <h2 className="text-[24px] font-semibold transition-colors duration-300 group-hover:text-blue-500">
              {data.title}
            </h2>

            {/* Author and Date */}
            <div className="px-2 mt-3 h-[36px] flex justify-between items-center gap-5">
              {/* Author */}
              <div className="flex items-center gap-2 h-[36px] rounded-[28px]">
                <Image
                  src={
                    data.author?.profileImage
                      ? urlFor(data.author.profileImage).url()
                      : "/img1.png"
                  }
                  width={36}
                  height={36}
                  alt={"image"}
                  className="rounded-full"
                />
                <p className="text-[16px] text-[#97989F]">
                  {data.author?.name || "Anonymous"}
                </p>
              </div>

              {/* Date */}
              <p className="text-[16px] text-[#97989F]">
                {data.publishedDate
                  ? new Date(data.publishedDate).toLocaleDateString()
                  : "Unknown Date"}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}

export default Blogcard;
