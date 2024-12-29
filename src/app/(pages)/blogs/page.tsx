"use client";

import Blogscard from '@/app/component/blogCard';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FetchBlogs ,Blog1 } from '@/app/component/query1';

function Blogs() {
  const [getData, setgetData] = useState<Blog1[]>([]); // Use Blog[] as type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getApi() {
      try {
        const res: Blog1[] = await FetchBlogs();
        console.log(res);
        

        if (!res) {
          console.log("invalid data");
          
        }

        setgetData(res); // Set data to state
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false); // Ensure loading is stopped even on error
      }
    }

    getApi();
  }, []);
  console.log(getData);
  

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

  return (
    <section className="font-sans">
      <div className="min-h-screen py-10">
        {/* Top Text Heading */}
        <div className="relative mb-12 text-center">
          <h1 className="mb-4 lg:text-4xl text-3xl px-1 font-bold text-muted-foreground ">
            Latest Articles: Technology in the Workplace
          </h1>
          <p className="text-muted-foreground text-xl">
            Blogs exploring the impact of technology
          </p>
        </div>

        {/* Blogs */}
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10  lg:mx-10">
          {getData.map((blog) => (
            <Blogscard key={blog.slug.current} data={blog} /> // Pass each blog
          ))}
        </div>
      </div>
    </section>
  );
}

export default Blogs;
