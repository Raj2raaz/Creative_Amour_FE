import React, { useState } from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('Contact form submitted:', formData);
    toast.success('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="w-full bg-[#fef8f5]">
      <div className="bg-gradient-to-br from-primary to-secondary text-white text-center py-20 px-5 mb-16">
        <h1 className="text-3xl md:text-5xl mb-4 font-bold">Get In Touch</h1>
        <p className="text-lg md:text-xl max-w-[600px] mx-auto opacity-95">
          We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 lg:gap-16">
        <div className="flex flex-col gap-8">
          <div className="bg-white p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl">
              <FaMapMarkerAlt />
            </div>
            <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Online Store</h3>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">We are an online-only store</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">Delivering handcrafted items</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">across India</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl">
              <FaPhone />
            </div>
            <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Call Us</h3>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">+91 98765 43210</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">Mon - Sat: 10 AM - 7 PM</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">Sunday: Closed</p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
            <div className="w-16 h-16 mx-auto mb-5 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-3xl">
              <FaEnvelope />
            </div>
            <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Email Us</h3>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">info@creativeamour.com</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">support@creativeamour.com</p>
            <p className="text-base text-[#666] my-1.5 leading-relaxed">We reply within 24 hours</p>
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <h2 className="text-2xl md:text-3xl text-secondary mb-8 font-semibold">Send Us a Message</h2>
          <form onSubmit={handleSubmit} className="mb-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label htmlFor="name" className="block text-base font-medium text-[#333] mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-lg text-base transition-colors focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-base font-medium text-[#333] mb-2">
                  Your Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-lg text-base transition-colors focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-5">
              <label htmlFor="subject" className="block text-base font-medium text-[#333] mb-2">
                Subject *
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Enter subject"
                className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-lg text-base transition-colors focus:outline-none focus:border-primary"
              />
            </div>

            <div className="mb-5">
              <label htmlFor="message" className="block text-base font-medium text-[#333] mb-2">
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="6"
                placeholder="Enter your message"
                className="w-full px-4 py-3 border-2 border-[#e0e0e0] rounded-lg text-base transition-colors resize-y min-h-[120px] focus:outline-none focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-br from-secondary to-[#b84535] text-white py-4 text-lg font-semibold rounded-lg hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all duration-300"
            >
              Send Message
            </button>
          </form>

          <div className="text-center pt-8 border-t-2 border-[#f0f0f0]">
            <h3 className="text-xl md:text-2xl text-secondary mb-5 font-semibold">Follow Us</h3>
            <div className="flex justify-center gap-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
              >
                <FaFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-xl md:text-2xl transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)]"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto my-16 px-5 pb-16">
        <h2 className="text-2xl md:text-3xl text-secondary mb-8 text-center font-semibold">
          Find Us On Map
        </h2>
        <div className="rounded-xl overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.08)]">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.71637023539678!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

export default Contact;
