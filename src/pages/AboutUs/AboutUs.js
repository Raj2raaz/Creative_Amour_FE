import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Creative Amour</h1>
        <p className="about-tagline">Crafting Beauty, Creating Memories</p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <div className="about-text">
            <h2>Our Story</h2>
            <p>
              Welcome to Creative Amour, where passion meets craftsmanship. Founded with a vision to bring 
              unique, handcrafted items to discerning customers, we specialize in creating beautiful jewelry, 
              paintings, and wall art that add a personal touch to your life and home.
            </p>
            <p>
              Every piece in our collection is carefully crafted by skilled artisans who pour their heart 
              and soul into their work. We believe that handmade items carry a special energy and uniqueness 
              that mass-produced items simply cannot match.
            </p>
          </div>
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop" 
              alt="Artisan at work" 
            />
          </div>
        </section>

        <section className="about-section reverse">
          <div className="about-image">
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop" 
              alt="Beautiful handcrafted items" 
            />
          </div>
          <div className="about-text">
            <h2>Our Mission</h2>
            <p>
              At Creative Amour, our mission is to connect talented artisans with customers who appreciate 
              quality, creativity, and authenticity. We strive to provide a platform where handmade art 
              thrives and where every purchase supports local craftsmanship.
            </p>
            <p>
              We are committed to sustainable practices, fair pricing, and ensuring that every customer 
              receives not just a product, but a piece of art that tells a story.
            </p>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🎨</div>
              <h3>Creativity</h3>
              <p>We celebrate unique designs and innovative craftsmanship in every piece we offer.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✋</div>
              <h3>Handcrafted Quality</h3>
              <p>Every item is meticulously handmade with attention to detail and quality materials.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌱</div>
              <h3>Sustainability</h3>
              <p>We prioritize eco-friendly materials and sustainable production methods.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">❤️</div>
              <h3>Customer Love</h3>
              <p>Your satisfaction is our priority. We're here to help you find the perfect piece.</p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2>Why Choose Us?</h2>
          <div className="why-choose-grid">
            <div className="choose-item">
              <h4>Unique Designs</h4>
              <p>No two pieces are exactly alike. Each item is one-of-a-kind or made in limited quantities.</p>
            </div>
            <div className="choose-item">
              <h4>Quality Materials</h4>
              <p>We use only premium materials including sterling silver, gold plating, and high-quality canvas.</p>
            </div>
            <div className="choose-item">
              <h4>Customization Available</h4>
              <p>Many of our products can be customized to match your preferences and style.</p>
            </div>
            <div className="choose-item">
              <h4>Fast Shipping</h4>
              <p>We carefully package and ship your items with care to ensure they arrive safely.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
