'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, Star, Filter, X } from 'lucide-react';

type Category = 'all' | 'dice' | 'terrain' | 'cosplay' | 'accessories';

// Unsplash photo IDs — free to use, no API key needed via images.unsplash.com
const products = [
  // ── Dice ──────────────────────────────────────────────────────────────────
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
    image: 'https://images.unsplash.com/photo-1585504198199-20277593b94f?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Green glowing polyhedral dice set',
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
    image: 'https://images.unsplash.com/photo-1606503153255-59d5e417b6fd?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Metal polyhedral dice set on dark surface',
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
    image: 'https://images.unsplash.com/photo-1611328799568-f01f92439b3e?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Wooden dice storage vault open showing dice inside',
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
    image: 'https://images.unsplash.com/photo-1559703248-dcaaec9fab78?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Large spherical die with many facets',
  },
  // ── Terrain ──────────────────────────────────────────────────────────────
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
    image: 'https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Miniature wargame terrain with post-apocalyptic ruined buildings',
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
    image: 'https://images.unsplash.com/photo-1608306448197-e83633f1261c?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Glowing miniature reactor terrain piece on a gaming table',
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
    image: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Miniature model trees for tabletop gaming terrain',
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
    image: 'https://images.unsplash.com/photo-1633959680886-571db7851285?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Stone-textured dungeon floor tiles laid out for a D&D game',
  },
  // ── Cosplay ──────────────────────────────────────────────────────────────
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
    image: 'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Fantasy elf cosplay costume accessories',
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
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'LARP foam sword with silver and black finish',
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
    image: 'https://images.unsplash.com/photo-1589652717521-10c0d092dea9?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Post-apocalyptic cosplay gauntlet props with weathered finish',
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
    image: 'https://images.unsplash.com/photo-1596003906949-67221c37965c?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Dragon scale fantasy armor bracers for cosplay',
  },
  // ── Accessories ───────────────────────────────────────────────────────────
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
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Leatherette dice rolling tray with embossed design',
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
    image: 'https://images.unsplash.com/photo-1553481187-be93c21490a9?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Dungeon master screen standing on a gaming table',
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
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Dark leather-bound notebook journal for tabletop RPG campaigns',
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
    image: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=600&h=400&fit=crop&auto=format',
    imageAlt: 'Neoprene battle mat with grid for miniature wargaming',
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
  const [cartOpen, setCartOpen] = useState(false);
  const [quickView, setQuickView] = useState<typeof products[0] | null>(null);

  const filtered = activeCategory === 'all' ? products : products.filter(p => p.category === activeCategory);
  const cartItems = cart.map(id => products.find(p => p.id === id)!).filter(Boolean);
  const cartTotal = cartItems.reduce((sum, p) => sum + p.price, 0);

  const addToCart = (id: number) => setCart(prev => [...prev, id]);
  const removeFromCart = (idx: number) => setCart(prev => prev.filter((_, i) => i !== idx));

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

        {/* Cart button */}
        <button
          onClick={() => setCartOpen(true)}
          className="panel"
          style={{ padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', background: 'transparent', border: '1px solid rgba(57,255,20,0.2)', fontFamily: 'Courier New, monospace', color: '#c8f5c2', fontSize: '0.9rem', position: 'relative' }}
        >
          <ShoppingCart size={18} style={{ color: '#39ff14' }} />
          Cart
          {cart.length > 0 && (
            <span style={{ background: '#39ff14', color: '#050a05', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 900 }}>
              {cart.length}
            </span>
          )}
        </button>
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
        <span style={{ color: '#4a6b4a', fontSize: '0.8rem', marginLeft: 'auto' }}>
          {filtered.length} products
        </span>
      </div>

      {/* Product grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
        {filtered.map(product => (
          <div
            key={product.id}
            className="panel panel-hover"
            style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}
          >
            {/* Badge */}
            {product.badge && (
              <div style={{
                position: 'absolute',
                top: '0.75rem',
                left: '0.75rem',
                zIndex: 2,
                background: product.badgeColor === '#39ff14' ? '#39ff14' : product.badgeColor,
                color: '#050a05',
                padding: '0.2rem 0.6rem',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {product.badge}
              </div>
            )}

            {/* Product image */}
            <div
              style={{ position: 'relative', width: '100%', height: '200px', cursor: 'pointer', overflow: 'hidden' }}
              onClick={() => setQuickView(product)}
            >
              <Image
                src={product.image}
                alt={product.imageAlt}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover', transition: 'transform 0.4s ease', filter: 'brightness(0.85) saturate(0.9)' }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
              />
              {/* Overlay tint */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,10,5,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', bottom: '0.5rem', right: '0.75rem', fontSize: '0.65rem', color: 'rgba(57,255,20,0.7)', letterSpacing: '0.1em' }}>
                QUICK VIEW
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.6rem', flexGrow: 1 }}>
              <h3 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '0.95rem', lineHeight: 1.3, margin: 0 }}>
                {product.name}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <StarRating rating={product.rating} />
                <span style={{ color: '#4a6b4a', fontSize: '0.7rem' }}>({product.reviews})</span>
              </div>

              <p style={{ color: '#7ab87a', fontSize: '0.82rem', lineHeight: 1.5, margin: 0, flexGrow: 1 }}>
                {product.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ fontSize: '0.65rem', color: '#4a6b4a', border: '1px solid rgba(57,255,20,0.15)', padding: '0.1rem 0.4rem' }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Price + CTA */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.75rem', borderTop: '1px solid rgba(57,255,20,0.1)', marginTop: 'auto' }}>
                <span style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.2rem' }}>
                  ${product.price.toFixed(2)}
                </span>
                <button
                  className="btn-secondary"
                  onClick={() => addToCart(product.id)}
                  style={{ fontSize: '0.75rem', padding: '0.35rem 0.75rem' }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Custom order CTA */}
      <div className="warning-stripe panel" style={{ marginTop: '3rem', padding: '2.5rem', textAlign: 'center', borderColor: 'rgba(57,255,20,0.3)' }}>
        <h3 style={{ color: '#39ff14', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.75rem' }}>
          Need something custom?
        </h3>
        <p style={{ color: '#7ab87a', maxWidth: '500px', margin: '0 auto 1.5rem', fontSize: '0.9rem', lineHeight: 1.6 }}>
          We build custom terrain, commission cosplay props, and source specialty dice sets.
          Talk to us about your project.
        </p>
        <a href="mailto:play@criticalmass.games" className="btn-primary">
          <span>Request a Custom Order</span>
        </a>
      </div>

      {/* ── Cart Drawer ───────────────────────────────────────────────────── */}
      {cartOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200 }}>
          {/* Backdrop */}
          <div
            onClick={() => setCartOpen(false)}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }}
          />

          {/* Drawer */}
          <div style={{
            position: 'absolute', top: 0, right: 0, bottom: 0, width: '360px', maxWidth: '100vw',
            background: '#0a1a0a', borderLeft: '1px solid rgba(57,255,20,0.3)',
            display: 'flex', flexDirection: 'column', padding: '1.5rem', overflowY: 'auto',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <div className="rad-badge" style={{ marginBottom: '0.4rem' }}>Your Cart</div>
                <span style={{ color: '#7ab87a', fontSize: '0.85rem' }}>{cart.length} item{cart.length !== 1 ? 's' : ''}</span>
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', color: '#7ab87a', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 0', color: '#4a6b4a' }}>
                <ShoppingCart size={40} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
                <p>Your cart is empty</p>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flexGrow: 1 }}>
                  {cartItems.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', borderBottom: '1px solid rgba(57,255,20,0.1)', paddingBottom: '1rem' }}>
                      <div style={{ position: 'relative', width: '60px', height: '60px', flexShrink: 0 }}>
                        <Image src={item.image} alt={item.imageAlt} fill style={{ objectFit: 'cover' }} sizes="60px" />
                      </div>
                      <div style={{ flexGrow: 1 }}>
                        <div style={{ color: '#c8f5c2', fontSize: '0.85rem', fontWeight: 600 }}>{item.name}</div>
                        <div style={{ color: '#39ff14', fontSize: '0.9rem', fontWeight: 700 }}>${item.price.toFixed(2)}</div>
                      </div>
                      <button onClick={() => removeFromCart(idx)} style={{ background: 'none', border: 'none', color: '#4a6b4a', cursor: 'pointer' }}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid rgba(57,255,20,0.2)', paddingTop: '1rem', marginTop: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <span style={{ color: '#7ab87a' }}>Subtotal</span>
                    <span style={{ color: '#39ff14', fontWeight: 700, fontSize: '1.1rem' }}>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ background: 'rgba(57,255,20,0.05)', border: '1px solid rgba(57,255,20,0.2)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.8rem', color: '#7ab87a', lineHeight: 1.5 }}>
                    ⚠ Online checkout coming soon. To purchase, visit us in-store or email us your order at <strong style={{ color: '#39ff14' }}>play@criticalmass.games</strong>
                  </div>
                  <a
                    href={`mailto:play@criticalmass.games?subject=Order Request&body=Hi! I'd like to order the following items:%0A%0A${cartItems.map(i => `- ${i.name} ($${i.price.toFixed(2)})`).join('%0A')}%0A%0ASubtotal: $${cartTotal.toFixed(2)}`}
                    className="btn-primary"
                    style={{ display: 'block', textAlign: 'center', width: '100%' }}
                  >
                    <span>Email This Order</span>
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ── Quick View Modal ──────────────────────────────────────────────── */}
      {quickView && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div onClick={() => setQuickView(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)' }} />
          <div style={{
            position: 'relative', background: '#0a1a0a', border: '1px solid rgba(57,255,20,0.4)',
            maxWidth: '600px', width: '100%', zIndex: 1, overflow: 'hidden',
            boxShadow: '0 0 60px rgba(57,255,20,0.15)',
          }}>
            {/* Image */}
            <div style={{ position: 'relative', height: '260px' }}>
              <Image src={quickView.image} alt={quickView.imageAlt} fill style={{ objectFit: 'cover', filter: 'brightness(0.8) saturate(0.85)' }} sizes="600px" />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,26,10,0.95) 0%, transparent 60%)' }} />
              <button
                onClick={() => setQuickView(null)}
                style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(57,255,20,0.3)', color: '#c8f5c2', cursor: 'pointer', padding: '0.3rem', display: 'flex', borderRadius: '2px' }}
              >
                <X size={16} />
              </button>
              {quickView.badge && (
                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: quickView.badgeColor, color: '#050a05', padding: '0.2rem 0.6rem', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.1em' }}>
                  {quickView.badge}
                </div>
              )}
            </div>

            <div style={{ padding: '1.5rem' }}>
              <h2 style={{ color: '#c8f5c2', fontWeight: 700, fontSize: '1.2rem', marginBottom: '0.5rem' }}>{quickView.name}</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                <StarRating rating={quickView.rating} />
                <span style={{ color: '#4a6b4a', fontSize: '0.75rem' }}>({quickView.reviews} reviews)</span>
              </div>
              <p style={{ color: '#7ab87a', lineHeight: 1.7, marginBottom: '1rem', fontSize: '0.9rem' }}>{quickView.description}</p>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                {quickView.tags.map(t => (
                  <span key={t} style={{ fontSize: '0.7rem', color: '#4a6b4a', border: '1px solid rgba(57,255,20,0.2)', padding: '0.15rem 0.5rem' }}>{t}</span>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#39ff14', fontWeight: 900, fontSize: '1.4rem' }}>${quickView.price.toFixed(2)}</span>
                <button
                  className="btn-primary"
                  onClick={() => { addToCart(quickView.id); setQuickView(null); setCartOpen(true); }}
                >
                  <span>Add to Cart</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
