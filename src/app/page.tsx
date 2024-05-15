import HomePage from "@/components/homepage/page";
import Navbar from "@/components/navbar/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <div className="p-12">
        <HomePage />
      </div>
    </main>
  );
}
