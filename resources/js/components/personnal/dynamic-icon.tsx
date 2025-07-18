import * as LucideIcons from "lucide-react";
import { X } from "lucide-react";

type LucideIconProps = {
  name: string;
  className?: string;
};

export const DynamicIcon = ({ name, className = "w-8 h-8" }: LucideIconProps) => {
  const IconComponent = (LucideIcons as any)[name];

  if (!IconComponent) {
    return <X className={className} />;
  }

  return <IconComponent className={className} />;
};
