-- ==============================================================================
-- TAMRAAYA LUXURY METALCRAFT - SEED DATA SCRIPT
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. CATEGORIES
-- ------------------------------------------------------------------------------
INSERT INTO public.categories (id, name, slug, description, image_url, sort_order)
VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Cookware', 'cookware', 'Traditional heavy-gauge metal vessels engineered for slow heat retention, ayurvedic cooking, and culinary heritage.', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=800&auto=format&fit=crop', 1),
  ('c1000000-0000-0000-0000-000000000002', 'Serveware', 'serveware', 'Hand-hammered platters, serving handis, and vessels that transform gatherings into banquets.', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=800&auto=format&fit=crop', 2),
  ('c1000000-0000-0000-0000-000000000003', 'Tableware', 'tableware', 'Pure bronze (kansa) thalis, bowls, and cutlery shaped with ancestral resonance for wellness and elegance.', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800&auto=format&fit=crop', 3),
  ('c1000000-0000-0000-0000-000000000004', 'Drinkware', 'drinkware', 'Ionized copper carafes, water vessels, and tumblers designed for natural purification and revitalizing hydration.', 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=800&auto=format&fit=crop', 4),
  ('c1000000-0000-0000-0000-000000000005', 'Kitchen Accessories', 'kitchen-accessories', 'Brass ladles, skimmers, spice containers, and measuring brassware celebrating tactile kitchen rituals.', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop', 5),
  ('c1000000-0000-0000-0000-000000000006', 'Gift Sets', 'gift-sets', 'Heirloom gift sets packaged in velvet-lined wooden trunks for weddings, festivities, and monumental milestones.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800&auto=format&fit=crop', 6)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image_url = EXCLUDED.image_url;

-- ------------------------------------------------------------------------------
-- 2. COLLECTIONS
-- ------------------------------------------------------------------------------
INSERT INTO public.collections (id, name, slug, tagline, description, hero_image_url, featured, sort_order)
VALUES
  ('b1000000-0000-0000-0000-000000000001', 'The Artisan''s Collection', 'the-artisans-collection', 'Master hammered masterworks', 'Our flagship series hand-forged by seventh-generation Thathera masters. Every dimple and curve tells a story of patience, flame, and precision.', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1600&auto=format&fit=crop', true, 1),
  ('b1000000-0000-0000-0000-000000000002', 'Heritage Brass', 'heritage-brass', 'Warm golden silhouettes for contemporary kitchens', 'Heavy-gauge cast and spun brass vessels tinned with pure tin (Kalai) for authentic slow-cooked curries and aromatic gravies.', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1600&auto=format&fit=crop', true, 2),
  ('b1000000-0000-0000-0000-000000000003', 'Modern Bronze', 'modern-bronze', 'Bell metal dinner sets infused with therapeutic balance', 'Crafted from pure bronze (78% copper, 22% tin) known in Ayurveda as Kansa — the restorative alloy of sound, taste, and digestion.', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1600&auto=format&fit=crop', true, 3),
  ('b1000000-0000-0000-0000-000000000004', 'Festive Collection', 'festive-collection', 'Luminous metalcraft curated for auspicious celebrations', 'Signature mixed metal sets, etched pooja thalis, and deep-bell serving vessels designed to elevate Diwali and special reunions.', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1600&auto=format&fit=crop', false, 4),
  ('b1000000-0000-0000-0000-000000000005', 'Wedding Gifting', 'wedding-gifting', 'Enduring heirlooms gifted from one generation to the next', 'Custom monogrammed trunks containing comprehensive brass and bronze dining ensembles for celebratory new beginnings.', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1600&auto=format&fit=crop', false, 5)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  description = EXCLUDED.description,
  hero_image_url = EXCLUDED.hero_image_url;

-- ------------------------------------------------------------------------------
-- 3. PRODUCTS
-- ------------------------------------------------------------------------------
INSERT INTO public.products (id, slug, name, short_description, description, category_id, material, finish, status, featured, food_safe, kalai_tinned, care_instructions, story, shipping_info)
VALUES
  (
    'a1000000-0000-0000-0000-000000000001',
    'hammered-brass-handi',
    'Hammered Brass Handi',
    'Iconic slow-cooking brass handi lined with pure food-grade tin (Kalai) for biryanis, gravies, and stews.',
    'Forged from heavy-gauge virgin brass and individually textured with thousands of hand-hammered strikes, this Handi represents the zenith of Indian culinary metalwork. The curved pot belly allows heat to circulate evenly across the base and sidewalls, making it ideal for dum cooking and slow-simmered dishes. The interior is tinned with 99.9% pure food-grade tin (traditional Kalai) by certified heritage tinsmiths, making it 100% safe for acidic and spiced foods.',
    'c1000000-0000-0000-0000-000000000001',
    'Brass',
    'Hand Hammered',
    'published',
    true,
    true,
    true,
    'Wash gently with warm soapy water and a soft cotton cloth. Do not use steel wool or abrasive powders on the tin lining. Retin (Kalai) annually if interior brass begins showing.',
    'Rooted in the royal kitchens of Awadh and Punjab, each handi undergoes 18 hours of continuous beating on an anvil to achieve its uniform density and luminous golden luster.',
    'Complimentary pan-India insured shipping within 4-6 business days. Global white-glove courier delivery available on request.'
  ),
  (
    'a1000000-0000-0000-0000-000000000002',
    'pure-hammered-copper-matka',
    'Pure Hammered Copper Matka',
    'Traditional copper water repository with brass spigot, combining natural antimicrobial wellness with sculptural presence.',
    'A majestic tabletop centerpiece hand-beaten from 99.5% pure solid copper. Following ancient Ayurvedic wisdom of Tamra Jal, water stored in this vessel overnight naturally becomes charged with trace copper ions, balancing the body''s doshas and fostering cellular vitality. Features a precision-machined drip-free solid brass dispensing tap and a tight-fitting crown lid.',
    'c1000000-0000-0000-0000-000000000004',
    'Copper',
    'Hand Hammered',
    'published',
    true,
    true,
    false,
    'Fill with room temperature water only. Clean the exterior with lemon and salt or pitambari paste once every fortnight to preserve the warm copper glow. Rinse interior with water daily.',
    'Copper has been revered in the Indian subcontinent for over five millennia. Our coppersmiths shape each matka from a single sheet of heavy copper without toxic seams.',
    'Dispatched in reinforced custom wooden framing to guarantee zero transit denting. 3-5 business days.'
  ),
  (
    'a1000000-0000-0000-0000-000000000003',
    'traditional-brass-kadai',
    'Traditional Brass Kadai with Tin Lining',
    'Deep curved brass wok with solid riveted handles, engineered for high-heat frying, sautés, and rich gravies.',
    'Every Indian home cherishes the depth of flavor only achievable in a heavy brass kadai. Built with a 3.2mm thick virgin brass core, it provides extraordinary thermal retention that prevents spices from burning while achieving superior caramelization. Lined with sparkling pure tin on the cooking surface and fitted with dual ergonomic cast brass loop handles.',
    'c1000000-0000-0000-0000-000000000001',
    'Brass',
    'Polished',
    'published',
    true,
    true,
    true,
    'Use wooden or silicone spatulas to protect the tin coating. Do not heat dry without oil or water.',
    'Designed after the robust culinary vessels of Rajasthan, this kadai distributes heat with exceptional consistency, reducing cooking time while sealing in essential aromas.',
    'Dispatched within 48 hours. Insured delivery across all Indian pin codes.'
  ),
  (
    'a1000000-0000-0000-0000-000000000004',
    'bronze-kansa-royal-thali-set',
    'Bronze (Kansa) Royal Serving Thali Set',
    'Heirloom 6-piece bell metal dining ensemble designed to promote digestive health and ancestral majesty.',
    'Handcrafted from bell metal alloy (78% copper and 22% tin), known in Sanskrit as Kansa. Ayurvedic texts note that eating from bronze alkalizes food, clarifies the intellect, and purifies the sensory palate. The set comprises an expansive dining thali, two deep katoris, a dessert bowl, an Ayurvedic bronze tumbler, and a hand-forged dessert spoon.',
    'c1000000-0000-0000-0000-000000000003',
    'Bronze',
    'Antique',
    'published',
    true,
    true,
    false,
    'Wash immediately after dining with gentle dish wash and a soft sponge. Dry immediately with a microfiber cloth to prevent water spots.',
    'The unmistakable bell-like acoustic chime when struck confirms the purity of our bronze alloy, hand-poured in small artisanal crucibles.',
    'Arrives in a Tamraaya signature midnight plum presentation box with individual soft cloth sleeves.'
  ),
  (
    'a1000000-0000-0000-0000-000000000005',
    'hammered-copper-water-jug',
    'Hammered Copper Water Jug',
    'Ergonomic pure copper pitcher with contoured pouring spout and cast brass handle.',
    'A contemporary reimagining of the classic Indian Surahi pitcher. With a balanced center of gravity and a sculpted anti-drip spout, this pitcher makes everyday hydration feel like a mindful ceremony. Accompanied by two matching ribbed copper tumblers.',
    'c1000000-0000-0000-0000-000000000004',
    'Copper',
    'Hand Hammered',
    'published',
    false,
    true,
    false,
    'Wipe with a lemon-salt solution to restore shine or allow it to develop a distinguished, living vintage patina.',
    'Meticulously spun on a high-precision wooden lathe and hand-dimpled to increase structural rigidity.',
    'Ships in 2-3 business days in eco-friendly molded pulp packaging.'
  ),
  (
    'a1000000-0000-0000-0000-000000000006',
    'heavy-gauge-brass-saucepan',
    'Heavy Gauge Brass Sauce Pan with Teak Handle',
    'Artisanal tea and sauce boiling pan with insulated hand-carved Indian teak wood handle.',
    'Designed specifically for the sacred daily ritual of brewing fragrant Masala Chai or reduction of rich sauces. The heavy brass body ensures milk heats without sticking or burning at the base, while the ergonomic teak handle stays cool to the touch.',
    'c1000000-0000-0000-0000-000000000001',
    'Brass',
    'Brushed',
    'published',
    false,
    true,
    true,
    'Hand wash with mild liquid soap. Do not soak the wooden handle in water.',
    'A seamless union of brass smithing and traditional wood turning from the forest crafts of Saharanpur.',
    'In stock. Ready for same-day dispatch.'
  )
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  short_description = EXCLUDED.short_description,
  description = EXCLUDED.description,
  material = EXCLUDED.material,
  finish = EXCLUDED.finish,
  status = EXCLUDED.status,
  featured = EXCLUDED.featured;

-- ------------------------------------------------------------------------------
-- 4. PRODUCT VARIANTS
-- ------------------------------------------------------------------------------
INSERT INTO public.product_variants (id, product_id, sku, name, price, capacity, diameter, height, weight, finish, stock_status, sort_order)
VALUES
  -- Hammered Brass Handi variants
  ('v1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'TAM-HND-15L', '1.5 Litre (Small)', 4999.00, '1.5L', '18 cm', '12 cm', '1.25 kg', 'Hand Hammered', 'in_stock', 1),
  ('v1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'TAM-HND-25L', '2.5 Litre (Medium)', 6499.00, '2.5L', '22 cm', '15 cm', '1.80 kg', 'Hand Hammered', 'in_stock', 2),
  ('v1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'TAM-HND-50L', '5.0 Litre (Large Dum)', 9499.00, '5.0L', '28 cm', '20 cm', '2.95 kg', 'Hand Hammered', 'made_to_order', 3),

  -- Copper Matka variants
  ('v1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'TAM-MTK-04L', '4.5 Litre Tabletop', 5999.00, '4.5L', '21 cm', '25 cm', '1.60 kg', 'Hand Hammered', 'in_stock', 1),
  ('v1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'TAM-MTK-08L', '8.0 Litre Floor Stand', 8999.00, '8.0L', '27 cm', '34 cm', '2.80 kg', 'Hand Hammered', 'in_stock', 2),

  -- Brass Kadai variants
  ('v1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'TAM-KDI-20C', '20 cm (1.2 Litre)', 3899.00, '1.2L', '20 cm', '8 cm', '1.10 kg', 'Polished', 'in_stock', 1),
  ('v1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000003', 'TAM-KDI-24C', '24 cm (2.2 Litre)', 5299.00, '2.2L', '24 cm', '10 cm', '1.65 kg', 'Polished', 'in_stock', 2),
  ('v1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000003', 'TAM-KDI-28C', '28 cm (3.6 Litre)', 7199.00, '3.6L', '28 cm', '12 cm', '2.40 kg', 'Polished', 'in_stock', 3),

  -- Bronze Thali variants
  ('v1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000004', 'TAM-THL-06P', '6-Piece Royal Set (Single Person)', 6999.00, 'N/A', '31 cm', '4 cm', '1.75 kg', 'Antique', 'in_stock', 1),
  ('v1000000-0000-0000-0000-000000000010', 'a1000000-0000-0000-0000-000000000004', 'TAM-THL-12P', '12-Piece Couple Heirloom Set', 12999.00, 'N/A', '31 cm', '4 cm', '3.50 kg', 'Antique', 'made_to_order', 2),

  -- Copper Water Jug
  ('v1000000-0000-0000-0000-000000000011', 'a1000000-0000-0000-0000-000000000005', 'TAM-JUG-18L', '1.8 Litre Jug + 2 Glasses', 3499.00, '1.8L', '14 cm', '22 cm', '0.95 kg', 'Hand Hammered', 'in_stock', 1),

  -- Brass Saucepan
  ('v1000000-0000-0000-0000-000000000012', 'a1000000-0000-0000-0000-000000000006', 'TAM-SCP-12L', '1.2 Litre Chai Pan', 3299.00, '1.2L', '16 cm', '9 cm', '1.05 kg', 'Brushed', 'in_stock', 1)
ON CONFLICT (sku) DO UPDATE SET
  price = EXCLUDED.price,
  stock_status = EXCLUDED.stock_status,
  weight = EXCLUDED.weight;

-- ------------------------------------------------------------------------------
-- 5. PRODUCT IMAGES
-- ------------------------------------------------------------------------------
INSERT INTO public.product_images (id, product_id, url, alt_text, image_type, sort_order)
VALUES
  -- Handi
  ('i1000000-0000-0000-0000-000000000001', 'a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1200&auto=format&fit=crop', 'Hammered Brass Handi hero display', 'hero', 1),
  ('i1000000-0000-0000-0000-000000000002', 'a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop', 'Hand hammered texture detail', 'detail', 2),
  ('i1000000-0000-0000-0000-000000000003', 'a1000000-0000-0000-0000-000000000001', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop', 'Brass handi in dining setting', 'lifestyle', 3),

  -- Copper Matka
  ('i1000000-0000-0000-0000-000000000004', 'a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop', 'Pure Hammered Copper Matka hero', 'hero', 1),
  ('i1000000-0000-0000-0000-000000000005', 'a1000000-0000-0000-0000-000000000002', 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1200&auto=format&fit=crop', 'Brass dispensing tap detail', 'detail', 2),

  -- Brass Kadai
  ('i1000000-0000-0000-0000-000000000006', 'a1000000-0000-0000-0000-000000000003', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop', 'Traditional Brass Kadai with Tin Lining', 'hero', 1),

  -- Bronze Thali
  ('i1000000-0000-0000-0000-000000000007', 'a1000000-0000-0000-0000-000000000004', 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1200&auto=format&fit=crop', 'Bronze Kansa Royal Serving Thali Set', 'hero', 1),

  -- Copper Jug
  ('i1000000-0000-0000-0000-000000000008', 'a1000000-0000-0000-0000-000000000005', 'https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=1200&auto=format&fit=crop', 'Hammered Copper Water Jug with Tumblers', 'hero', 1),

  -- Brass Saucepan
  ('i1000000-0000-0000-0000-000000000009', 'a1000000-0000-0000-0000-000000000006', 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1200&auto=format&fit=crop', 'Heavy Gauge Brass Sauce Pan with Teak Handle', 'hero', 1)
ON CONFLICT (id) DO NOTHING;

-- ------------------------------------------------------------------------------
-- 6. PRODUCT COLLECTIONS MAPPING
-- ------------------------------------------------------------------------------
INSERT INTO public.product_collections (product_id, collection_id)
VALUES
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000001'), -- Handi in Artisan's Collection
  ('a1000000-0000-0000-0000-000000000001', 'b1000000-0000-0000-0000-000000000002'), -- Handi in Heritage Brass
  ('a1000000-0000-0000-0000-000000000002', 'b1000000-0000-0000-0000-000000000001'), -- Copper Matka in Artisan's
  ('a1000000-0000-0000-0000-000000000003', 'b1000000-0000-0000-0000-000000000002'), -- Kadai in Heritage Brass
  ('a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000003'), -- Thali in Modern Bronze
  ('a1000000-0000-0000-0000-000000000004', 'b1000000-0000-0000-0000-000000000005')  -- Thali in Wedding Gifting
ON CONFLICT DO NOTHING;

-- ------------------------------------------------------------------------------
-- 7. HOMEPAGE SECTIONS CONFIGURATION (CMS)
-- ------------------------------------------------------------------------------
INSERT INTO public.homepage_sections (id, section_key, section_type, title, subtitle, content, sort_order, is_active)
VALUES
  (
    's1000000-0000-0000-0000-000000000001',
    'hero',
    'hero',
    'THE ARTISAN''S HAND',
    'Rooted in tradition. Designed for you.',
    '{
      "ctaText": "EXPLORE COLLECTIONS",
      "ctaLink": "/collections",
      "secondaryCtaText": "OUR CRAFT",
      "secondaryCtaLink": "/craft",
      "imageUrl": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1800&auto=format&fit=crop",
      "badge": "HERITAGE METALCRAFT"
    }'::jsonb,
    1,
    true
  ),
  (
    's1000000-0000-0000-0000-000000000002',
    'materials',
    'collection_grid',
    'DISCOVER BY MATERIAL',
    'Mastery over sacred metals honed across centuries',
    '{
      "materials": [
        {
          "name": "BRASS",
          "tagline": "Timeless & Elegant",
          "description": "Known as Pittal, celebrated for exceptional thermal conductivity and lustrous warmth.",
          "href": "/products?material=Brass",
          "imageUrl": "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=900&auto=format&fit=crop"
        },
        {
          "name": "COPPER",
          "tagline": "Pure & Powerful",
          "description": "Known as Tamra, venerated in Ayurveda for natural ionization and restorative vitality.",
          "href": "/products?material=Copper",
          "imageUrl": "https://images.unsplash.com/photo-1577705998148-6da4f3963bc8?q=80&w=900&auto=format&fit=crop"
        },
        {
          "name": "BRONZE",
          "tagline": "Rare & Refined",
          "description": "Known as Kansa, the bell-metal alloy of harmony that balances nutrition and taste.",
          "href": "/products?material=Bronze",
          "imageUrl": "https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=900&auto=format&fit=crop"
        }
      ]
    }'::jsonb,
    2,
    true
  ),
  (
    's1000000-0000-0000-0000-000000000003',
    'featured_products',
    'featured_products',
    'FEATURED PIECES',
    'Curated heirlooms from our atelier',
    '{
      "limit": 4,
      "ctaText": "VIEW ALL PIECES",
      "ctaLink": "/products"
    }'::jsonb,
    3,
    true
  ),
  (
    's1000000-0000-0000-0000-000000000004',
    'brand_story',
    'brand_story',
    'WHERE FLAME MEETS ANVIL',
    'The Living Lineage of Indian Metallurgy',
    '{
      "quote": "Metal is not merely shaped; it is persuaded by human breath, furnace glow, and steady rhythm.",
      "body": "In an era of mass stamped disposable cookware, Tamraaya restores dignity to human touch. Every vessel is beaten thousands of times by master craftspeople using tools passed down through ancestral lineages. The rhythmic cadence of hammer on metal carries the living heritage of ancient India directly to your dining table.",
      "imageUrl": "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop",
      "ctaText": "READ OUR STORY",
      "ctaLink": "/about"
    }'::jsonb,
    4,
    true
  ),
  (
    's1000000-0000-0000-0000-000000000005',
    'craftsmanship_values',
    'craftsmanship_values',
    'CRAFTED WITHOUT COMPROMISE',
    'The four sacred tenets of Tamraaya metalwork',
    '{
      "pillars": [
        {
          "title": "Virgin Metals Only",
          "description": "We never melt down scrap or mystery alloys. Only certified virgin copper, zinc, and tin touch our crucibles."
        },
        {
          "title": "Kalai Artisanship",
          "description": "Traditional pure tinning preserves food safety for acidic foods, executed with hand-bellowed charcoal heat."
        },
        {
          "title": "Therapeutic Harmony",
          "description": "Formulated according to Ayurvedic texts to enrich meals with essential trace minerals naturally."
        },
        {
          "title": "Heirloom Durability",
          "description": "Built with solid gauge thickness designed to be seasoned, cherished, and passed down across generations."
        }
      ]
    }'::jsonb,
    5,
    true
  ),
  (
    's1000000-0000-0000-0000-000000000006',
    'enquiry_banner',
    'enquiry_banner',
    'BESPOKE COMMISSIONS & WEDDING CURATIONS',
    'Custom monograms, royal feast sets, and private hospitality orders',
    '{
      "ctaText": "CONSULT WITH OUR CONCIERGE",
      "ctaLink": "/enquire",
      "phone": "+919876543210"
    }'::jsonb,
    6,
    true
  )
ON CONFLICT (section_key) DO UPDATE SET
  title = EXCLUDED.title,
  subtitle = EXCLUDED.subtitle,
  content = EXCLUDED.content,
  sort_order = EXCLUDED.sort_order;

-- ------------------------------------------------------------------------------
-- 8. SAMPLE ENQUIRIES (For Studio Pipeline testing)
-- ------------------------------------------------------------------------------
INSERT INTO public.enquiries (id, enquiry_number, product_id, variant_id, customer_name, customer_email, customer_phone, message, status, internal_notes)
VALUES
  (
    'e1000000-0000-0000-0000-000000000001',
    'TAM-2026-01001',
    'a1000000-0000-0000-0000-000000000001',
    'v1000000-0000-0000-0000-000000000002',
    'Arjun Singhania',
    'arjun.singhania@example.com',
    '+919820123456',
    'Looking to order 4 units of the 2.5L Hammered Brass Handi for an intimate Diwali dinner hosting. Can you engrave our family crest?',
    'new',
    'High value inquiry. Follow up on WhatsApp regarding custom engraving timeline.'
  ),
  (
    'e1000000-0000-0000-0000-000000000002',
    'TAM-2026-01002',
    'a1000000-0000-0000-0000-000000000004',
    'v1000000-0000-0000-0000-000000000010',
    'Meera Kapoor',
    'meera.kapoor@example.com',
    '+919811234567',
    'Enquiring about the Bronze Royal Thali 12-piece heirloom set for an anniversary gift. Need delivery in South Delhi by next weekend.',
    'contacted',
    'Client contacted on phone. Requested velvet gift box packaging. Ready to convert.'
  )
ON CONFLICT (enquiry_number) DO NOTHING;
