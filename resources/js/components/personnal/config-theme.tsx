import { useForm } from "@inertiajs/react";
import { FormEvent } from "react";
import { Label } from "../ui/label";
import { ColorPicker } from "../color-picker";
import { Button } from "../ui/button";
import { Save } from "lucide-react";
import { toast } from "sonner";


type SetColorsProps = {
    mode:       'light' | 'dark';
    background: string;
    primary:    string;
    secondary:  string;
}

export function ConfigTheme({ mode, background, primary, secondary }: SetColorsProps) {
    
    const { data, setData, post, processing, reset, errors } = useForm<{
        mode:       'light' | 'dark';
        background: string;
        primary:    string;
        secondary:  string;
        _method:    string;
    }>({
        mode:       mode,
        background: background,
        primary:    primary,
        secondary:  secondary,
        _method:    'PUT'
    });

    const handleUpdate = (e: FormEvent) => {
        e.preventDefault();
        post(route('config.theme'), {
            onSuccess: () => {
                toast.success(`Le theme ${mode === 'light' ? 'clair' : 'sombre'} à été enregistré`);
            },
            onError: () => {
                toast.error(`Une erreur s'est produite lors de la mise à jour du thème ${mode === 'light' ? 'clair' : 'sombre'}`);
            }
        });
    }

    return (
        <div
            className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1"
            style={{ backgroundColor: data.background, padding: 6 }}
        >
            <p className={`text-${mode === 'light' ? 'black' : 'white'}`}>Mode { mode === 'light' ? 'Clair' : 'Sombre' }</p>
            <Label htmlFor="light_background" className={`text-${mode === 'light' ? 'black' : 'white'}`}>Couleur de fond</Label>
            <ColorPicker
                onChange={(v: string) => {
                    setData('background', v);
                }}
                value={data.background}
            />

            <Label htmlFor="primary" style={{ color: data.primary }}>Couleur des titres</Label>
            <ColorPicker
                onChange={(v: string) => {
                    setData('primary', v);
                }}
                value={data.primary}
            />

            <Label htmlFor="secondary" style={{ color: data.secondary }}>Couleur du texte</Label>
            <ColorPicker
                onChange={(v: string) => {
                    setData('secondary', v);
                }}
                value={data.secondary}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <Button
                    title="Enregistrer"
                    style={{ backgroundColor: data.primary }}
                    onClick={handleUpdate}
                >
                    <Save />
                </Button>
            </div>
        </div>
    )
}