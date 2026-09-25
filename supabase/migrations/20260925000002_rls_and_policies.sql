-- ==============================================================================
-- TAMRAAYA LUXURY METALCRAFT - ROW LEVEL SECURITY (RLS) POLICIES
-- Migration: 20260925000002_rls_and_policies.sql
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. HELPER FUNCTION: GET CURRENT USER ROLE
-- ------------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
DECLARE
  v_role TEXT;
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN 'anon';
  END IF;

  SELECT role INTO v_role
  FROM public.profiles
  WHERE id = auth.uid();

  RETURN COALESCE(v_role, 'customer');
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- ------------------------------------------------------------------------------
-- 2. ENABLE RLS ON ALL TABLES
-- ------------------------------------------------------------------------------
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_collections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- ------------------------------------------------------------------------------
-- 3. PROFILES POLICIES
-- ------------------------------------------------------------------------------
-- Self-view
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Super admin view all
CREATE POLICY "Super admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (public.get_auth_role() = 'super_admin');

-- Super admin update all
CREATE POLICY "Super admins can update profiles"
  ON public.profiles FOR UPDATE
  USING (public.get_auth_role() = 'super_admin');

-- Self update basic info
CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 4. CATEGORIES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view active categories"
  ON public.categories FOR SELECT
  USING (is_active = true OR public.get_auth_role() IN ('catalog_manager', 'super_admin'));

CREATE POLICY "Catalog managers can modify categories"
  ON public.categories FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 5. COLLECTIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view active collections"
  ON public.collections FOR SELECT
  USING (is_active = true OR public.get_auth_role() IN ('catalog_manager', 'super_admin'));

CREATE POLICY "Catalog managers can modify collections"
  ON public.collections FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 6. PRODUCTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published products"
  ON public.products FOR SELECT
  USING (status = 'published' OR public.get_auth_role() IN ('catalog_manager', 'super_admin', 'sales'));

CREATE POLICY "Catalog managers can modify products"
  ON public.products FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 7. PRODUCT VARIANTS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published product variants"
  ON public.product_variants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = product_variants.product_id
      AND (products.status = 'published' OR public.get_auth_role() IN ('catalog_manager', 'super_admin', 'sales'))
    )
  );

CREATE POLICY "Catalog managers can modify variants"
  ON public.product_variants FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 8. PRODUCT IMAGES POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view published product images"
  ON public.product_images FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.products
      WHERE products.id = product_images.product_id
      AND (products.status = 'published' OR public.get_auth_role() IN ('catalog_manager', 'super_admin', 'sales'))
    )
  );

CREATE POLICY "Catalog managers can modify images"
  ON public.product_images FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 9. PRODUCT_COLLECTIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view product collection links"
  ON public.product_collections FOR SELECT
  TO PUBLIC USING (true);

CREATE POLICY "Catalog managers can modify collection links"
  ON public.product_collections FOR ALL
  USING (public.get_auth_role() IN ('catalog_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('catalog_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 10. ENQUIRIES POLICIES
-- ------------------------------------------------------------------------------
-- Anyone (guests/customers) can submit an enquiry
CREATE POLICY "Anyone can create enquiries"
  ON public.enquiries FOR INSERT
  TO PUBLIC
  WITH CHECK (true);

-- Sales & Super Admin can read and update enquiries
CREATE POLICY "Sales team can view enquiries"
  ON public.enquiries FOR SELECT
  USING (public.get_auth_role() IN ('sales', 'super_admin'));

CREATE POLICY "Sales team can update enquiries"
  ON public.enquiries FOR UPDATE
  USING (public.get_auth_role() IN ('sales', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('sales', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 11. HOMEPAGE SECTIONS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Public can view active homepage sections"
  ON public.homepage_sections FOR SELECT
  USING (is_active = true OR public.get_auth_role() IN ('content_manager', 'super_admin'));

CREATE POLICY "Content managers can modify homepage sections"
  ON public.homepage_sections FOR ALL
  USING (public.get_auth_role() IN ('content_manager', 'super_admin'))
  WITH CHECK (public.get_auth_role() IN ('content_manager', 'super_admin'));

-- ------------------------------------------------------------------------------
-- 12. AUDIT LOGS POLICIES
-- ------------------------------------------------------------------------------
CREATE POLICY "Super admins can view audit logs"
  ON public.audit_logs FOR SELECT
  USING (public.get_auth_role() = 'super_admin');
