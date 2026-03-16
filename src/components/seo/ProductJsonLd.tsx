import { Helmet } from "react-helmet-async";

interface ProductJsonLdProps {
  name: string;
  description: string;
  image: string;
  price: number;
  brand: string;
  sku?: string | null;
  inStock: boolean;
}

const ProductJsonLd = ({ name, description, image, price, brand, sku, inStock }: ProductJsonLdProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    ...(sku && { sku }),
    offers: {
      "@type": "Offer",
      priceCurrency: "BRL",
      price: price.toFixed(2),
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: typeof window !== "undefined" ? window.location.href : "",
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default ProductJsonLd;
