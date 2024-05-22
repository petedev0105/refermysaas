export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'createdAt',
      type: 'datetime',
      title: 'Created At',
    },
    {
      name: 'productName',
      type: 'string',
      title: 'Product Name',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug of the product',
      options: {
        source: 'productName',
      },
    },

    {
      name: 'productSlogan',
      type: 'string',
      title: 'Product Slogan',
    },
    {
      name: 'productDescription',
      type: 'text',
      title: 'Product Description',
    },
    {
      name: 'productCategory',
      type: 'array',
      title: 'Product Category',
      of: [{type: 'string'}],
    },
    {
      name: 'productFounderEmail',
      type: 'string',
      title: 'Product Founder Email',
    },
    {
      name: 'productCommission',
      type: 'string',
      title: 'Product Commission',
    },
    {
      name: 'productWebsiteLink',
      type: 'url',
      title: 'Product Website Link',
    },
    {
      name: 'productAffiliateProgramLink',
      type: 'url',
      title: 'Product Affiliate Program Link',
    },
    {
      name: 'productLogo',
      type: 'image',
      title: 'Product Logo',
    },
  ],
  preview: {
    select: {
      title: 'productName',
      subtitle: 'productSlogan',
      media: 'productPhotoUrl',
    },
  },
}
