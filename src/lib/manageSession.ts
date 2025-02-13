// ✅ Ensure this runs on the server
"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getSession = async () => {
  const session = await auth();
  return session;
};

export const validateSession = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/");
  }
};
