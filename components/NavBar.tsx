import Link from "next/link";

export default function NavBar() {
  return (
    <header className="border-b bg-white">
      <nav className="container flex h-14 items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          AdForge
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:text-blue-600">Dashboard</Link>
          <Link href="/scout" className="hover:text-blue-600">Scout</Link>
        </div>
      </nav>
    </header>
  );
}

