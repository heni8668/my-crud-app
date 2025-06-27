import connectDB from "@/lib/mongodb";
import Item from "@/models/Item";

export async function GET() {
  await connectDB();
  const items = await Item.find();
  return Response.json(items);
}

export async function POST(request) {
  const data = await request.json();
  await connectDB();
  const item = await Item.create(data);
  return Response.json(item);
}
