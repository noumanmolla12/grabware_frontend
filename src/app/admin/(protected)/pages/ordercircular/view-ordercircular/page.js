"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCirculars, deleteCircular } from "@/features/orderCircular/orderCircularSlice";
import Link from "next/link";

export default function ViewCircularPage() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.orderCirculars);

  useEffect(() => {
    dispatch(fetchCirculars());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this circular?")) {
      dispatch(deleteCircular(id));
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Order Circulars</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Departments</th>
            <th>Notice Number</th>
            <th>Date</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((c) => (
            <tr key={c._id}>
              <td>{c.department}</td>
              <td>{c.noticeNumber}</td>
              <td>{new Date(c.noticeDate).toLocaleDateString()}</td>
              <td>{c.noticeSubject}</td>
              <td>
                <Link href={`/admin/pages/ordercircular/edit-ordercircular/${c._id}`}>
                  Edit
                </Link>
                {" | "}
                <button onClick={() => handleDelete(c._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
