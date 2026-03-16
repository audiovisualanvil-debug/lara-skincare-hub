import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  children?: React.ReactNode;
}

const BASE_URL = "https://multimedportoalegre.com.br";
const DEFAULT_OG_IMAGE = "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/795dad77-43f0-4537-a2a8-a2e7686bb557/id-preview-656d343d--368056e0-842b-4479-be8d-ce02a7a3fbdf.lovable.app-1773078536011.png";

const SEOHead = ({ title, description, canonical, ogImage, ogType = "website", noindex = false, children }: SEOHeadProps) => {
  const fullCanonical = canonical ? `${BASE_URL}${canonical}` : undefined;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {fullCanonical && <link rel="canonical" href={fullCanonical} />}
      
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      {fullCanonical && <meta property="og:url" content={fullCanonical} />}
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {children}
    </Helmet>
  );
};

export default SEOHead;
