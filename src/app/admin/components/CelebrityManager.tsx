// import { useEffect, useState } from "react";
// import Form from "./Form";

// interface Artist {
//   _id: string;
//   name: string;
//   text?: string;
//   img: File | null;
//   para1: string;
//   para2: string;
//   para3: string;
//   hitSong: string;
//   charity: string;
//   aboutCharity: string;
// }

//   const CelebrityManager = () => {
//   const [selectedArtist, setSelectedArtist] = useState<Artist | null>(null);
//   const [formData, setFormData] = useState<Artist>({
//     _id: "",
//       name: "",
//     text: "",
//     img: null,
//     para1: "",
//     para2: "",
//     para3: "",
//     hitSong: "",
//     charity: "",
//     aboutCharity: "",
//   });
//   const [editMode, setEditMode] = useState(false);

//   const handleEdit = (artist: Artist) => {
//     console.log("Editing artist:", artist);
//     setSelectedArtist({
//       _id: artist._id,
//       name: artist.name,
//       text: artist.text ?? "",
//       img: artist.img,
//       para1: artist.para1,
//       para2: artist.para2,
//       para3: artist.para3,
//       hitSong: artist.hitSong,
//       charity: artist.charity,
//       aboutCharity: artist.aboutCharity,
//     });
//   };

//   useEffect(() => {
//     console.log("selectedArtist updated:", selectedArtist);
//     if (selectedArtist) {
//       setFormData(selectedArtist);
//       setEditMode(true);
//     } else {
//       setFormData({
//         _id: "",
//         name: "",
//         text: "",
//         img: null,
//         para1: "",
//         para2: "",
//         para3: "",
//         hitSong: "",
//         charity: "",
//         aboutCharity: "",
//       });
//       setEditMode(false);
//     }
//   }, [selectedArtist]);

//   return (
//     <div>
//       <Form selectedArtist={selectedArtist} setSelectedArtist={setSelectedArtist} />
//       <div>
       
//         {[{ _id: "1", name: "Artist A", img: null, para1: "", para2: "", para3: "", hitSong: "", charity: "", aboutCharity: "" }].map((artist) => (
//           <div key={artist._id}>
//             <p>{artist.name}</p>
//             <button
//               className="text-[#fff]"
//               onClick={() => {
//                 console.log("Edit button clicked for:", artist.name);
//                 handleEdit(artist);
//               }}
//             >
//               Edit
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CelebrityManager;
