import connectDB from "@/lib/mongodb";
import Item from "@/models/Item";

export async function PUT(req, { params }) {
  const data = await req.json();
  await connectDB();
  const item = await Item.findByIdAndUpdate(params.id, data, { new: true });
  return Response.json(item);
}

export async function DELETE(_, { params }) {
  await connectDB();
  await Item.findByIdAndDelete(params.id);
  return Response.json({ message: "Deleted" });
}
