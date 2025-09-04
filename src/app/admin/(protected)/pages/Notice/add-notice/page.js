"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMember } from "@/features/member/memberSlice";

export default function AddMember() {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !image) return alert("Name and Image required");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    dispatch(addMember(formData));
    setName("");
    setImage(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Add Member</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Add Member</button>
      </form>
    </div>
  );
}
