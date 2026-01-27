import React from 'react';

const AboutUs = () => {
  return (
    <div className="w-full bg-[#fef8f5]">
      <div className="bg-gradient-to-br from-primary to-secondary text-white text-center py-20 px-5 mb-16">
        <h1 className="text-3xl md:text-5xl mb-4 font-bold">About Creative Amour</h1>
        <p className="text-xl md:text-2xl font-light mt-2.5 opacity-95">
          Crafting Beauty, Creating Memories
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-5 pb-16">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
          <div>
            <h2 className="text-3xl md:text-4xl text-secondary mb-5 font-semibold">Our Story</h2>
            <p className="text-lg leading-loose text-[#555] mb-4">
              Welcome to Creative Amour, where passion meets craftsmanship. Founded with a vision to bring 
              unique, handcrafted items to discerning customers, we specialize in creating beautiful jewelry, 
              paintings, and wall art that add a personal touch to your life and home.
            </p>
            <p className="text-lg leading-loose text-[#555] mb-4">
              Every piece in our collection is carefully crafted by skilled artisans who pour their heart 
              and soul into their work. We believe that handmade items carry a special energy and uniqueness 
              that mass-produced items simply cannot match.
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=600&h=400&fit=crop" 
              alt="Artisan at work" 
              className="w-full h-96 object-cover rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center mb-20">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=600&h=400&fit=crop" 
              alt="Beautiful handcrafted items" 
              className="w-full h-96 object-cover rounded-xl shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
            />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl text-secondary mb-5 font-semibold">Our Mission</h2>
            <p className="text-lg leading-loose text-[#555] mb-4">
              At Creative Amour, our mission is to connect talented artisans with customers who appreciate 
              quality, creativity, and authenticity. We strive to provide a platform where handmade art 
              thrives and where every purchase supports local craftsmanship.
            </p>
            <p className="text-lg leading-loose text-[#555] mb-4">
              We are committed to sustainable practices, fair pricing, and ensuring that every customer 
              receives not just a product, but a piece of art that tells a story.
            </p>
          </div>
        </section>

        <section className="my-20 text-center">
          <h2 className="text-3xl md:text-4xl text-secondary mb-12 font-semibold">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
            <div className="bg-white p-10 px-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="text-5xl mb-5">🎨</div>
              <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Creativity</h3>
              <p className="text-base text-[#666] leading-relaxed">
                We celebrate unique designs and innovative craftsmanship in every piece we offer.
              </p>
            </div>
            <div className="bg-white p-10 px-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="text-5xl mb-5">✋</div>
              <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Handcrafted Quality</h3>
              <p className="text-base text-[#666] leading-relaxed">
                Every item is meticulously handmade with attention to detail and quality materials.
              </p>
            </div>
            <div className="bg-white p-10 px-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="text-5xl mb-5">🌱</div>
              <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Sustainability</h3>
              <p className="text-base text-[#666] leading-relaxed">
                We prioritize eco-friendly materials and sustainable production methods.
              </p>
            </div>
            <div className="bg-white p-10 px-6 rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.15)]">
              <div className="text-5xl mb-5">❤️</div>
              <h3 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Customer Love</h3>
              <p className="text-base text-[#666] leading-relaxed">
                Your satisfaction is our priority. We're here to help you find the perfect piece.
              </p>
            </div>
          </div>
        </section>

        <section className="my-20">
          <h2 className="text-3xl md:text-4xl text-secondary mb-10 text-center font-semibold">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-lg border-l-4 border-primary shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
              <h4 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Unique Designs</h4>
              <p className="text-base text-[#666] leading-relaxed">
                No two pieces are exactly alike. Each item is one-of-a-kind or made in limited quantities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-l-4 border-primary shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
              <h4 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Quality Materials</h4>
              <p className="text-base text-[#666] leading-relaxed">
                We use only premium materials including sterling silver, gold plating, and high-quality canvas.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-l-4 border-primary shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
              <h4 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Customization Available</h4>
              <p className="text-base text-[#666] leading-relaxed">
                Many of our products can be customized to match your preferences and style.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg border-l-4 border-primary shadow-[0_3px_10px_rgba(0,0,0,0.08)]">
              <h4 className="text-xl md:text-2xl text-secondary mb-3 font-semibold">Fast Shipping</h4>
              <p className="text-base text-[#666] leading-relaxed">
                We carefully package and ship your items with care to ensure they arrive safely.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
