import React from "react";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const testimonials = [
  {
    name: "Alice M.",
    text: "Amazing products! My skin has never felt better or looked more radiant. The gentle cleanser is a game-changer.",
    rating: 5,
    role: "Verified Buyer",
  },
  {
    name: "John D.",
    text: "High quality and natural ingredients. I love the earth-conscious packaging and how lightweight the serum feels.",
    rating: 4,
    role: "Verified Buyer",
  },
  {
    name: "Sophia L.",
    text: "Fast delivery, premium customer support, and incredible products that solved my dry skin issues in a week.",
    rating: 5,
    role: "Verified Buyer",
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="py-24 px-6 bg-sand-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-primary uppercase tracking-widest text-xs font-semibold">Reviews</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-900 mt-2">
            User Experience
          </h2>
          <p className="text-cocoa-600/80 italic mt-3 text-base">
            "Your feedback shapes our future"
          </p>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-4"></div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <div
              key={index}
              className="bg-white border border-sand-200/50 rounded-2xl p-8 flex flex-col justify-between relative transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
              data-aos="fade-up"
            >
              {/* Quote Mark */}
              <div className="text-sand-200 absolute top-6 right-8 text-3xl pointer-events-none">
                <FaQuoteLeft className="opacity-20" />
              </div>

              <div>
                {/* Rating stars */}
                <div className="flex items-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`mr-1 text-xs ${
                        i < t.rating ? "text-yellow-400" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-cocoa-600 text-sm md:text-base leading-relaxed mb-6 font-normal italic">
                  "{t.text}"
                </p>
              </div>

              {/* User Identity */}
              <div className="border-t border-sand-100 pt-4 mt-auto">
                <p className="font-serif font-bold text-cocoa-900 text-base">{t.name}</p>
                <p className="text-primary text-[10px] uppercase tracking-widest font-semibold mt-0.5">
                  {t.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
