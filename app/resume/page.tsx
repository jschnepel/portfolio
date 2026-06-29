import type { Metadata } from "next";
import { ResumeClient } from "@/components/ResumeClient";

export const metadata: Metadata = { title: "Resume" };

export default function ResumePage() {
  return <ResumeClient />;
}
