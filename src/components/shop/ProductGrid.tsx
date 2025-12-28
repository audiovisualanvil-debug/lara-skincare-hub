import ProductCardNew from "./ProductCardNew";

interface Product {
  id: number;
  name: string;
  brand: string;
  price?: string;
  image?: string;
  isProfessional?: boolean;
}

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

const ProductGrid = ({ products, columns = 3 }: ProductGridProps) => {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-4 md:gap-6`}>
      {products.map((product) => (
        <ProductCardNew key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;