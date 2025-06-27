"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import BackButton from "@/components/BackButton";

export default function EditItemPage() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  useEffect(() => {
    const fetchItem = async () => {
      const res = await fetch(`/api/items`);
      const data = await res.json();
      const currentItem = data.find((item) => item._id === id);
      if (currentItem) setForm(currentItem);
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updating = toast.loading("Updating item...");
    try {
      const res = await fetch(`/api/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        toast.success("Item updated successfully!", { id: updating });
        router.push("/items");
      } else {
        toast.error("Failed to update item", { id: updating });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: updating });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <BackButton />
      <h1 className="text-xl font-bold mb-4">Edit Item</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Update Item
        </button>
      </form>
    </div>
  );
}
