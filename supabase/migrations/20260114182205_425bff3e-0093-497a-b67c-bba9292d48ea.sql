-- Create storage bucket for portfolio images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('portfolio-images', 'portfolio-images', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for portfolio images
CREATE POLICY "Public can view portfolio images"
ON storage.objects FOR SELECT
USING (bucket_id = 'portfolio-images');

CREATE POLICY "Admins can upload portfolio images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update portfolio images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete portfolio images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'portfolio-images' 
  AND has_role(auth.uid(), 'admin'::app_role)
);