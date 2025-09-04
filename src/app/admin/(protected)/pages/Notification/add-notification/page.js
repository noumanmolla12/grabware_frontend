"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification } from "@/features/notification/notificationSlice";
import { useRouter } from "next/navigation";
import { FaFilePdf, FaImage, FaTachometerAlt } from "react-icons/fa";
import Link from "next/link";


export default function AddNotification() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [form, setForm] = useState({
    category: "",
    title: "",
    details: "",
    validUpto: "",
    status: false,
  });
  const [pdf, setPdf] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed!");
      setPdf(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("PDF must be 2MB or less!");
      setPdf(null);
      return;
    }

    setError("");
    setPdf(file);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Only image files are allowed!");
      setPhoto(null);
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be 2MB or less!");
      setPhoto(null);
      return;
    }

    setError("");
    setPhoto(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(form).forEach((k) => formData.append(k, form[k]));
    if (pdf) formData.append("pdf", pdf);
    if (photo) formData.append("photo", photo);

    await dispatch(addNotification(formData));
    router.push("/admin/pages/Notification/view-notification");
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
       <div className="bg-white rounded px-4 py-2 mb-6 flex items-center text-sm shadow-sm">
          <FaTachometerAlt className="text-[#6b7280] mr-2" />
          <Link
            href="/admin/dashboard"
            className="font-medium no-underline"
            style={{ color: "#6b7280" }}
          >
            Dashboard
          </Link>

          <span className="mx-2 text-[#9ca3af]">/</span>
          <span className="text-[#6b7280]">Add Notification</span>
        </div>
      <div className="max-w-md mx-auto bg-white rounded shadow p-6">
        {/* Breadcrumb */}
       

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Category */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Category</label>
            <select
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              required
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              {[
                "RECRUITMENT",
                "NEWS",
                "EVENTS",
                "PRESS RELEASE",
                "Office Order",
                "Circular",
                "Tender",
              ].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Details */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Details</label>
            <textarea
              placeholder="Details"
              value={form.details}
              onChange={(e) => setForm({ ...form, details: e.target.value })}
              className="w-full border rounded px-3 py-2"
              rows={4}
            ></textarea>
          </div>

          {/* Valid Upto */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Valid Upto</label>
            <input
              type="date"
              value={form.validUpto}
              onChange={(e) => setForm({ ...form, validUpto: e.target.value })}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Status */}
          <div className="mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.checked })}
                className="mr-2"
              />
              Active
            </label>
          </div>

          {/* PDF Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload PDF</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <FaFilePdf size={30} color="red" />
              <span className="text-sm">Choose PDF</span>
              <input
                type="file"
                accept="application/pdf"
                onChange={handlePdfChange}
                style={{ display: "none" }}
              />
            </label>
            {pdf && (
              <p className="text-sm mt-1">
                📄 {pdf.name} ({(pdf.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block font-semibold mb-1">Upload Image</label>
            <label className="flex items-center gap-2 cursor-pointer">
              <FaImage size={30} color="green" />
              <span className="text-sm">Choose Image</span>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ display: "none" }}
              />
            </label>
            {photo && (
              <p className="text-sm mt-1">
                🖼️ {photo.name} ({(photo.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Buttons */}
          <div className="flex justify-start gap-2">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/pages/Notification/view-notification")
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}









// "use client";
// import { useState } from "react";
// import { useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
// import { addNotification } from "@/features/notification/notificationSlice";

// export default function AddNotification() {
//   const [department, setDepartment] = useState("");
//   const [details, setDetails] = useState("");
//   const [pdf, setPdf] = useState(null);
//   const [validUpto, setValidUpto] = useState("");
//   const [status, setStatus] = useState(false);

//   const dispatch = useDispatch();
//   const router = useRouter();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("department", department);
//     formData.append("details", details);
//     formData.append("validUpto", validUpto);
//     formData.append("status", status);
//     if (pdf) formData.append("pdf", pdf);

//     const result = await dispatch(addNotification(formData));

//     if (result.meta.requestStatus === "fulfilled") {
//       router.push("/admin/pages/Notification/view-notification");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Add Notification</h2>
//       <input
//         type="text"
//         placeholder="Department"
//         value={department}
//         onChange={(e) => setDepartment(e.target.value)}
//       />
//       <textarea
//         placeholder="Details"
//         value={details}
//         onChange={(e) => setDetails(e.target.value)}
//       />
//       <input
//         type="file"
//         accept="application/pdf"
//         onChange={(e) => setPdf(e.target.files[0])}
//       />
//       <input
//         type="date"
//         value={validUpto}
//         onChange={(e) => setValidUpto(e.target.value)}
//       />
//       <label>
//         <input
//           type="checkbox"
//           checked={status}
//           onChange={(e) => setStatus(e.target.checked)}
//         />{" "}
//         Status
//       </label>
//       <button type="submit">Add</button>
//     </form>
//   );
// }
