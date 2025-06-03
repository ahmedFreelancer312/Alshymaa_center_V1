import { FaCheckCircle } from "react-icons/fa";
import { PricingPlan } from "../types";

const pricingPlans: PricingPlan[] = [
  {
    name: "Free Plan",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Assignment tracking",
      "Basic study planner",
      "Grade tracking",
      "Up to 3 course collaborations",
    ],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
  {
    name: "Free Plan",
    price: "$0",
    description: "Perfect for getting started",
    features: [
      "Assignment tracking",
      "Basic study planner",
      "Grade tracking",
      "Up to 3 course collaborations",
    ],
    buttonText: "Get Started",
    buttonVariant: "secondary",
  },
];

const PricingSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-xl text-text-secondary max-w-3xl mx-auto">
            Free for students. Premium features for those who want extra power.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`border rounded-xl p-8 hover:shadow-md transition ${
                plan.isPopular
                  ? "border-2 border-primary bg-primary/10 transform md:-translate-y-4"
                  : "border-background-secondary"
              }`}
            >
              {plan.isPopular && (
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-2xl font-semibold text-text">
                      {plan.name}
                    </h3>
                    <p className="mt-2 text-text-secondary">
                      {plan.description}
                    </p>
                  </div>
                  <span className="bg-primary text-white text-sm px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              {!plan.isPopular && (
                <div>
                  <h3 className="text-2xl font-semibold text-text">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-text-secondary">{plan.description}</p>
                </div>
              )}
              <div className="mt-6">
                <span className="text-4xl font-bold text-text">
                  {plan.price}
                </span>
                {plan.price !== "$0" && (
                  <span className="text-text-secondary">/month</span>
                )}
              </div>
              <ul className="mt-8 space-y-3">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start text-text">
                    <FaCheckCircle
                      className={`mt-1 mr-3 flex-shrink-0 ${
                        plan.isPopular ? "text-primary" : "text-success"
                      }`}
                    />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                className={`mt-8 w-full py-3 rounded-lg font-medium cursor-pointer ${
                  plan.buttonVariant === "primary"
                    ? "bg-primary text-white hover:bg-primary-dark shadow-md"
                    : "bg-background-secondary text-text hover:bg-background-secondary/80"
                }`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
