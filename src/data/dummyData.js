// Dummy data for development and testing

export const dummyCategories = [
  {
    _id: '1',
    name: 'Earrings',
    description: 'Handcrafted earrings with unique designs',
    image: {
      url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop'
    }
  },
  {
    _id: '2',
    name: 'Paintings',
    description: 'Beautiful paintings for your home',
    image: {
      url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=300&fit=crop'
    }
  },
  {
    _id: '3',
    name: 'Necklaces',
    description: 'Elegant handcrafted necklaces',
    image: {
      url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop'
    }
  },
  {
    _id: '4',
    name: 'Wall Art',
    description: 'Artistic wall decorations',
    image: {
      url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=400&h=300&fit=crop'
    }
  }
];

export const dummyProducts = [
  {
    _id: '1',
    name: 'Rose Gold Hoop Earrings',
    description: 'Elegant rose gold plated hoop earrings with intricate detailing. Perfect for everyday wear or special occasions.',
    price: 1299,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop' }
    ],
    rating: 4.5,
    numReviews: 23,
    stock: 15,
    isFeatured: true,
    customizationOptions: ['Size', 'Color']
  },
  {
    _id: '2',
    name: 'Abstract Canvas Painting',
    description: 'A vibrant abstract painting on canvas. Brings life and color to any room. Hand-painted with acrylics.',
    price: 3499,
    category: {
      _id: '2',
      name: 'Paintings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=500&h=500&fit=crop' }
    ],
    rating: 5.0,
    numReviews: 45,
    stock: 5,
    isFeatured: true,
    customizationOptions: ['Size', 'Frame']
  },
  {
    _id: '3',
    name: 'Silver Stud Earrings',
    description: 'Classic silver stud earrings with crystal stones. Timeless and versatile design.',
    price: 899,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&h=500&fit=crop' }
    ],
    rating: 4.8,
    numReviews: 67,
    stock: 25,
    isFeatured: true,
    customizationOptions: []
  },
  {
    _id: '4',
    name: 'Floral Dangle Earrings',
    description: 'Handcrafted floral design dangle earrings with colorful beads. Lightweight and comfortable.',
    price: 1599,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop' }
    ],
    rating: 4.3,
    numReviews: 34,
    stock: 18,
    isFeatured: false,
    customizationOptions: ['Color']
  },
  {
    _id: '5',
    name: 'Sunset Landscape Painting',
    description: 'Beautiful sunset landscape painting with warm colors. Perfect for living room or bedroom.',
    price: 4999,
    category: {
      _id: '2',
      name: 'Paintings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=500&h=500&fit=crop' }
    ],
    rating: 4.9,
    numReviews: 28,
    stock: 3,
    isFeatured: true,
    customizationOptions: ['Size', 'Frame']
  },
  {
    _id: '6',
    name: 'Geometric Drop Earrings',
    description: 'Modern geometric design drop earrings. Made with brass and gold plating.',
    price: 1199,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=500&h=500&fit=crop' }
    ],
    rating: 4.6,
    numReviews: 19,
    stock: 20,
    isFeatured: false,
    customizationOptions: ['Color']
  },
  {
    _id: '7',
    name: 'Ocean Wave Necklace',
    description: 'Delicate ocean wave pendant necklace. Sterling silver chain with blue enamel.',
    price: 2299,
    category: {
      _id: '3',
      name: 'Necklaces'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=500&h=500&fit=crop' }
    ],
    rating: 4.7,
    numReviews: 41,
    stock: 12,
    isFeatured: true,
    customizationOptions: ['Chain Length']
  },
  {
    _id: '8',
    name: 'Botanical Wall Art',
    description: 'Minimalist botanical line art print. Black ink on white canvas.',
    price: 1999,
    category: {
      _id: '4',
      name: 'Wall Art'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?w=500&h=500&fit=crop' }
    ],
    rating: 4.4,
    numReviews: 15,
    stock: 30,
    isFeatured: false,
    customizationOptions: ['Size']
  },
  {
    _id: '9',
    name: 'Pearl Drop Earrings',
    description: 'Elegant freshwater pearl drop earrings. Gold-filled hooks for sensitive ears.',
    price: 1799,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1617038220319-276d3cfab638?w=500&h=500&fit=crop' }
    ],
    rating: 4.9,
    numReviews: 52,
    stock: 8,
    isFeatured: true,
    customizationOptions: []
  },
  {
    _id: '10',
    name: 'Mountain Vista Painting',
    description: 'Majestic mountain landscape painting with snow-capped peaks. Oil on canvas.',
    price: 5999,
    category: {
      _id: '2',
      name: 'Paintings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&h=500&fit=crop' }
    ],
    rating: 5.0,
    numReviews: 37,
    stock: 2,
    isFeatured: true,
    customizationOptions: ['Size', 'Frame']
  },
  {
    _id: '11',
    name: 'Tassel Hoop Earrings',
    description: 'Bohemian style hoop earrings with colorful tassels. Lightweight and fun.',
    price: 1099,
    category: {
      _id: '1',
      name: 'Earrings'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1596944924591-4ccfe9bb1453?w=500&h=500&fit=crop' }
    ],
    rating: 4.2,
    numReviews: 26,
    stock: 22,
    isFeatured: false,
    customizationOptions: ['Color']
  },
  {
    _id: '12',
    name: 'Mandala Wall Art',
    description: 'Intricate mandala design wall art. Hand-drawn and digitally enhanced.',
    price: 2499,
    category: {
      _id: '4',
      name: 'Wall Art'
    },
    images: [
      { url: 'https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=500&h=500&fit=crop' }
    ],
    rating: 4.6,
    numReviews: 31,
    stock: 14,
    isFeatured: false,
    customizationOptions: ['Size', 'Color']
  }
];

export const getFeaturedProducts = () => {
  return dummyProducts.filter(product => product.isFeatured);
};

export const getProductsByCategory = (categoryId) => {
  if (!categoryId) return dummyProducts;
  return dummyProducts.filter(product => product.category._id === categoryId);
};

export const getProductById = (id) => {
  return dummyProducts.find(product => product._id === id);
};
