import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Ruzaika',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'Siraj',
      email: 'user@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      // _id: '1',
      name: 'Galaxy A03',
      slug: 'galaxy-a03',
      category: 'Smartphones',
      image: '/images/p1.jpg', // 280px x 280px
      price: 39990,
      countInStock: 5,
      brand: 'Samsung',
      rating: 4.5,
      numReviews: 6,
      description:
        '6.5” Display, 48 MP Camera, Octa-core Processor, 5000mAh Battery, With 06 Months Shop Warranty.',
    },
    {
      // _id: '2',
      name: 'Galaxy A03 Core',
      slug: 'galaxy-a03-core',
      category: 'Smartphones',
      image: '/images/p2.jpg',
      price: 41990,
      countInStock: 0,
      brand: 'Samsung',
      rating: 4.6,
      numReviews: 10,
      description:
        'Infinity – V Display 16.55cm (6.5″), Octa-core Processor, 5000mAh Battery, Main camera 8MP, Front Camera 5MP, With 2GB RAM + 32GB ROM, With 01 Year Company Warranty.',
    },
    {
      // _id: '3',
      name: 'Galaxy A13',
      slug: 'galaxy-a13',
      category: 'Smartphones',
      image: '/images/p3.jpg',
      price: 59990,
      countInStock: 2,
      brand: 'Samsung',
      rating: 4.9,
      numReviews: 12,
      description:
        '6.6-inch Infinity-V Display, Mobile photography with quad camera, Capture smaller details with a macro camera, Front camera, stylish selfies, An awesome battery that lasts two days, With 06 Months Shop Warranty.',
    },
    {
      // _id: '4',
      name: 'Galaxy A23',
      slug: 'galaxy-a23',
      category: 'Smartphones',
      image: '/images/p4.jpg',
      price: 77990,
      countInStock: 1,
      brand: 'Samsung',
      rating: 0.0,
      numReviews: 2,
      description:
        '6.6″ FHD+ Display for Immersive Viewing Experience, Multi Role Quad Rear Camera with 50MP OIS main camera, 5,000mAh Long Lasting Battery for All Day Usage with 25W Fast Charging, 6GB RAM + 128GB ROM, With 06 Months Warranty.',
    },
  ],
};
export default data;
