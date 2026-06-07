import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-24 px-6 bg-sand-50 border-t border-sand-200/50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-16" data-aos="fade-up">
          <span className="text-primary uppercase tracking-widest text-xs font-semibold">Get in Touch</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-cocoa-900 mt-2">
            Contact Our Team
          </h2>
          <div className="h-0.5 w-16 bg-primary mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="md:col-span-7 bg-sand-100/50 border border-sand-200/50 p-8 rounded-2xl space-y-6"
            data-aos="fade-right"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all font-sans"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Email</label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-cocoa-600">Message</label>
              <textarea
                placeholder="Your Message"
                rows="5"
                className="w-full px-4 py-3 bg-white border border-sand-200 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 text-sm transition-all font-sans resize-none"
                required
              ></textarea>
            </div>

            <div>
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-white text-xs font-semibold tracking-widest uppercase px-8 py-3.5 rounded-full transition-all duration-200 shadow-sm active:scale-97 cursor-pointer"
              >
                Send Message
              </button>
            </div>
          </form>

          {/* Contact Info */}
          <div className="md:col-span-5 space-y-8 text-cocoa-900" data-aos="fade-left">
            <div className="space-y-6">
              <h3 className="font-serif font-bold text-2xl text-cocoa-900">Reach Us Directly</h3>
              <p className="text-cocoa-600 text-sm leading-relaxed max-w-sm font-normal">
                Have questions about our ingredients, orders, or need a personalized skincare recommendation? Reach out to us. We’d love to assist you.
              </p>
            </div>

            <div className="space-y-5">
              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-sand-100 p-2 text-primary">
                  <FaMapMarkerAlt className="text-lg" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-cocoa-900 uppercase tracking-wider">Aesthetic Studio</h5>
                  <p className="text-cocoa-600 text-sm mt-0.5 font-normal">123 Skincare Street, Beauty City, Country</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-sand-100 p-2 text-primary">
                  <FaPhone className="text-lg" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-cocoa-900 uppercase tracking-wider">Call Us</h5>
                  <p className="text-cocoa-600 text-sm mt-0.5 font-normal">+1 234 567 890</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="mt-1 bg-sand-100 p-2 text-primary">
                  <FaEnvelope className="text-lg" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-sm text-cocoa-900 uppercase tracking-wider">Email Inquiry</h5>
                  <p className="text-cocoa-600 text-sm mt-0.5 font-normal">support@glowandshine.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
