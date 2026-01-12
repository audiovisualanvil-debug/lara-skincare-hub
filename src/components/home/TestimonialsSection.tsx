import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface Testimonial {
  id: number;
  name: string;
  text: string;
  rating: number;
  image?: string;
  role?: string;
  product?: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

// Default avatar images for testimonials
const defaultAvatars = [
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
];

const TestimonialsSection = ({ testimonials }: TestimonialsSectionProps) => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-background via-champagne/30 to-background overflow-hidden">
      <div className="container-editorial">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-xs uppercase tracking-wider text-primary font-medium">
              Depoimentos
            </span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl lg:text-display-sm text-foreground">
            O que nossas clientes dizem
          </h2>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Histórias reais de transformação e resultados comprovados
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              variants={itemVariants}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`relative bg-card rounded-2xl p-6 md:p-8 border border-border/30 transition-all duration-500 ${
                hoveredId === testimonial.id 
                  ? 'shadow-2xl shadow-primary/10 -translate-y-2 border-primary/30' 
                  : 'shadow-lg hover:shadow-xl'
              }`}
            >
              {/* Quote icon */}
              <div className="absolute -top-4 -left-2 md:left-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  hoveredId === testimonial.id 
                    ? 'bg-primary text-white scale-110' 
                    : 'bg-primary/10 text-primary'
                }`}>
                  <Quote className="w-5 h-5" />
                </div>
              </div>

              {/* Content */}
              <div className="pt-4">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * i, duration: 0.3 }}
                    >
                      <Star 
                        className={`h-4 w-4 transition-colors duration-300 ${
                          i < testimonial.rating 
                            ? 'fill-gold text-gold' 
                            : 'text-muted-foreground/30'
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-foreground text-base leading-relaxed font-body mb-6">
                  "{testimonial.text}"
                </p>

                {/* Product mention if available */}
                {testimonial.product && (
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-gold/10 text-gold-dark text-xs font-medium rounded-full">
                      Usou: {testimonial.product}
                    </span>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-4 pt-4 border-t border-border/30">
                  {/* Avatar */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <img
                      src={testimonial.image || defaultAvatars[index % defaultAvatars.length]}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-card flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </motion.div>

                  {/* Name & Role */}
                  <div>
                    <p className="font-display text-base font-medium text-foreground">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role || "Cliente verificada"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative gradient on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 via-transparent to-gold/5 transition-opacity duration-500 pointer-events-none ${
                hoveredId === testimonial.id ? 'opacity-100' : 'opacity-0'
              }`} />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 md:mt-16 flex flex-wrap justify-center gap-8 md:gap-16"
        >
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-primary font-medium">98%</p>
            <p className="text-sm text-muted-foreground mt-1">Satisfação</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-gold font-medium">10k+</p>
            <p className="text-sm text-muted-foreground mt-1">Clientes felizes</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl md:text-4xl text-terracotta font-medium">4.9</p>
            <p className="text-sm text-muted-foreground mt-1">Avaliação média</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
