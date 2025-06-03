import Link from 'next/link';

const CTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary to-primary-dark text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold">Ready to Transform Your Academic Experience?</h2>
        <p className="mt-6 text-xl opacity-90">
          Join thousands of students who are achieving more with less stress.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-block bg-background text-primary px-10 py-4 rounded-lg text-lg font-bold hover:bg-background-secondary transition shadow-xl"
          >
            Get Started for Free
          </Link>
          <p className="mt-4 opacity-80">No credit card required. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;