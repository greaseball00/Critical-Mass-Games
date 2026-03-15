'use client';

import { useState } from 'react';
import { ShoppingCart, Star, Filter } from 'lucide-react';

type Category = 'all' | 'dice' | 'terrain' | 'cosplay' | 'accessories';

const products = [
  // Dice
  {
    id: 1,
    name: 'Critical Mass Signature Set',
    category: 'dice' as Category,
    price: 34.99,
    rating: 5,
    reviews: 42,
    badge: 'House Exclusive',
    badgeColor: '#39ff14',
    description: '7-piece resin set with radioactive green swirl and glowing pip inlays. UV reactive.',
    tags: ['UV Reactive', 'Resin', '7-piece'],
  },
  {
    id: 2,
    name: 'Meltdown Metal Dice Set',
    category: 'dice' as Category,
    price: 54.99,
    rating: 5,
    reviews: 28,
    badge: 'Best Seller',
    badgeColor: '#ffd700',
    description: 'Solid zinc alloy with nuclear hazard engraving. Weighted for true balance.',
    tags: ['Metal', 'Zinc Alloy', 'Balanced'],
  },
  {
    id: 3,
    name: 'Cascade Dice Vault',
    category: 'dice' as Category,
    price: 19.99,
    rating: 4,
    reviews: 15,
    badge: null,
    badgeColor: '',
    description: 'Magnetic snap-close wooden vault. Laser-engraved Critical Mass hazard logo.',
    tags: ['Storage', 'Wood', 'Magnetic'],
  },
  {
    id: 4,
    name: 'D100 Percentile Sphere',
    category: 'dice' as Category,
    price: 22.99,
    rating: 4,
    reviews: 9,
    badge: null,
    badgeColor: '',
    description: 'Giant d100 sphere die — truly random, deeply satisfying. 60mm diameter.',
    tags: ['d100', 'Giant', 'Resin'],
  },
  // Terrain
  {
    id: 5,
    name: 'Irradiated Wasteland Set',
    category: 'terrain' as Category,
    price: 89.99,
    rating: 5,
    reviews: 17,
    badge: 'Local Craft',
    badgeColor: '#39ff14',
    description: 'Hand-painted ruined buildings, barrels, and scatter terrain. 28mm scale. Ready to play.',
    tags: ['28mm', 'Hand-Painted', '12 pieces'],
  },
  {
    id: 6,
    name: 'Reactor Core Centerpiece',
    category: 'terrain' as Category,
    price: 49.99,
    rating: 5,
    reviews: 22,
    badge: 'Fan Fave',
    badgeColor: '#a78bfa',
    description: 'Glowing LED reactor core terrain piece. Battery-powered, fits any sci-fi or post-apoc table.',
    tags: ['LED', 'Sci-Fi', 'Centerpiece'],
  },
  {
    id: 7,
    name: 'Forest Biome Pack — 20 Trees',
    category: 'terrain' as Category,
    price: 39.99,
    rating: 4,
    reviews: 11,
    badge: null,
    badgeColor: '',
    description: 'Mixed pine and deciduous flocked trees in two sizes. Works for fantasy, historical, modern.',
    tags: ['Fantasy', 'Historical', '20 pieces'],
  },
  {
    id: 8,
    name: 'Dungeon Tile Mega Pack',
    category: 'terrain' as Category,
    price: 64.99,
    rating: 5,
    reviews: 33,
    badge: 'New Arrival',
    badgeColor: '#60a5fa',
    description: 'Interlocking dungeon floor tiles — 60 pieces, stone texture, compatible with 1-inch grid.',
    tags: ['Dungeon', 'Interlocking', '60 pieces'],
  },
  // Cosplay
  {
    id: 9,
    name: 'Elven Archer Ear Set',
    category: 'cosplay' as Category,
    price: 16.99,
    rating: 4,
    reviews: 24,
    badge: null,
    badgeColor: '',
    description: 'Flexible silicone pointy ears. Skin-tone options available. Comfortable all-day wear.',
    tags: ['Ears', 'Silicone', 'Fantasy'],
  },
  {
    id: 10,
    name: 'Foam Sword — Bastard Sword',
    category: 'cosplay' as Category,
    price: 28.99,
    rating: 5,
    reviews: 41,
    badge: 'Best Seller',
    badgeColor: '#ffd700',
    description: 'LARP-safe fiberglass core foam sword. 44 inches, silver and black finish. LARP rated.',
    tags: ['LARP', 'Foam', 'Safe'],
  },
  {
    id: 11,
    name: 'Radiation Hazmat Gauntlets',
    category: 'cosplay' as Category,
    price: 44.99,
    rating: 4,
    reviews: 7,
    badge: 'House Exclusive',
    badgeColor: '#39ff14',
    description: 'Prop hazmat gloves with realistic weathering. Perfect for post-apoc cosplay and photo shoots.',
    tags: ['Post-Apoc', 'Weathered', 'Prop'],
  },
  {
    id: 12,
    name: 'Dragon Scale Bracers — Pair',
    category: 'cosplay' as Category,
    price: 36.99,
    rating: 5,
    reviews: 18,
    badge: null,
    badgeColor: '',
    description: 'Vacuum-formed plastic dragon scale bracers. Three color options. Adjustable straps.',
    tags: ['Fantasy', 'Dragon', 'Adjustable'],
  },
  // Accessories
  {
    id: 13,
    name: 'Rolling Tray — Hazard Edition',
    category: 'accessories' as Category,
    price: 24.99,
    rating: 5,
    reviews: 38,
    badge: 'House Exclusive',
    badgeColor: '#39ff14',
    description: 'Leatherette rolling tray with nuclear hazard emboss. Foldable, with magnetic closure.',
    tags: ['Rolling Tray', 'Leatherette', 'Foldable'],
  },
  {
    id: 14,
    name: 'DM Screen — Tactical Panel',
    category: 'accessories' as Category,
    price: 32.99,
    rating: 5,
    reviews: 21,
    badge: null,
    badgeColor: '',
    description: 'Landscape DM screen, sturdy cardstock, system-agnostic reference panels. Dry-erase coating.',
    tags: ['DM Screen', 'Dry-Erase', 'System-Agnostic'],
  },
  {
    id: 15,
    name: 'Campaign Journal — Irradiated',
    category: 'accessories' as Category,
    price: 18.99,
    rating: 4,
    reviews: 12,
    badge: 'New Arrival',
    badgeColor: '#60a5fa',
    description: 'A5 dot-grid journal with themed cover and character sheet inserts. 200 pages.',
    tags: ['Journal', 'A5', 'Character Sheets'],
  },
  {
    id: 16,
    name: 'Battle Mat — 3x3 Neoprene',
    category: 'accessories' as Category,
    price: 44.99,
    rating: 5,
    reviews: 19,
    badge: null,
    badgeColor: '',
    description: 'Neoprene battle mat, hex and square grid on opposite sides. Non-slip base, dry/wet-erase.',
    tags: ['Battle Mat', 'Neoprene', 'Double-Sided'],
  },
];

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Products' },
  { key: 'dice', label: 'Dice' },
  { key: 'terrain', label: 'Terrain' },
  { key: 'cosplay', label: 'Cosplay Props' },
  { key: 'accessories', label: 'Accessories' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <span style={{ display: 'flex', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map(i => (
        <Star key={i} size={10} fill={i <= rating ? '#ffd700' : 'none'} style={{ color: '#ffd700' }} />
      ))}
    </span>
  );
}

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [cart, setCart] = useState<number[]>([]);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);

  const addToCart = (id: number) => setCart(prev => [...prev, id]);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div className="rad-badge" style={{ marginBottom: '1rem' }}>☢ The Armory</div>
          <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 3rem)', fontWeight: 900, color: '#39ff14', letterSpacing: '0.05em', textTransform: 'uppercase', textShadow: '0 0 20px rgba(57,255,20,0.5)', marginBottom: '0.5rem' }}>
            Shop
          </h1>
          <p style={{ color: '#7ab87a', lineHeight: 1.6 }}>
            Dice, terrain, cosplay props, and accessories. Locally curated, Tri-Cities powered.
          </p>
        </div>

        {/* Cart indicator */}
        <div className="panel" style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer' }}>
          <ShoppingCart size={18} style={{ color: '#39ff14' }} />
          <span style={{ color: '#c8f5c2', fontSize: '0.9rem' }}>Cart</span>
          {cart.length > 0 && (
            <span style={{ background: '#39ff14', color: '#050a05', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>
              {cart.length}
            </span>
          )}
        </div>
      </div>

      {/* Category filter */}
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2.5rem', alignItems: 'center' }}>
        <Filter size={14} style={{ color: '#7ab87a' }} />
        {categories.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            style={{
              padding: '0.4rem 0.9rem',
              fontSize: '0.8rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              border: activeCategory === key ? '1px solid #39ff14' : '1px solid rgba(57,255,20,0.25)',
              background: activeCategory === key ? 'rgba(57,255,20,0.12)' : 'transparent',
              color: activeCategory === key ? '#39ff14' : '#7ab87a',
              cursor: 'pointer',
              transition: 'all 0.2s',
              fontFamily: 'Courier New, monospace',
            }}
          >
            {label}
          </button>
        ))}
        <span style={{ color: '#4a6b4a', fontSize: '0.8rem', marginLeft: 'auto' }}>{filtered.length} products</span>
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
        {filtered.map(product => (
          <div
            key={product.id}
            className="panel panel-hover"
            style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', position: 'relative', overflow: 'hidden' }}
          >
            {/* Badge */}
            {product.badge && (
              <div style={{
                position: 'absolute',
                top: '0',
                right: '0',
                background: product.badgeColor,
                color: product.badgeColor === '#39ff14' ? '#050a05' : '#050a05',
                padding: '0.2rem 0.6rem',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {product.badge}
              </div>
            )}

            {/* Icon placeholder */}
            <div style={{
              height: '100px',
              background: 'rgba(57,255,20,0.04)',
              border: '1px solid rgba(57,255,20,0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              marginTop: product.badge ? '0.75rem' : '0',
            }}>
              {product.category === 'dice' && '🎲'}
              {product.category === 'terrain' && '🏔'}
              {product.category === 'cosplay' && '⚔️'}
              {product.category === 'accessories' && '🛡️'}
            </div>

            <div>
              <h3 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, marginBottom: '0.3rem' }}>
                {product.name}
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                <StarRating rating={product.rating} />
                <span style={{ color: '#4a6b4a', fontSize: '0.7rem' }}>({product.reviews})</span>
              </div>
              <p style={{ color: '#7ab87a', fontSize: '0.8rem', lineHeight: 1.5 }}>{product.description}</p>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
              {product.tags.map(tag => (
                <span key={tag} style={{ fontSize: '0.65rem', color: '#4a6b4a', border: '1px solid rgba(57,255,20,0.15)', padding: '0.1rem 0.4rem' }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Price + Add to cart */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '0.5rem', borderTop: '1px solid rgba(57,255,20,0.1)' }}>
              <div>
                <span style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.2rem' }}>${product.price.toFixed(2)}</span>
              </div>
              <button
                className="btn-secondary"
                onClick={() => addToCart(product.id)}
                style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Custom order CTA */}
      <div
        className="warning-stripe panel"
        style={{ marginTop: '3rem', padding: '2.5rem', textAlign: 'center', borderColor: 'rgba(57,255,20,0.3)' }}
      >
        <h3 style={{ color: '#39ff14', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Need something custom?
        </h3>
        <p style={{ color: '#7ab87a', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          We build custom terrain, commission cosplay props, and source specialty dice sets. Talk to us about your project.
        </p>
        <a href="mailto:play@criticalmass.games" className="btn-primary">
          <span>Request a Custom Order</span>
        </a>
      </div>
    </div>
  );
}
