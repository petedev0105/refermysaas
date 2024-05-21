"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import supabase from "@/utils/supabase";
import Link from "next/link";

function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const id = params.id;

  async function fetchProduct() {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      console.log(data);

      setProduct(data);
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  }

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <Header />
      <div className="pt-10 space-y-5 lg:px-0 px-5">
        <div className="lg:flex justify-between">
          <div className="flex space-x-5">
            <img
              src={product.product_photo_url}
              alt={product.product_name}
              className="h-24 w-24 rounded-md bg-stone-200"
            />
            <div>
              <div>
                <span className="font-semibold text-2xl">
                  {product.product_name}
                </span>
              </div>
              <div>
                <span className="">{product.product_slogan}</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 items-center lg:pt-0 pt-5">
            <Link
              target="_blank"
              href={product.product_website_link}
              className="rounded-full text-sm px-5 py-2 border flex space-x-1 items-center hover:bg-stone-50"
            >
              <span>{product.product_website_link}</span>
              <img src="/img/to-dark.svg" />
            </Link>
            <Link
              target="_blank"
              href={product.product_affiliate_program_link}
              className="bg-black text-white rounded-full text-sm px-5 py-2 flex space-x-1 items-center hover:opacity-85"
            >
              <span>Apply to affiliate program</span>
              <img src="/img/to-light.svg" />
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="rounded-full text-sm px-5 py-2 border flex space-x-1 items-center hover:bg-stone-50">
            <span>{product.product_commission}</span>
          </button>
          <div>
            <span>{product.product_category.join(", ")}</span>
          </div>
        </div>
        <div className="pt-12 space-y-3">
          <div>
            <span className="font-semibold">Description</span>
          </div>
          <div className="rounded-xl bg-stone-50 p-5">
            <p className="">{product.product_description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
