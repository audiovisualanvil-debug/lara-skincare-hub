import { createContext, useContext, ReactNode } from "react";
import { useProfessionalStatus } from "@/hooks/useProfessionalStatus";

interface ProfessionalContextType {
  isProfessional: boolean;
  discountPercentage: number;
  loading: boolean;
  hasExistingRequest: boolean;
}

const ProfessionalContext = createContext<ProfessionalContextType>({
  isProfessional: false,
  discountPercentage: 0,
  loading: true,
  hasExistingRequest: false,
});

export const useProfessional = () => useContext(ProfessionalContext);

interface ProfessionalProviderProps {
  children: ReactNode;
}

export const ProfessionalProvider = ({ children }: ProfessionalProviderProps) => {
  const { isProfessional, discountPercentage, loading, hasExistingRequest } = useProfessionalStatus();

  return (
    <ProfessionalContext.Provider
      value={{
        isProfessional,
        discountPercentage,
        loading,
        hasExistingRequest,
      }}
    >
      {children}
    </ProfessionalContext.Provider>
  );
};
