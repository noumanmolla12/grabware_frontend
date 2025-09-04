"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, updateMember } from "@/features/member/memberSlice";
import { useParams, useRouter } from "next/navigation";

export default function EditMember() {
  const dispatch = useDispatch();
  const router = useRouter();
  const params = useParams();
  const { members } = useSelector((state) => state.member);

  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!members.length) dispatch(fetchMembers());
  }, [dispatch, members.length]);

  useEffect(() => {
    const member = members.find((m) => m._id === params.id);
    if (member) setName(member.name);
  }, [members, params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image);

    dispatch(updateMember({ id: params.id, formData }));
    router.push("/admin/member/view-member");
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Edit Member</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 rounded"/>
        <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])}/>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Update Member</button>
      </form>
    </div>
  );
}
