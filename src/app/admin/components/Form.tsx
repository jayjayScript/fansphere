"use client"
import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [formData, setFormData] = useState<{
    name: string;
    text: string;
    img: File | null;
    para1: string;
    para2: string;
    para3: string;
    hit: string;
  }>({
    name: "",
    text: "",
    img: null,
    para1: "",
    para2: "",
    para3: "",
    hit: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        img: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("text", formData.text);
    if (formData.img) {
      data.append("img", formData.img as File);
    }
    data.append("para1", formData.para1);
    data.append("para2", formData.para2);
    data.append("para3", formData.para3);
    data.append("hit", formData.hit);

    await axios.post("https://artistbackend.onrender.com/api/artists", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setFormData({
      name: "",
      text: "",
      img: null,
      para1: "",
      para2: "",
      para3: "",
      hit: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white/50 p-6 shadow-md rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Artist</h2>

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

      <div className="mb-4">
        <label htmlFor="img" className="block text-sm font-medium text-gray-700 mb-1">Artist Image</label>
        <input
          type="file"
          name="img"
          id="img"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
        />
      </div>

      <div className="mb-4">
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

      <div className="mb-4">
        <label htmlFor="para3" className="block text-sm font-medium text-gray-700 mb-1">Paragraph 3</label>
        <textarea
          name="para3"
          id="para3"
          placeholder="Paragraph 3"
          value={formData.para3}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
        />
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
        className="w-full bg-teal-400 text-white py-2 px-4 rounded-md hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:ring-offset-2"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
