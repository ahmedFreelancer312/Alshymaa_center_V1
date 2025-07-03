/* eslint-disable react/no-unescaped-entities */
import { FaEnvelope, FaComment } from "react-icons/fa";
import Link from "next/link";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">Contact Our Team</h2>
          <p className="mt-4 text-xl text-text-secondary">
            We're here to help with any questions about Code Storm.
          </p>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-background-secondary p-8 rounded-xl border border-background-secondary">
            <FaEnvelope className="text-5xl text-primary mx-auto" />
            <h3 className="text-2xl font-semibold mt-6 text-center text-text">
              Email Us
            </h3>
            <p className="mt-4 text-text-secondary text-center">
              Typically reply within 24 hours
            </p>
            <Link
              href="ahmedsadeek312@gmail.com"
              className="mt-2 text-primary text-xl font-medium text-center block hover:text-primary-dark transition"
            >
              ahmedsadeek312@gmail.com
            </Link>
          </div>
          <div className="bg-background-secondary p-8 rounded-xl border border-background-secondary">
            <FaComment className="text-5xl text-primary mx-auto" />
            <h3 className="text-2xl font-semibold mt-6 text-center text-text">
              Live Chat
            </h3>
            <p className="mt-4 text-text-secondary text-center">
              Available Monday-Friday, 9am-5pm EST
            </p>
            <Link
              href="/chat"
              className="mt-6 mx-auto bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition block w-fit"
            >
              Start Chat
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
