import { FaMobileAlt, FaCheckCircle } from 'react-icons/fa';

const MobileAppSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-text">Your Dashboard On The Go</h2>
            <p className="mt-6 text-xl text-text-secondary">
              Access all your academic tools from your phone with our mobile app.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Sync across all your devices",
                "Get deadline notifications",
                "Quickly add assignments",
                "Study on the go with mobile flashcards"
              ].map((item, index) => (
                <li key={index} className="flex items-start text-text">
                  <FaCheckCircle className="text-success mt-1 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center hover:bg-primary-darker transition">
                <FaMobileAlt className="mr-2" /> App Store
              </button>
              <button className="bg-primary-dark text-white px-6 py-3 rounded-lg flex items-center hover:bg-primary-darker transition">
                <FaMobileAlt className="mr-2" /> Play Store
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-auto border-8 border-text rounded-3xl overflow-hidden shadow-2xl">
                {/* <Image 
                  src={mobileApp1}
                  alt="Mobile app screenshot"
                  placeholder="blur"
                /> */}
              </div>
              <div className="absolute -bottom-8 -right-8 w-64 h-auto border-8 border-text rounded-3xl overflow-hidden shadow-2xl z-10">
                {/* <Image 
                  src={mobileApp2}
                  alt="Mobile app screenshot"
                  placeholder="blur"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppSection;