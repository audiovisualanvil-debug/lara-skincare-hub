import { Link } from "react-router-dom";

interface CategoryCardHomeProps {
  title: string;
  image: string;
  href: string;
}

const CategoryCardHome = ({ title, image, href }: CategoryCardHomeProps) => {
  return (
    <Link 
      to={href}
      className="group relative aspect-[4/5] rounded-lg overflow-hidden bg-secondary hover-lift"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <h3 className="font-heading text-lg md:text-xl font-semibold text-white">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCardHome;