import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbNavProps {
  items?: BreadcrumbItem[];
  showHome?: boolean;
}

const routeLabels: Record<string, string> = {
  "/": "Início",
  "/loja": "Loja",
  "/monte-sua-rotina": "Monte sua Rotina",
  "/consultoria": "Consultoria de Pele",
  "/sobre": "Sobre",
  "/contato": "Contato",
};

const BreadcrumbNav = ({ items, showHome = true }: BreadcrumbNavProps) => {
  const location = useLocation();
  
  // Auto-generate breadcrumbs from current path if no items provided
  const breadcrumbs: BreadcrumbItem[] = items || (() => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const generatedItems: BreadcrumbItem[] = [];
    
    let currentPath = "";
    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = routeLabels[currentPath] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");
      generatedItems.push({
        label,
        href: currentPath,
      });
    }
    
    return generatedItems;
  })();

  // Don't render on home page
  if (location.pathname === "/" && !items) {
    return null;
  }

  return (
    <nav 
      aria-label="Breadcrumb" 
      className="py-4 bg-card border-b border-border"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <ol className="flex items-center gap-2 flex-wrap">
          {showHome && (
            <li className="flex items-center gap-2">
              <Link 
                to="/" 
                className="flex items-center gap-1 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Home className="w-4 h-4 stroke-[1.5]" />
                <span className="sr-only sm:not-sr-only">Início</span>
              </Link>
              <ChevronRight className="w-4 h-4 text-border stroke-[1.5]" />
            </li>
          )}
          
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <li key={index} className="flex items-center gap-2">
                {isLast ? (
                  <span 
                    className="font-body text-sm text-foreground font-medium"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <>
                    <Link 
                      to={item.href || "#"}
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {item.label}
                    </Link>
                    <ChevronRight className="w-4 h-4 text-border stroke-[1.5]" />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default BreadcrumbNav;
