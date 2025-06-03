import { FaLock, FaCheckCircle } from "react-icons/fa";

const SecuritySection = () => {
  return (
    <section className="py-20 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-primary p-8 rounded-xl text-white w-full max-w-md">
              <FaLock className="text-5xl mb-6 mx-auto" />
              <h3 className="text-2xl font-bold text-center">
                Your Data is Secure
              </h3>
              <p className="mt-4 opacity-90 text-center">
                We use enterprise-grade encryption to protect your academic
                information.
              </p>
            </div>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold text-text">Privacy First</h2>
            <p className="mt-6 text-xl text-text-secondary">
              We believe your academic data should remain private and under your
              control.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "End-to-end encryption for all data",
                "No selling or sharing of your information",
                "GDPR and FERPA compliant",
                "Regular security audits",
              ].map((item, index) => (
                <li key={index} className="flex items-start text-text">
                  <FaCheckCircle className="text-primary mt-1 mr-3 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;
