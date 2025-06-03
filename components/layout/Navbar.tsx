import Link from "next/link";
import { GiBookmarklet } from "react-icons/gi";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

const Navbar = async () => {
  const navLinks = [
    { id: "features", label: "Features" },
    { id: "how-it-works", label: "How It Works" },
    { id: "testimonials", label: "Testimonials" },
    { id: "faq", label: "FAQ" },
  ];

  const session = await getServerSession(authOptions);

  return (
    <nav className="bg-background shadow-sm py-6 px-6 z-50 sticky top-0">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <GiBookmarklet className="text-primary text-2xl" />
          <span className="font-bold text-xl text-text">UniPortal</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={`#${link.id}`}
              className="text-text hover:text-primary transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div>
          {session?.user?.role == "student" ? (
            <Link
              href="/student/dashboard"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/student/login"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors duration-200"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
