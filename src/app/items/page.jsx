"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import Loading from "@/components/Loading";

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const res = await fetch("/api/items");
    const data = await res.json();
    setItems(data);
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirm) {
      const deleting = toast.loading("Deleting...");
      const res = await fetch(`/api/items/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Item deleted!", { id: deleting });
        fetchItems();
      } else {
        toast.error("Failed to delete.", { id: deleting });
      }
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">My Crud App</h1>
        <Link
          href="/items/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          + Add New
        </Link>
      </div>

      {items.length === 0 ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.content}</p>
              <div className="flex justify-between">
                <Link
                  href={`/items/edit/${item._id}`}
                  className="text-blue-600 hover:text-blue-800 font-medium"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
