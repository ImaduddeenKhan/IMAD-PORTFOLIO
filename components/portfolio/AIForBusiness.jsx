import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function AIForBusiness() {
  return (
    <section
      id="ai-in-your-business"
      className="section-shell"
      aria-labelledby="ai-in-your-business-heading"
    >
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center gap-6 py-6 sm:py-10">
          <p className="eyebrow justify-center inline-flex items-center gap-2">
            <Sparkles className="h-3.5 w-3.5" /> AI in your business
          </p>

          <div className="group flex flex-col items-center gap-4">
            <Link 
              href="/ai-in-your-business"
              className="inline-block transition-transform duration-300 hover:scale-[1.01]"
            >
              <h2
                id="ai-in-your-business-heading"
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] leading-[0.95] text-fg transition-colors duration-300 hover:text-primary"
              >
                AI In Your Business
              </h2>
            </Link>

            <Link
              href="/ai-in-your-business"
              className="max-w-2xl text-center block transition-colors duration-300"
            >
              <p className="text-base sm:text-lg md:text-xl text-fg/75 leading-relaxed group-hover:text-fg/90 transition-colors">
                How AI Can Help Your Industry — by Imad Khan.{" "}
                <span className="text-primary font-semibold underline decoration-2 underline-offset-4 group-hover:text-primary/95 transition-colors">
                  Click here to explore how AI can transform your business and industry.
                </span>
              </p>
            </Link>
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center">
            <Link
              href="/heavyhaul-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-base sm:text-lg px-8 py-4 gap-3 shadow-lg hover:scale-[1.03] transition-all duration-300 inline-flex items-center"
            >
              What I Did During My 6-Month Internship
              <ArrowUpRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
