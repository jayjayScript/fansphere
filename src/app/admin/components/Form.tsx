"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Slide } from "react-toastify";

interface FormData {
  _id?: string;
  name: string;
  text: string;
  img: string; // Allow both string and null
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  charity: string;
  aboutCharity: string
}

interface Artist {
  _id: string;
  name: string;
  img: string;
  text?: string;
  para1: string;
  para2: string;
  para3: string;
  hitSong: string;
  charity: string;
  aboutCharity: string
}

const Form = () => {
  const [formData, setFormData] = useState<FormData>({
    _id: "",
    name: "",
    text: "",
    img: "", // Initialize as null
    para1: "",
    para2: "",
    para3: "",
    hitSong: "",
    charity: "",
    aboutCharity: "",
  });

  const [isLoading, setIsLoading] = useState(false)
  const [editMode, setEditMode] = useState(false);
  const [artists, setArtist] = useState<Artist[]>([]);
  const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
  const MAX_LENGTH = 10;


  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}`);
        console.log('Response data:', res.data);

        // Access the `data` property
        if (res.data && Array.isArray(res.data.data)) {
          setArtist(res.data.data); // Set the array of Celebrities
        } else {
          setArtist([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error('Error fetching Celebrities:', error);
      }
    };
    fetchArtist();
  }, []);

  useEffect(() => {
    if (selectedArtist) {
      setFormData({
        _id: selectedArtist._id,
        name: selectedArtist.name,
        text: selectedArtist.text ?? "",
        img: selectedArtist.img ?? "",
        para1: selectedArtist.para1,
        para2: selectedArtist.para2,
        para3: selectedArtist.para3,
        hitSong: selectedArtist.hitSong,
        charity: selectedArtist.charity,
        aboutCharity: selectedArtist.aboutCharity,
      });
      setEditMode(true);
    } else {
      setFormData({
        _id: "",
        name: "",
        text: "",
        img: "",
        para1: "",
        para2: "",
        para3: "",
        hitSong: "",
        charity: "",
        aboutCharity: "",
      });
      setEditMode(false);
    }
  }, [selectedArtist]);

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
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}`, // Single endpoint for both add & update
        formData,
        { headers: { "Content-Type": "application/json" } }
      );

      console.log("Response:", response.data);
      toast.success("Celebrity uploaded Successfully")// Display success message

      // Reset the form after submission
      setFormData({
        _id: "",
        name: "",
        text: "",
        img: "",
        para1: "",
        para2: "",
        para3: "",
        hitSong: "",
        charity: "",
        aboutCharity: "",
      });
      setSelectedArtist(null);
      setEditMode(false);
    } catch (error: unknown) {
      console.error("Error:", error);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "Failed to process the request.");
      } else {
        toast.error("Failed to process the request.");
      }
    } finally {
      setIsLoading(false);
    }
  };



  const handleEdit = (artist: Artist) => {
    setEditMode(true)
    setSelectedArtist({
      _id: artist._id.toString(),
      name: artist.name,
      text: artist.text ?? "",
      img: artist.img ?? "",
      para1: artist.para1,
      para2: artist.para2,
      para3: artist.para3,
      hitSong: artist.hitSong,
      charity: artist.charity,
      aboutCharity: artist.aboutCharity,
    });
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${id}`);
      console.log(response.data)
    toast.success("Celebrity deleted successfully!")
    } catch (error) {
      console.log(error)
      toast.error("Celebrity not deleted")
    }
  }

  return (
    <div>
      <ToastContainer 
      position="top-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Slide}
      />
      <form onSubmit={handleSubmit} className="lg:max-w-[80%] mx-auto sm:grid grid-cols-2 gap-x-2 bg-white/50 p-6 shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 col-span-2">
          {editMode ? "Edit Artist" : "Add Artist"}
        </h2>

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
        {formData.img && formData.img !== "" && (
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
          <label htmlFor="hitSong" className="block text-sm font-medium text-gray-700 mb-1">Hit</label>
          <input
            type="text"
            name="hitSong"
            id="hitSong"
            placeholder="Hit"
            value={formData.hitSong}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="charity" className="block text-sm font-medium text-gray-700 mb-1">Charity Name</label>
          <input
            type="text"
            name="charity"
            id="charity"
            placeholder="Charity"
            value={formData.charity}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-teal-400 focus:border-teal-400"
          />
        </div>

        <div className="mb-4 col-span-2">
          <label htmlFor="aboutCharity" className="block text-sm font-medium text-gray-700 mb-1">About Charity</label>
          <textarea
            name="aboutCharity"
            id="aboutCharity"
            placeholder="About Charity"
            value={formData.aboutCharity}
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
          {isLoading ? "Processing..." : editMode ? "Update Artist" : "Add Artist"}
        </button>

      </form>

      <div>
        <div className="mx-4 my-[3rem]">
          <div className={`grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 items-end md:justify-center sm:grid-cols-6 md:grid-cols-5 lg:grid-cols-7 space-x-1 space-y-3`}>
            {artists && artists.map(artist => (
              <div key={artist._id} className="rounded-lg p-4 flex flex-col items-center justify-center hover:bg-[#ffffff22]  transition-all duration-500">
                <Link href={`/celebrities/${artist._id}`}
                  className="flex-shrink-0"
                >
                  <div>
                    {artist.img && (
                      <Image
                        src={artist.img}
                        alt={artist.name}
                        className="w-[117.83px] h-[117.83px] rounded-[20px] object-cover"
                        width={70.64} height={70.64}
                      />
                    )}
                  </div>
                  <div className="my-2 ">
                    <h2 className="text-[#fff] text-[12px] md:text-[16.74px] font-medium">{artist.name}</h2>
                    <p className="text-[#ffffffaf] text-[10.61px] md:text-[14.35px] w-[85%]">{
                      (artist.text ?? '').length > MAX_LENGTH ? `${(artist.text ?? '').substring(0, MAX_LENGTH)}` + "..." : artist.text
                    }</p>
                  </div>
                </Link>

                <div className="flex gap-2 w-full items-cemter justify-between bg-[#18ffff] rounded-md">
                  <button className="text-[#000] flex justify-center items-center p-2" onClick={() => handleEdit(artist)}>
                    <p className="hidden">.</p>
                    <Icon icon="ri:pencil-fill" width="22" height="22" />
                  </button>
                  <button className="text-[#000] flex justify-center items-center flex-[0.8] bg-[#f65a5a] " onClick={() => handleDelete(artist._id)}>
                    <p className="hidden">.</p>
                    <Icon icon="mdi:bin"  width="22" height="22" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;






