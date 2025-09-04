"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCircular } from "@/features/orderCircular/orderCircularSlice";
import { useRouter } from "next/navigation";

export default function AddCircularPage() {
  const [form, setForm] = useState({
    department: "",
    noticeNumber: "",
    noticeDate: "",
    noticeSubject: "",
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(addCircular(form));
    router.push("/admin/pages/ordercircular/view-ordercircular");
  };

  return (
    <div>
      <h2>Add Order Circular</h2>
      <form onSubmit={handleSubmit}>
        <input name="department" placeholder="Department" onChange={handleChange} required />
        <input name="noticeNumber" placeholder="Notice Number" onChange={handleChange} required />
        <input type="date" name="noticeDate" onChange={handleChange} required />
        <input name="noticeSubject" placeholder="Notice Subject" onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}
