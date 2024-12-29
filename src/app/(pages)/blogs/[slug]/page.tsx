"use client";

import { FetchBlogBySlug, Blog } from "@/app/component/query";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSpinner } from "react-icons/fa";
import React from "react";
import { client } from "@/sanity/lib/client";
import DOMPurify from "dompurify"; // Import DOMPurify for sanitization

const Page = ({ params }: { params: Promise<{ slug: string }> }) => {
  const resovlparam = React.use(params);

  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [newName, setNewName] = useState("");
  const [comments, setComments] = useState<
    { authorName: string; commentText: string }[]
  >([]);

  useEffect(() => {
    if (resovlparam.slug) {
      fetchData(resovlparam.slug);
    }
  }, [resovlparam.slug]);

  const fetchData = async (slug: string) => {
    try {
      setLoading(true);
      const blogData = await FetchBlogBySlug(slug);
      if (blogData) {
        setData(blogData);
        setComments(blogData.comments || []);
      } else {
        setData(null);
      }
    } catch (error) {
      console.error("Error fetching blog data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Sanitize inputs
    const sanitizedComment = DOMPurify.sanitize(newComment.trim());
    const sanitizedName = DOMPurify.sanitize(newName.trim());

    // Prevent empty or invalid inputs
    if (sanitizedComment === "" || sanitizedName === "") return;

    const newCommentData = {
      authorName: sanitizedName,
      commentText: sanitizedComment,
    };

    // Update the comments locally
    const updatedComments = [...comments, newCommentData];
    setComments(updatedComments);
    setNewComment("");
    setNewName("");

    // Update the blog document in Sanity
    if (data) {
      await client
        .patch(data._id)
        .setIfMissing({ comments: [] })
        .append("comments", [newCommentData])
        .commit();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <div>
          <FaSpinner className="animate-spin text-4xl ml-8 text-blue-500" />
          <h1 className="text-2xl font-bold text-blue-400">Loading...</h1>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <h1 className="text-2xl font-bold text-red-400">Blog not found! Refresh</h1>
      </div>
    );
  }

  return (
    <section className="bg-gray-50">
      <div className="relative">
        <Link className="absolute top-10 md:left-20 left-5" href={"/"}>
          <button className="flex items-center text-[18px] font-semibold border-2 rounded-[6px] py-[10px] px-[12px] group hover:bg-slate-500 hover:text-[#ffff]">
            Back Home
            <span className="ml-2 transition-transform duration-300 group-hover:translate-x-2">
              ➔
            </span>
          </button>
        </Link>
      </div>

      <div className="max-w-screen-md mx-auto my-10 p-10 font-sans bg-white shadow-xl rounded-lg">
        <div className="rounded-md bg-slate-200 w-[97px] mt-28 lg:mt-0 h-[28px] mb-4">
          <button className="text-[14px] px-3 font-sans text-[#4B6BFB]">
            {data.category || "Uncategorized"}
          </button>
        </div>

        <div className="mb-6">
          <h2 className="text-[28px] text-muted-foreground font-semibold text-gray-800">{data.title}</h2>
        </div>

        <div className="flex items-center gap-2 h-[36px] mb-4">
          <Image
            src={data.author.profileImage ? urlFor(data.author.profileImage).url() : "/img1.png"}
            width={36}
            height={36}
            alt="Author"
            className="rounded-full"
          />
          <p className="text-[16px] text-[#4B6BFB] font-medium">{data.author.name}</p>
          <p className="text-[16px] text-[#97989F]">
            {data.publishedDate ? new Date(data.publishedDate).toLocaleDateString() : "Unknown Date"}
          </p>
        </div>

        <div className="mb-6">
          <Image
            src={data.image?.asset?._ref ? urlFor(data.image.asset._ref).url() : "/hero.png"}
            height={500}
            width={500}
            alt="Poster"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="mb-6">
          <p className="text-[16px] text-gray-700 leading-relaxed">
            {data.content || "Content is not available."}
          </p>
        </div>

        <div>
          <h2 className="my-10 text-3xl font-bold text-gray-800">Conclusion:</h2>
          <p className="text-[16px] text-gray-700 leading-relaxed">
            {data.conclusion || "Conclusion not available."}
          </p>
        </div>

        <div>
          <h1 className="my-10 text-3xl font-bold text-gray-800">Comments:</h1>
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <div key={index} className="mb-4 text-gray-700 flex items-center gap-2 ">
                <Image
                  src={data.author.profileImage ? urlFor(data.author.profileImage).url() : "/img1.png"}
                  width={36}
                  height={36}
                  alt="Author"
                  className="rounded-full"
                />
                <strong>{DOMPurify.sanitize(comment.authorName)}:</strong>
                <p>{DOMPurify.sanitize(comment.commentText)}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No comments yet. Be the first to comment!</p>
          )}

          <form onSubmit={handleCommentSubmit} className="mt-6">
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-2"
              placeholder="Your Name"
            />
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={4}
              className="w-full p-2 border rounded-lg"
              placeholder="Write your comment..."
            />
            <button
              type="submit"
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Page;
