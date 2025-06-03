import Image from "next/image";
import Link from "next/link";
import { FaPlay, FaArrowRight } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="relative py-20 bg-gradient-to-br from-background-secondary to-background-secondary/80 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 bg-primary-light rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-primary rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-dark">
            Transform Your <br className="hidden md:block" /> Academic Journey
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto">
            The intelligent dashboard that helps students{" "}
            <span className="font-semibold text-primary">organize</span>,{" "}
            <span className="font-semibold text-primary-dark">track</span>, and{" "}
            <span className="font-semibold text-primary">excel</span> in their
            studies.
          </p>

          {/* Enhanced Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            {/* Primary Button */}
            <Link
              href="/documentation"
              className="relative flex items-center justify-center px-8 py-4 bg-primary text-background rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center font-medium text-lg">
              View Documentation
                <FaArrowRight className="ml-3 transition-transform group-hover:translate-x-1 duration-200" />
              </span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </Link>

            {/* Secondary Button */}
            <Link
              href="/student/dashboard"
              className="relative flex items-center justify-center px-8 py-4 border-2 border-primary text-primary bg-transparent rounded-xl hover:bg-primary/5 transition-all duration-300 group overflow-hidden"
            >
              <span className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10 flex items-center font-medium text-lg">
                Access Dashboard
              </span>
            </Link>
          </div>

          {/* Dashboard Image */}
          <div className="mt-16 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-xl shadow-2xl overflow-hidden border-8 border-background bg-background transition-transform duration-500 hover:scale-[1.02]">
              <Image
                src="/dashboard-screenshot.png"
                alt="Academic Dashboard Preview"
                width={1200}
                height={800}
                className="object-cover w-full h-auto"
                quality={100}
                priority
              />
              <div className="absolute inset-0 bg-primary/5 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <FaPlay className="text-white text-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
