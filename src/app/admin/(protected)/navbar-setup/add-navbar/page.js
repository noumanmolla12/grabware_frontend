"use client";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addNavbar, fetchNavbars } from "../../../../../features/common/navbarSlice";
import { useRouter } from "next/navigation";
import NavbarForm from "../NavbarForm";

function AddNavbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items } = useSelector((state) => state.navbars);

  useEffect(() => {
    dispatch(fetchNavbars());
  }, [dispatch]);

  const handleSubmit = async (form) => {
    await dispatch(addNavbar(form));
    router.push("/admin/navbar-setup/view-navbar");
  };

  return (
    <div>
      <h2>Add Navbar</h2>
      <NavbarForm parents={items} onSubmit={handleSubmit} />
    </div>
  );
}

export default AddNavbar;
