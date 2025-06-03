/* eslint-disable react/no-unescaped-entities */
import { Testimonial } from "../types";

const testimonials: Testimonial[] = [
  {
    quote:
      "UniPortal cut my study time in half while improving my grades. The smart scheduling is a game-changer!",
    name: "Emily R.",
    role: "Computer Science Major",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-20 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-text">
            What Students Are Saying
          </h2>
          <p className="mt-4 text-xl text-text-secondary max-w-3xl mx-auto">
            Join thousands of students who have transformed their academic
            experience.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-background p-8 rounded-xl shadow-sm hover:shadow-md transition"
            >
              <div className="flex text-warning mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className="text-lg italic text-text">"{testimonial.quote}"</p>
              <div className="mt-6">
                <p className="font-semibold text-text">{testimonial.name}</p>
                <p className="text-text-secondary">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
