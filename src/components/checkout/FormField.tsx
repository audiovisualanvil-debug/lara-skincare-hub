import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
  disabled?: boolean;
}

const FormField = ({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  placeholder,
  maxLength,
  className,
  disabled = false,
}: FormFieldProps) => {
  return (
    <div className={cn("space-y-1.5", className)}>
      <Label 
        htmlFor={id} 
        className={cn(
          "text-sm font-medium transition-colors",
          error && "text-destructive"
        )}
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={cn(
            "transition-all duration-200",
            error && "border-destructive focus-visible:ring-destructive/30 pr-10"
          )}
        />
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              <AlertCircle className="w-4 h-4 text-destructive" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-xs text-destructive flex items-center gap-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FormField;
