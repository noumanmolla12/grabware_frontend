"use client";
import React, { useState } from "react";

function NavbarForm({ initialData = {}, parents = [], onSubmit }) {
  const [form, setForm] = useState({
    title: initialData.title || "",
    url: initialData.url || "",
    visible: initialData.visible ?? true,
    parentId: initialData.parentId || "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title: form.title,
      url: form.url,
      visible: form.visible,
      parentId: form.parentId || null, // 👈 normalize empty string → null
    };

    onSubmit(payload);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="url"
        placeholder="URL"
        value={form.url}
        onChange={handleChange}
        required
      />

      <label>
        <input
          type="checkbox"
          name="visible"
          checked={form.visible}
          onChange={handleChange}
        />
        Visible
      </label>

      <select name="parentId" value={form.parentId} onChange={handleChange}>
        <option value="">No Parent</option>
        {parents.map((p) => (
          <option key={p._id} value={p._id}>
            {p.title}
          </option>
        ))}
      </select>

      <button type="submit">Save</button>
    </form>
  );
}

export default NavbarForm;
