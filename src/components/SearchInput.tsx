"use client";
import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<
    { _id: string; title: string; slug: string; imageUrl: string }[]
  >([]);

  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      if (search.length > 0) {
        const query = groq`
          *[_type == "product" && title match $search + "*"]{
            _id,
            title,
            "slug": slug.current,
            "imageUrl": image.asset->url
          }
        `;
        const results = await client.fetch(query, { search });
        setFilteredProducts(results);
      } else {
        setFilteredProducts([]);
      }
    };
    fetchProducts();
  }, [search]);

  return (
    <div className="relative w-full flex flex-1 h-12 text-base items-center gap-2 md:w-[300px] lg:w-[400px]">
      {/* Search Icon */}
      <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg text-lightOrange" />

      {/* Input Field */}
      <input
        type="text"
        placeholder="Search products..."
        className="flex-1 h-full outline-none bg-transparent placeholder:text-lightText border border-accent/30 rounded-sm pl-10 pr-24 md:pr-28"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Close Icon */}
      {search && (
        <IoMdClose
          className="absolute right-20 md:right-24 top-1/2 transform -translate-y-1/2 text-lightRed cursor-pointer"
          onClick={() => setSearch("")}
        />
      )}

      {/* Search Button */}
      <button className="bg-lightOrange text-white px-3.5 py-1.5 text-sm hover:bg-darkOrange font-medium absolute right-2 md:right-3">
        Search
      </button>

      {/* Search Results Dropdown */}
      {search && (
        <div className="absolute top-14 left-0 w-full bg-white border border-accent/30 rounded-md shadow-lg z-10 max-h-60 overflow-auto">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product._id}
                className="p-2 flex items-center gap-3 cursor-pointer hover:bg-gray-100"
                onClick={() => router.push(`/product/${product.slug}`)}
              >
                {/* ✅ Next.js Image Component */}
                <div className="relative w-10 h-10">
                  <Image
                    src={product.imageUrl}
                    alt={product.title}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-sm"
                  />
                </div>
                <span className="text-gray-700 font-medium">{product.title}</span>
              </div>
            ))
          ) : (
            <div className="p-3 text-center text-gray-500">❌ Product Not Found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
