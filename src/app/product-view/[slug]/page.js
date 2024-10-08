"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Link from "next/link";
import ProductComponent from "@/components/ProductComponent";
import { client, urlFor } from "@/lib/sanity";

function ProductDetails({ params }) {
  const [product, setProduct] = useState(null);
  const [alternativeProducts, setAlternativeProducts] = useState([]);
  const slug = params.slug;

  async function fetchProduct() {
    try {
      const query = `
      *[_type == 'product' && slug.current == $slug][0] {
        productName,
        productLogo,
        "currentSlug": slug.current,
        productSlogan,
        productCategory,
        productCommission,
        productDescription,
        productWebsiteLink,
        productAffiliateProgramLink
      }`;
      const data = await client.fetch(query, { slug });

      if (data) {
        setProduct(data);
      }
    } catch (error) {
      console.error("Error fetching product:", error.message);
    }
  }

  async function fetchAlternativeProducts(category) {
    try {
      const query = `
      *[_type == 'product' && (
        $category in productCategory[] || 
        $category == productCategory
      ) && slug.current != $slug] {
        productName,
        productLogo,
        "currentSlug": slug.current,
        productSlogan,
        productCategory,
        productCommission
      } | order(_createdAt desc)[0...5]`;
      const data = await client.fetch(query, { category, slug });

      if (data) {
        setAlternativeProducts(data);
      }
    } catch (error) {
      console.error("Error fetching alternative products:", error.message);
    }
  }

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  useEffect(() => {
    if (product && product.productCategory) {
      const category = Array.isArray(product.productCategory) 
        ? product.productCategory[0] 
        : product.productCategory;
      fetchAlternativeProducts(category);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="space-y-3 text-center">
          <div>
            <span className="font-semibold text-xl text-sm">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <Header />
      <div className="pt-10 space-y-5 lg:px-0 px-5">
        <div className="lg:flex justify-between">
          <div className="flex space-x-5">
            <img
              src={product.productLogo ? urlFor(product.productLogo) : null}
              alt={product.productName}
              className="h-24 w-24 rounded-xl bg-stone-200 border object-cover"
            />
            <div>
              <div>
                <span className="font-semibold text-2xl">
                  {product.productName}
                </span>
              </div>
              <div>
                <span className="">{product.productSlogan}</span>
              </div>
            </div>
          </div>
          <div className="lg:flex lg:space-x-3 lg:space-y-0 space-y-3 items-center lg:pt-0 pt-5">
            <Link
              target="_blank"
              href={product.productWebsiteLink}
              className="rounded-full text-sm px-5 py-2 border flex space-x-1 items-center hover:bg-stone-50"
            >
              <span>{product.productWebsiteLink}</span>
              <img src="/img/to-dark.svg" alt="External link" />
            </Link>
            <Link
              target="_blank"
              href={product.productAffiliateProgramLink}
              className="bg-black text-white rounded-full text-sm px-5 py-2 flex space-x-1 items-center hover:opacity-85"
            >
              <span>Apply to affiliate program</span>
              <img src="/img/to-light.svg" alt="External link" />
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-3 pt-5">
          <button className="rounded-full px-5 py-2 flex space-x-1 items-center bg-green-100 text-green-600 font-medium">
            <span>{product.productCommission}% Commission</span>
          </button>
          <div>
            <span>
              {Array.isArray(product.productCategory) 
                ? product.productCategory.join(", ") 
                : product.productCategory || "No categories"}
            </span>
          </div>
        </div>
        <div className="pt-12 space-y-3">
          <div>
            <span className="font-semibold">Description</span>
          </div>
          <div className="rounded-xl bg-stone-50 p-5">
            <p className="">{product.productDescription}</p>
          </div>
        </div>
      </div>

      <div className="pt-12 space-y-3 lg:px-0 px-5">
        <div>
          <span className="font-semibold">
            Alternatives to{" "}
            <span className="underline">{product.productName}</span>
          </span>
        </div>
        <div className="lg:grid grid-cols-3 gap-5 lg:space-y-0 space-y-3">
          {alternativeProducts.length > 0 ? (
            alternativeProducts.map((altProduct) => (
              <ProductComponent key={altProduct.currentSlug} product={altProduct} />
            ))
          ) : (
            <div>No alternative products found</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;