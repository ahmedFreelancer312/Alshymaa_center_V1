import Link from "next/link";
import {
  FaBook,
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <FaBook className="text-blue-400 text-2xl" />
              <span className="font-bold text-xl">Code Storm</span>
            </Link>
            <p className="mt-4 text-gray-400">
              Helping students succeed since 2023.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/features" className="hover:text-white transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/mobile" className="hover:text-white transition">
                  Mobile
                </Link>
              </li>
              <li>
                <Link href="/updates" className="hover:text-white transition">
                  Updates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition">
                  Press
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/privacy" className="hover:text-white transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition">
                  Security
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white transition">
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Code Storm. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              <FaTwitter className="text-xl" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              <FaFacebook className="text-xl" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              <FaInstagram className="text-xl" />
            </Link>
            <Link
              href="#"
              className="text-gray-400 hover:text-white transition"
            >
              <FaLinkedin className="text-xl" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
