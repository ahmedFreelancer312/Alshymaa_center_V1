import { FaQuestionCircle } from "react-icons/fa";
import { FAQItem } from "../types";

const faqs: FAQItem[] = [
  {
    question: "Is Code Storm really free?",
    answer: "Yes! Our core features are completely free for students.",
  },
  {
    question: "Is Code Storm really free?",
    answer: "Yes! Our core features are completely free for students.",
  },
  {
    question: "Is Code Storm really free?",
    answer: "Yes! Our core features are completely free for students.",
  },
  {
    question: "Is Code Storm really free?",
    answer: "Yes! Our core features are completely free for students.",
  },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-20 bg-background-secondary">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-xl text-text-secondary">
            Everything you need to know about Code Storm.
          </p>
        </div>
        <div className="mt-12 space-y-6">
          {faqs.map((faq, index) => (
            <details
              key={index}
              className="bg-background p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
            >
              <summary className="flex justify-between items-center list-none">
                <h3 className="text-xl font-medium text-text">
                  {faq.question}
                </h3>
                <FaQuestionCircle className="text-primary text-xl" />
              </summary>
              <p className="mt-4 text-text-secondary">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
