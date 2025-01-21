"use client";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface FormData {
  name: string;
  text: string;
  img: string | null; // Allow both string and null
  para1: string;
  para2: string;
  para3: string;
  hit: string;
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    text: "",
    img: null, // Initialize as null
    para1: "",
    para2: "",
    para3: "",
    hit: "",
  });

  const [isLoading, setIsLoading] =useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({
        ...prev,
        img: reader.result as string, // Set img to a string
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true)

    try {
      const response = await axios.post("https://artistbackend.onrender.com/api/artists", formData, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("Response:", response.data);
      alert("Artist added successfully!");

      // Reset the form
      setFormData({
        name: "",
        text: "",
        img: null, // Reset to null
        para1: "",
        para2: "",
        para3: "",
        hit: "",
      });
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to add artist. Please try again.");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="lg:max-w-[80%] mx-auto sm:grid grid-cols-2 gap-x-2 bg-white/50 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 col-span-2">Add Artist</h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Artist Name</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Artist Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">Text</label>
          <input
            type="text"
            name="text"
            id="text"
            placeholder="Text"
            value={formData.text}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">Artist Image</label>
          <input
            type="file"
            name="img"
            id="img"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleImageUpload(e.target.files[0]);
              }
            }}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        {/* Conditionally render the image */}
        {formData.img && (
          <div className="mb-4 col-span-2">
            <Image
              src={formData.img}
              alt="Artist Image"
              width={200}
              height={200}
              className="rounded-lg"
            />
          </div>
        )}

        <div className="mb-4 ">
          <label htmlFor="para1" className="block text-sm font-medium text-gray-700 mb-1">Paragraph 1</label>
          <textarea
            name="para1"
            id="para1"
            placeholder="Paragraph 1"
            value={formData.para1}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="para2" className="block text-sm font-medium text-gray-700 mb-1">Paragraph 2</label>
          <textarea
            name="para2"
            id="para2"
            placeholder="Paragraph 2"
            value={formData.para2}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="para3" className="block text-sm font-medium text-gray-700 mb-1">Paragraph 3</label>
          <textarea
            name="para3"
            id="para3"
            placeholder="Paragraph 3"
            value={formData.para3}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400" />
        </div>

        <div className="mb-4">
          <label htmlFor="hit" className="block text-sm font-medium text-gray-700 mb-1">Hit</label>
          <input
            type="text"
            name="hit"
            id="hit"
            placeholder="Hit"
            value={formData.hit}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>


        <button
          type="submit"
          disabled={isLoading}
          className="w-full col-span-2 bg-teal-400 text-white py-2 px-4 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>

      </form>
    </div>
  );
};

export default Form;






