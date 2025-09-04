"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembers, deleteMember } from "@/features/member/memberSlice";
import Link from "next/link";

export default function ViewMember() {
  const dispatch = useDispatch();
  const { members, status } = useSelector((state) => state.members);

  useEffect(() => {
    dispatch(fetchMembers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Members List</h1>
      {status === "loading" ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border">
          <thead>
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td className="border p-2">
                  <img
  src={`http://localhost:5000/uploads/members/${member.image}`}
  alt={member.name}
  className="h-16 w-16 object-cover"
/>

                </td>
                <td className="border p-2">{member.name}</td>
                <td className="border p-2 flex gap-2">
                  <Link
                    href={`/admin/pages/member/edit-member/${member._id}`}
                    className="bg-yellow-400 p-1 rounded"
                  >
                    Edit
                  </Link>
                  <button
  onClick={() => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      dispatch(deleteMember(member._id));
    }
  }}
  className="bg-red-500 text-white p-1 rounded"
>
  Delete
</button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
