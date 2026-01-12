-- Criar bucket para certificados profissionais
INSERT INTO storage.buckets (id, name, public)
VALUES ('professional-certificates', 'professional-certificates', false);

-- Política para usuários autenticados fazerem upload do próprio certificado
CREATE POLICY "Users can upload their own certificates"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'professional-certificates' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para usuários verem seus próprios certificados
CREATE POLICY "Users can view their own certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'professional-certificates' 
  AND (storage.foldername(name))[1] = auth.uid()::text
);

-- Política para admins verem todos os certificados
CREATE POLICY "Admins can view all certificates"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'professional-certificates' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Adicionar coluna para URL do certificado na tabela de solicitações
ALTER TABLE public.professional_requests
ADD COLUMN certificate_url TEXT;