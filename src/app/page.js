"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Link from "next/link";
import ProductComponent from "@/components/ProductComponent";
import { useEffect, useState } from "react";
import supabase from "@/utils/supabase";
import { client } from "@/lib/sanity";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sanityData, setSanityData] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  async function fetchSanityData() {
    const query = `
  *[_type == 'product'] | order(_createdAt desc) {
    productName, 
    productLogo, 
      "currentSlug": slug.current, productSlogan, productCategory,
      productCommission
  }`;
    const data = await client.fetch(query);

    if (data && data.length > 0) {
      console.log(data);
      setSanityData(data);
    }
  }

  async function fetchProductCategories() {
    const query = `
    *[_type == 'product'] {
      productCategory
    }

    `;
    const data = await client.fetch(query);

    if (data) {
      console.log(data);

      let allCategories = [];
      data.forEach((item) => {
        // Extract the productCategory array from each object
        const categories = item.productCategory;

        // Add each category to the allCategories array
        allCategories.push(...categories);
        const uniqueCategories = [...new Set(allCategories)];
        console.log(uniqueCategories);

        setProductCategories(uniqueCategories);
      });
    }
  }

  useEffect(() => {
    fetchProductCategories();
    fetchSanityData();
  }, []);

  // Filter products based on the search query and selected category
  const filteredProducts = sanityData.filter((product) => {
    const matchesSearchQuery =
      (product.productName &&
        product.productName
          .toLowerCase()
          .includes(searchQuery.toLowerCase())) ||
      (product.productSlogan &&
        product.productSlogan
          .toLowerCase()
          .includes(searchQuery.toLowerCase()));

    const matchesCategory =
      !selectedCategory ||
      (product.productCategory &&
        product.productCategory.includes(selectedCategory));

    return matchesSearchQuery && matchesCategory;
  });

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <main className="pb-10 h-screen">
      <Header />
      <div className="lg:pt-24 pt-12 space-y-7 lg:px-0 px-5 max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <span className="lg:text-5xl text-3xl font-bold max-w-3xl text-center">
            The best-selling SaaS affiliate programs that make you money
          </span>
        </div>
        <div className="max-w-2xl">
          <span className="text-center text-xl">
            Monetize your content through affiliate programs from top SaaS companies and generate a side income, fast.
          </span>
        </div>
        <div className="">
          <Link href="https://tally.so/r/npLgoE" target="_blank">
            <button className="px-5 py-2 bg-black text-white rounded-full hover:opacity-85 flex items-center space-x-2">
              <div className="rounded-full bg-green-400 h-2 w-2"></div>
              <span>Submit Product - It&apos;s free</span>
            </button>
          </Link>
        </div>
        <div className="max-w-6xl mx-auto py-7 pt-24 space-y-5">
          <div>
            <span className="text-2xl font-semibold">Browse products</span>
          </div>
          <div>
            <span className="font-semibold">Categories</span>
          </div>
          <div className="lg:flex flex-wrap gap-3 items-center hidden">
            <button
              className={`px-5 py-2 border rounded-full hover:bg-stone-200 outline-none ${
                selectedCategory === null && "bg-stone-200"
              }`}
              onClick={() => setSelectedCategory(null)}
            >
              All
            </button>
              {productCategories.length > 0 &&
              productCategories.map((category, index) => (
                <button
                key={index}
                  className={`px-5 py-2 border rounded-full hover:bg-stone-200 outline-none ${
                    selectedCategory === category && "bg-stone-200"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            
          </div>
          <div className="w-full px-5 py-3 rounded-full outline-none flex items-center justify-between bg-stone-100">
            <input
              className="w-full outline-none bg-stone-100"
              placeholder="Search for products to earn commission with..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <img src="/img/search.svg" className="h-5 w-5" />
          </div>

          <div className="lg:grid grid-cols-3 gap-5 lg:space-y-0 space-y-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <ProductComponent
                  key={product.id}
                  product={product}
                  index={index}
                />
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
