import React from "react";
import aboutImg from "../assets/serum01.png";

const About = () => {
  return (
    <section id="about" className="py-24 px-6 bg-sand-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        {/* Left Side: Brand Story & Values */}
        <div className="md:col-span-7 space-y-8" data-aos="fade-right">
          <div className="space-y-3">
            <span className="text-primary uppercase tracking-widest text-xs font-semibold">Our Philosophy</span>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-900">
              Purity in Every Drop
            </h2>
            <div className="h-0.5 w-12 bg-primary"></div>
          </div>

          <div className="space-y-4 text-cocoa-600 leading-relaxed font-normal text-base md:text-lg">
            <p>
              Glow & Shine was founded on the belief that skincare should be a therapeutic ritual. We carefully select premium, organic botanicals and marine extracts to formulate products that work in harmony with your skin's natural biology.
            </p>
            <p>
              We prioritize scientific research and clean sourcing, ensuring that every product is entirely free of parabens, synthetic fragrances, and harmful chemicals. Our formulations are dermatologically tested, cruelty-free, and packaged sustainably.
            </p>
          </div>

          {/* Brand Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6">
            <div className="border border-sand-200/50 bg-white/40 p-5 rounded-2xl space-y-2">
              <h4 className="font-serif font-bold text-cocoa-900 text-lg">100% Organic</h4>
              <p className="text-cocoa-600 text-xs leading-relaxed">
                Hand-picked botanical ingredients sourced from ethical farms.
              </p>
            </div>
            <div className="border border-sand-200/50 bg-white/40 p-5 rounded-2xl space-y-2">
              <h4 className="font-serif font-bold text-cocoa-900 text-lg">Cruelty Free</h4>
              <p className="text-cocoa-600 text-xs leading-relaxed">
                Never tested on animals. Fully certified and dermatologically safe.
              </p>
            </div>
            <div className="border border-sand-200/50 bg-white/40 p-5 rounded-2xl space-y-2">
              <h4 className="font-serif font-bold text-cocoa-900 text-lg">Sustainably Made</h4>
              <p className="text-cocoa-600 text-xs leading-relaxed">
                Recyclable amber glass bottles designed to preserve freshness.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Framed Image */}
        <div className="md:col-span-5 flex justify-center" data-aos="fade-left">
          <div className="relative p-3 border border-sand-200/40 bg-white rounded-2xl shadow-sm max-w-sm w-full">
            <div className="aspect-3/4 rounded-xl overflow-hidden bg-sand-100">
              <img
                src={aboutImg}
                alt="Natural Skincare Prep"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 -z-10 rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
