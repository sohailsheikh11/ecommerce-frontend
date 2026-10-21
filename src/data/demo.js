// Placeholder content for the landing page. Swap for real data / assets later.
const u = (id, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`

export const heroImage = u('1529139574466-a303027c1d8b', 1400)

export const categories = [
  { name: 'Men', count: '150+', image: u('1507679799987-c73779587ccf', 400) },
  { name: 'Women', count: '180+', image: u('1469334031218-e382a71b716b', 400) },
  { name: 'Shoes', count: '120+', image: u('1491553895911-0055eca6402d', 400) },
  { name: 'Bags', count: '80+', image: u('1584917865442-de89df76afd3', 400) },
  { name: 'Watches', count: '45+', image: u('1523275335684-37898b6baf30', 400) },
  { name: 'Accessories', count: '200+', image: u('1511499767150-a48a237f0083', 400) },
]

export const promos = [
  {
    tag: 'SUMMER SALE',
    title: 'Up to 50% Off',
    sub: 'On selected items',
    cta: 'Shop Now',
    to: '/shop',
    image: u('1548036328-c9fa89d128fa', 900),
    tone: 'bg-[#E8E2D5]',
  },
  {
    tag: 'NEW ARRIVALS',
    title: 'Discover The Latest Trends',
    sub: 'Fresh pieces, just landed',
    cta: 'Explore Now',
    to: '/shop',
    image: u('1572635196237-14b3f281503f', 900),
    tone: 'bg-[#DED7C8]',
  },
]

export const trending = [
  { id: 'd1', name: 'Classic Sunglasses', category: 'Accessories', price: 79, discount: 20, image_url: u('1511499767150-a48a237f0083'), demo: true },
  { id: 'd2', name: 'White Sneakers', category: 'Shoes', price: 119, badge: 'Hot', image_url: u('1491553895911-0055eca6402d'), demo: true },
  { id: 'd3', name: 'Minimalist Watch', category: 'Watches', price: 149, discount: 15, image_url: u('1523170335258-f5ed11844a49'), demo: true },
  { id: 'd4', name: 'Leather Bag', category: 'Bags', price: 189, badge: 'Hot', image_url: u('1566150905458-1bf1fc113f0d'), demo: true },
  { id: 'd5', name: 'Round Eyewear', category: 'Accessories', price: 69, discount: 10, image_url: u('1573408301185-9146fe634ad0'), demo: true },
]
