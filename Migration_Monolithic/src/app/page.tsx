import Image from "next/image";
import { PostProvider } from "@/Context/PostContext";

export default function Home() {
  return (
    <PostProvider>
      <main className="flex h-screen flex-col text-slate-200 bg-slate-800 items-center justify-between p-24">
          <h1 className="text-5xl">Learn Next JS and Prisma</h1>
      </main>
    </PostProvider>
  );
}
