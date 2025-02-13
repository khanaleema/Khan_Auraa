// ✅ This runs on the server
import { NextResponse } from "next/server";
import { getSession } from "@/lib/manageSession";

export async function GET() {
  const session = await getSession();
  return NextResponse.json({ session });
}
