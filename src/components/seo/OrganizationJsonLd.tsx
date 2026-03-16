import { Helmet } from "react-helmet-async";

const OrganizationJsonLd = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Multti Med Dermocosméticos",
    url: "https://multimedportoalegre.com.br",
    logo: "https://multimedportoalegre.com.br/favicon.svg",
    description: "Dermocosméticos de alta performance para profissionais e home care em Porto Alegre.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Porto Alegre",
      addressRegion: "RS",
      addressCountry: "BR",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+55-51-95157-2050",
      contactType: "customer service",
      availableLanguage: "Portuguese",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default OrganizationJsonLd;
