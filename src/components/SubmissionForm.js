import React, { useState, useCallback } from "react";
import axios from "axios";
import Confetti from 'react-confetti';
import { Checkbox } from "@/components/ui/checkbox";

const CategorySelect = ({ categories, selectedCategories, onChange }) => {
  return (
    <div className="space-y-2">
      {categories.map((category) => (
        <div key={category} className="flex items-center">
          <Checkbox
            id={category}
            checked={selectedCategories.includes(category)}
            onCheckedChange={(checked) => {
              if (checked && selectedCategories.length < 3) {
                onChange([...selectedCategories, category]);
              } else if (!checked) {
                onChange(selectedCategories.filter(c => c !== category));
              }
            }}
            disabled={!selectedCategories.includes(category) && selectedCategories.length >= 3}
          />
          <label htmlFor={category} className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            {category}
          </label>
        </div>
      ))}
    </div>
  );
};

const SubmissionForm = () => {
  const [formData, setFormData] = useState({
    productName: "",
    websiteLink: "",
    affiliateProgramLink: "",
    commissionAmount: "",
    contactEmail: "",
    slogan: "",
    description: "",
    logo: null,
    categories: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const categories = [
    "Design", "Architecture", "AI", "Moderation", "Automation", "Social Media",
    "Analytics", "No Code", "Website Builder", "Boilerplate", "IOS", "Agent",
    "Customer Service", "Forms", "SaaS", "Edtech", "Productivity", "Fun",
    "Image", "Music", "Agency", "Recording", "Media", "Chatbot", "Art",
    "Writing", "SEO", "Notion", "Advertisement", "Marketing", "Copywriting",
    "Blogging", "Templates", "Content"
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleCategoryChange = (selectedCategories) => {
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (formData.categories.length !== 3) {
        alert("Please select exactly 3 categories.");
        return;
      }
      setIsLoading(true);
      setSubmissionStatus(null);

      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "logo" && formData[key]) {
          formDataToSend.append("logo", formData[key]);
        } else if (key === "categories") {
          formDataToSend.append("categories", JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      try {
        const response = await axios.post(
          "/api/update-product-sanity",
          formDataToSend,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Product submitted successfully:", response.data);
        setShowConfetti(true);
        setSubmissionStatus("success");
        setTimeout(() => setShowConfetti(false), 5000);

        // Scroll to top after successful submission
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // Reset form
        setFormData({
          productName: "",
          websiteLink: "",
          affiliateProgramLink: "",
          commissionAmount: "",
          contactEmail: "",
          slogan: "",
          description: "",
          logo: null,
          categories: [],
        });
      } catch (error) {
        console.error("Error submitting product:", error);
        setSubmissionStatus("error");
      } finally {
        setIsLoading(false);
      }
    },
    [formData]
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-xl relative">
      {showConfetti && <Confetti />}
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Grow your affiliate army with ReferMySaaS
      </h2>
      {submissionStatus === "success" && (
        <div className="mb-4 p-4 bg-green-100 text-green-700 rounded-md">
          Your product has been submitted successfully! It will be reviewed and approved soon.
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
          There was an error submitting your product. Please try again.
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="productName"
            className="block text-sm font-medium text-gray-700"
          >
            Product Name *
          </label>
          <input
            type="text"
            id="productName"
            name="productName"
            value={formData.productName}
            onChange={handleInputChange}
            placeholder="Your product name..."
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="websiteLink"
            className="block text-sm font-medium text-gray-700"
          >
            Website link *
          </label>
          <input
            type="url"
            id="websiteLink"
            name="websiteLink"
            value={formData.websiteLink}
            onChange={handleInputChange}
            placeholder="Link to your product"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="affiliateProgramLink"
            className="block text-sm font-medium text-gray-700"
          >
            Affiliate Program Link *
          </label>
          <input
            type="url"
            id="affiliateProgramLink"
            name="affiliateProgramLink"
            value={formData.affiliateProgramLink}
            onChange={handleInputChange}
            placeholder="Link to your affiliate program..."
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="commissionAmount"
            className="block text-sm font-medium text-gray-700"
          >
            Commission Amount (%) *
          </label>
          <input
            type="number"
            id="commissionAmount"
            name="commissionAmount"
            value={formData.commissionAmount}
            onChange={handleInputChange}
            placeholder="The commission %..."
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="contactEmail"
            className="block text-sm font-medium text-gray-700"
          >
            Contact Email *
          </label>
          <input
            type="email"
            id="contactEmail"
            name="contactEmail"
            value={formData.contactEmail}
            onChange={handleInputChange}
            placeholder="Your email..."
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="slogan"
            className="block text-sm font-medium text-gray-700"
          >
            Slogan/catch phrase for your product *
          </label>
          <input
            type="text"
            id="slogan"
            name="slogan"
            value={formData.slogan}
            onChange={handleInputChange}
            placeholder="Max 150 characters..."
            maxLength={150}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description of your product *
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Max 1000 characters..."
            maxLength={1000}
            required
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Product Categories (Select exactly 3) *
          </label>
          <CategorySelect
            categories={categories}
            selectedCategories={formData.categories}
            onChange={handleCategoryChange}
          />
          {formData.categories.length !== 3 && (
            <p className="text-sm text-red-500 mt-1">
              Please select exactly 3 categories.
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="logo"
            className="block text-sm font-medium text-gray-700"
          >
            Product Logo *
          </label>
          <input
            type="file"
            id="logo"
            name="logo"
            onChange={handleFileChange}
            accept="image/*"
            required
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-indigo-50 file:text-indigo-700
              hover:file:bg-indigo-100"
          />
          <p className="mt-1 text-sm text-gray-500">Size limit: 10 MB</p>
        </div>

        <button
          type="submit"
          disabled={isLoading || formData.categories.length !== 3}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
            isLoading || formData.categories.length !== 3 ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
          }`}
        >
          {isLoading ? 'Submitting...' : 'Grow my revenue'}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;