// components/EditProfile.jsx
import { useState } from "react";
import { toast } from "react-toastify";

const EditProfile = ({ user, onClose }) => {
  const [form, setForm] = useState(user || {});
  const [imagePreview, setImagePreview] = useState(form?.image || "");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setForm({ ...form, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImagePreview("");
    setForm({ ...form, image: "" });
  };

  const handleSave = () => {
    localStorage.setItem("fitfreakUser", JSON.stringify(form));
    toast.success("Profile updated!");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-[#111] p-6 rounded-lg w-full max-w-md border border-orange-500 shadow-orange-glow">
        <h2 className="text-xl text-orange-400 font-bold mb-4">Edit Profile</h2>

        {/* Profile Image Upload */}
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Profile"
            className="w-20 h-20 rounded-full mx-auto mb-4 border-2 border-orange-400 object-cover"
          />
        )}
        <div className="flex justify-between mb-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="text-sm text-white"
          />
          {imagePreview && (
            <button onClick={handleImageRemove} className="text-red-400 text-sm">
              Remove Image
            </button>
          )}
        </div>

        {/* Name, Email, Password */}
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black border border-orange-500 rounded text-white"
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 mb-3 bg-black border border-orange-500 rounded text-white"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 mb-4 bg-black border border-orange-500 rounded text-white"
          placeholder="Password"
        />

        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="text-white hover:underline">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:scale-105"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
