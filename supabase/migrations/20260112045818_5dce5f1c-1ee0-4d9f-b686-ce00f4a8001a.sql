-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Admins can view all requests" ON public.professional_requests;
DROP POLICY IF EXISTS "Users can view their own request" ON public.professional_requests;
DROP POLICY IF EXISTS "Admins can update all requests" ON public.professional_requests;
DROP POLICY IF EXISTS "Users can update their pending request" ON public.professional_requests;
DROP POLICY IF EXISTS "Users can insert their own request" ON public.professional_requests;

-- Recreate as PERMISSIVE policies (they OR together instead of AND)
CREATE POLICY "Admins can view all requests" 
ON public.professional_requests 
FOR SELECT 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can view their own request" 
ON public.professional_requests 
FOR SELECT 
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can update all requests" 
ON public.professional_requests 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Users can update their pending request" 
ON public.professional_requests 
FOR UPDATE 
TO authenticated
USING ((auth.uid() = user_id) AND (status = 'pending'));

CREATE POLICY "Users can insert their own request" 
ON public.professional_requests 
FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);