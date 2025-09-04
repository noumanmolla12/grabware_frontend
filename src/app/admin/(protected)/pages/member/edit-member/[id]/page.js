"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, editMember } from "@/features/member/memberSlice";
import { useParams, useRouter } from "next/navigation";

export default function EditMember() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { members } = useSelector((state) => state.members);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  // Fetch members if not already loaded
  useEffect(() => {
    if (!members.length) dispatch(fetchMembers());
  }, [dispatch, members.length]);

  // Find current member and set initial state
  useEffect(() => {
    const member = members.find((m) => m._id === params.id);
    if (member) {
      setName(member.name);
    }
  }, [members, params.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    dispatch(editMember({ id: params.id, memberData: formData }));
    router.push("/admin/pages/member/view-member");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Member</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          type="text"
          value={name}
          placeholder="Member Name"
          onChange={(e) => setName(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button
          type="submit"
          className="bg-green-500 text-white p-2 rounded"
        >
          Update Member
        </button>
      </form>
    </div>
  );
}
