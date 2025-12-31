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
      className="group relative aspect-[3/4] overflow-hidden bg-secondary img-editorial"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-full object-cover"
      />
      {/* Editorial gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
        <div className="w-6 h-0.5 bg-primary mb-3 transition-all duration-500 group-hover:w-12" />
        <h3 className="font-display text-lg md:text-xl font-medium text-white">
          {title}
        </h3>
      </div>
    </Link>
  );
};

export default CategoryCardHome;