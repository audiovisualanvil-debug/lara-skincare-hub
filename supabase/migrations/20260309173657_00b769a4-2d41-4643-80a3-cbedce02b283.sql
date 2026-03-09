
-- =============================================
-- Fix: Convert ALL RESTRICTIVE policies to PERMISSIVE
-- Drop and recreate each policy as PERMISSIVE
-- =============================================

-- professional_requests
DROP POLICY IF EXISTS "Admins can view all requests" ON public.professional_requests;
CREATE POLICY "Admins can view all requests" ON public.professional_requests FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can view their own request" ON public.professional_requests;
CREATE POLICY "Users can view their own request" ON public.professional_requests FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update all requests" ON public.professional_requests;
CREATE POLICY "Admins can update all requests" ON public.professional_requests FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can update their pending request" ON public.professional_requests;
CREATE POLICY "Users can update their pending request" ON public.professional_requests FOR UPDATE TO authenticated USING ((auth.uid() = user_id) AND (status = 'pending'::text));

DROP POLICY IF EXISTS "Users can insert their own request" ON public.professional_requests;
CREATE POLICY "Users can insert their own request" ON public.professional_requests FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- blog_posts
DROP POLICY IF EXISTS "Admins can manage posts" ON public.blog_posts;
CREATE POLICY "Admins can manage posts" ON public.blog_posts FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can view published posts" ON public.blog_posts;
CREATE POLICY "Anyone can view published posts" ON public.blog_posts FOR SELECT USING (is_published = true);

DROP POLICY IF EXISTS "Admins can view all posts" ON public.blog_posts;
CREATE POLICY "Admins can view all posts" ON public.blog_posts FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- order_items
DROP POLICY IF EXISTS "Users can view their order items" ON public.order_items;
CREATE POLICY "Users can view their order items" ON public.order_items FOR SELECT TO authenticated USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

DROP POLICY IF EXISTS "Admins can view all order items" ON public.order_items;
CREATE POLICY "Admins can view all order items" ON public.order_items FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can insert order items for their orders" ON public.order_items;
CREATE POLICY "Users can insert order items for their orders" ON public.order_items FOR INSERT TO authenticated WITH CHECK (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- loyalty_transactions
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.loyalty_transactions;
CREATE POLICY "Users can view their own transactions" ON public.loyalty_transactions FOR SELECT USING (auth.uid() = user_id);

-- REMOVE the dangerous INSERT policy that allows users to award themselves points
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.loyalty_transactions;

-- coupons
DROP POLICY IF EXISTS "Anyone can view active coupons" ON public.coupons;
CREATE POLICY "Anyone can view active coupons" ON public.coupons FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can manage coupons" ON public.coupons;
CREATE POLICY "Admins can manage coupons" ON public.coupons FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- orders
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can create orders" ON public.orders;
CREATE POLICY "Users can create orders" ON public.orders FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can update orders" ON public.orders;
CREATE POLICY "Admins can update orders" ON public.orders FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Users can update their pending orders" ON public.orders;
CREATE POLICY "Users can update their pending orders" ON public.orders FOR UPDATE TO authenticated USING ((auth.uid() = user_id) AND (status = 'pending'::order_status));

DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
CREATE POLICY "Users can view their own orders" ON public.orders FOR SELECT TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Anyone can create guest orders" ON public.orders;
CREATE POLICY "Anyone can create guest orders" ON public.orders FOR INSERT WITH CHECK ((user_id IS NULL) OR (auth.uid() = user_id));

-- quiz_results
DROP POLICY IF EXISTS "Users can view their own quiz results" ON public.quiz_results;
CREATE POLICY "Users can view their own quiz results" ON public.quiz_results FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own quiz results" ON public.quiz_results;
CREATE POLICY "Users can insert their own quiz results" ON public.quiz_results FOR INSERT WITH CHECK (auth.uid() = user_id);

-- user_roles
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Admins can manage all roles" ON public.user_roles;
CREATE POLICY "Admins can manage all roles" ON public.user_roles FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- products
DROP POLICY IF EXISTS "Anyone can view active products" ON public.products;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Admins can view all products" ON public.products;
CREATE POLICY "Admins can view all products" ON public.products FOR SELECT TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can insert products" ON public.products;
CREATE POLICY "Admins can insert products" ON public.products FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can update products" ON public.products;
CREATE POLICY "Admins can update products" ON public.products FOR UPDATE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Admins can delete products" ON public.products;
CREATE POLICY "Admins can delete products" ON public.products FOR DELETE TO authenticated USING (has_role(auth.uid(), 'admin'::app_role));

-- loyalty_points
DROP POLICY IF EXISTS "Users can view their own points" ON public.loyalty_points;
CREATE POLICY "Users can view their own points" ON public.loyalty_points FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own points" ON public.loyalty_points;
CREATE POLICY "Users can insert their own points" ON public.loyalty_points FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "System can update points (via trigger)" ON public.loyalty_points;
CREATE POLICY "System can update points (via trigger)" ON public.loyalty_points FOR UPDATE USING (auth.uid() = user_id);

-- user_addresses
DROP POLICY IF EXISTS "Users can view their own addresses" ON public.user_addresses;
CREATE POLICY "Users can view their own addresses" ON public.user_addresses FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own addresses" ON public.user_addresses;
CREATE POLICY "Users can insert their own addresses" ON public.user_addresses FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own addresses" ON public.user_addresses;
CREATE POLICY "Users can update their own addresses" ON public.user_addresses FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own addresses" ON public.user_addresses;
CREATE POLICY "Users can delete their own addresses" ON public.user_addresses FOR DELETE USING (auth.uid() = user_id);

-- profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- product_reviews
DROP POLICY IF EXISTS "Anyone can view approved reviews" ON public.product_reviews;
CREATE POLICY "Anyone can view approved reviews" ON public.product_reviews FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can create their own reviews" ON public.product_reviews;
CREATE POLICY "Users can create their own reviews" ON public.product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own reviews" ON public.product_reviews;
CREATE POLICY "Users can update their own reviews" ON public.product_reviews FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own reviews" ON public.product_reviews;
CREATE POLICY "Users can delete their own reviews" ON public.product_reviews FOR DELETE USING (auth.uid() = user_id);
