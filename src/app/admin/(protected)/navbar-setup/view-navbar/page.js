"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNavbars, deleteNavbar } from "../../../../../features/common/navbarSlice";
import Link from "next/link";

function NavbarList() {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.navbars);

  useEffect(() => {
    dispatch(fetchNavbars());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this navbar?")) {
      dispatch(deleteNavbar(id));
    }
  };

  return (
    <div>
      <h2>Manage Navbars</h2>
      <Link href="/admin/navbar-setup/add-navbar">Add New</Link>
      <ul>
        {items.map((navbar) => (
          <li key={navbar._id}>
            {navbar.title} ({navbar.visible ? "Visible" : "Hidden"}) → {navbar.url}
            <Link href={`/admin/navbar-setup/edit-navbar/${navbar._id}`} style={{ marginLeft: "10px" }}>
              Edit
            </Link>
            <button
              onClick={() => handleDelete(navbar._id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavbarList;
