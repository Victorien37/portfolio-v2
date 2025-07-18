import React from "react";
import * as LucideIcons from "lucide-react";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

type IconPickerProps = {
  value: string | null; // Nom de l'icône sélectionnée
  onChange: (value: string) => void; // Callback vers le parent
};

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange }) => {
  const [search, setSearch] = React.useState("");

  const filteredIcons = Object.entries(LucideIcons)
    .filter(([name]) => name.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 100); // Affiche les 100 premiers résultats max

  const SelectedIcon = value ? (LucideIcons as any)[value] : null;

  return (
    <>
        <Button variant="outline" type="button" className="flex items-center gap-2">
          {SelectedIcon ? (
            <>
              <SelectedIcon className="w-4 h-4" />
              <span className="truncate max-w-[120px]">{value}</span>
            </>
          ) : (
            <>
                <LucideIcons.X className="w-4 h-4" />
                <span className="truncate max-w-[120px]">Aucune icône</span>
            </>
          )}
        </Button>
        <div className="border border-gray-300 rounded-md p-2 mt-2">

            <Input
            placeholder="Rechercher une icône"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-2"
            />
            <ScrollArea className="h-48 overflow-auto">
            <div className="grid grid-cols-5 gap-2">
                {filteredIcons.map(([name, Icon]) => (
                <button
                    key={name}
                    type="button"
                    onClick={() => onChange(name)}
                    className={cn(
                    "p-2 rounded hover:bg-muted transition flex flex-col items-center justify-center",
                    value === name && "bg-muted"
                    )}
                    title={name}
                >
                    <Icon className="w-5 h-5" />
                </button>
                ))}
            </div>
            </ScrollArea>
        </div>
    </>
  );
};
