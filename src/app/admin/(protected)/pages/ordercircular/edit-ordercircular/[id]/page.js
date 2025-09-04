"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCircular, fetchCirculars } from "@/features/orderCircular/orderCircularSlice";
import { useParams, useRouter } from "next/navigation";

export default function EditCircularPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.orderCirculars);

  const [form, setForm] = useState({
    department: "",
    noticeNumber: "",
    noticeDate: "",
    noticeSubject: "",
  });

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchCirculars());
    } else {
      const circular = items.find((c) => c._id === id);
      if (circular) {
        setForm({
          department: circular.department,
          noticeNumber: circular.noticeNumber,
          noticeDate: circular.noticeDate.split("T")[0],
          noticeSubject: circular.noticeSubject,
        });
      }
    }
  }, [items, id, dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(updateCircular({ id, data: form }));
    router.push("/admin/pages/ordercircular/view-ordercircular");
  };

  return (
    <div>
      <h2>Edit Circular</h2>
      <form onSubmit={handleSubmit}>
        <input name="department" value={form.department} onChange={handleChange} required />
        <input name="noticeNumber" value={form.noticeNumber} onChange={handleChange} required />
        <input type="date" name="noticeDate" value={form.noticeDate} onChange={handleChange} required />
        <input name="noticeSubject" value={form.noticeSubject} onChange={handleChange} required />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
