import { createClient } from "@sanity/client";
import { NextResponse } from 'next/server';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 405 });
  }

  try {
    const formData = await req.formData();

    const productName = formData.get('productName');
    const productSlogan = formData.get('slogan');
    const productDescription = formData.get('description');
    const productCategories = JSON.parse(formData.get('categories')); // Parse the JSON string
    const productFounderEmail = formData.get('contactEmail');
    const productCommission = formData.get('commissionAmount');
    const productWebsiteLink = formData.get('websiteLink');
    const productAffiliateProgramLink = formData.get('affiliateProgramLink');
    const logoFile = formData.get('logo');

    let logoAsset;
    if (logoFile) {
      const logoBuffer = await logoFile.arrayBuffer();
      logoAsset = await client.assets.upload('image', Buffer.from(logoBuffer), {
        filename: logoFile.name
      });
    }

    const result = await client.create({
      _type: "product",
      productName,
      slug: {
        _type: "slug",
        current: productName.toLowerCase().replace(/\s+/g, '-'),
      },
      productSlogan,
      productDescription,
      productCategory: productCategories, // Use the parsed array directly
      productFounderEmail,
      productCommission: parseInt(productCommission),
      productWebsiteLink,
      productAffiliateProgramLink,
      productLogo: logoAsset ? {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: logoAsset._id
        },
      } : undefined,
    });

    return NextResponse.json({ message: "Product created successfully", result }, { status: 200 });
  } catch (error) {
    console.error("Error creating product:", error);
    return NextResponse.json({ error: "Error creating product" }, { status: 500 });
  }
}