"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editNavbar, fetchNavbars } from "../../../../../../features/common/navbarSlice";
import { useParams, useRouter } from "next/navigation";
import NavbarForm from "../../NavbarForm";

function EditNavbar() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((state) => state.navbars);
  const navbar = items.find((navbar) => navbar._id === id);

  useEffect(() => {
    dispatch(fetchNavbars());
  }, [dispatch]);

  const handleSubmit = async (form) => {
    await dispatch(editNavbar({ id, data: form }));
    router.push("/admin/navbar-setup/view-navbar");
  };

  if (!navbar) return <p>Loading...</p>;

  return (
    <div>
      <h2>Edit Navbar</h2>
      <NavbarForm initialData={navbar} parents={items.filter((navbar) => navbar._id !== id)} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditNavbar;
