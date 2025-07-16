import { ColorPicker } from "@/components/color-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import AppLayout from "@/layouts/app-layout"
import {
    type Config,
    type SharedData,
    type BreadcrumbItem,
    type Language,
    type Interest
} from "@/types";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Pencil, Plus, Save, Trash2 } from "lucide-react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuration',
        href: '/configs',
    },
];

export default function Config() {

    const { config } = usePage<SharedData & { config: Config }>().props;
    const { languages } = usePage<SharedData & { languages: Language[] }>().props;
    const { interests } = usePage<SharedData & { interests: Interest[] }>().props;
    const { data, setData, put, processing, reset, errors } = useForm<Config>({...config});

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration" />
            <div
                className="grid grid-cols-3 gap-4 rounded-xl p-4 overflow-x-auto"
                style={{
                    height: '150vh',
                    gridTemplateRows: '32% 30% 30%',
                }}
            >
                {/* Ligne 1 */}
                <div
                    className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1"
                    style={{ backgroundColor: data.light_background, padding: 6 }}
                >
                    <p>Mode Clair</p>
                    <Label htmlFor="light_background">Couleur de fond</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('light_background', v);
                        }}
                        value={data.light_background}
                    />

                    <Label htmlFor="light_primary" style={{ color: data.light_primary }}>Couleur des titres</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('light_primary', v);
                        }}
                        value={data.light_primary}
                    />

                    <Label htmlFor="light_secondary" style={{ color: data.light_secondary }}>Couleur du texte</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('light_secondary', v);
                        }}
                        value={data.light_secondary}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button title="Enregistrer" style={{ backgroundColor: data.light_primary }}>
                            <Save />
                        </Button>
                    </div>
                </div>
                <div
                    className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1"
                    style={{ backgroundColor: data.dark_background, padding: 6 }}
                >
                    <p className="text-white">Mode Sombre</p>

                    <Label htmlFor="light_background" className="text-white">Couleur de fond</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('dark_background', v);
                        }}
                        value={data.dark_background}
                    />
                        
                    <Label htmlFor="dark_primary" style={{ color: data.dark_primary }}>Couleur des titres</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('dark_primary', v);
                        }}
                        value={data.dark_primary}
                    />
                    
                    <Label htmlFor="dark_secondary" style={{ color: data.dark_secondary }}>Couleur du texte</Label>
                    <ColorPicker
                        onChange={(v: string) => {
                            setData('dark_secondary', v);
                        }}
                        value={data.dark_secondary}
                    />

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button title="Enregistrer" style={{ backgroundColor: data.dark_primary }}>
                            <Save />
                        </Button>
                    </div>

                </div>
                <div className="relative h-full w-full overflow-y-auto rounded-xsl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="job">Métier</Label>
                        <Input type="text" id="job" placeholder="Métier" value={data.job.fr} onChange={e => setData('job', e.target.value)} />
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description"
                            onChange={e => setData('description', e.target.value)}
                        >
                            { data.description.fr }
                        </Textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button title="Enregistrer">
                            <Save />
                        </Button>
                    </div>
                </div>

                {/* Bloc vertical 2 lignes */}
                <div className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-2 row-span-2 p-2">
                    <p>Compétences</p>
                    
                </div>

                {/* Ligne 2 petit bloc */}
                <div className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <p>Langues</p>
                        <Button title="Ajouter une langue">
                            <Plus />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Langue</TableHead>
                                <TableHead>Niveau</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { languages.map(language => {
                                return (
                                    <TableRow key={`language-${language.id}`}>
                                        <TableCell>{ language.name }</TableCell>
                                        <TableCell>{ language.level }</TableCell>
                                        <TableCell>
                                            <Button title="Modifier">
                                                <Pencil />
                                            </Button>
                                            <Button title="Supprimer">
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) }
                        </TableBody>
                    </Table>
                </div>

                {/* Ligne 3 petit bloc */}
                <div className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <p>Centres d'intrêts</p>
                        <Button title="Ajouter un centre d'intérêt">
                            <Plus />
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Emoji</TableHead>
                                <TableHead>Intérêt</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { interests.map(interest => {
                                return (
                                    <TableRow key={`language-${interest.id}`}>
                                        <TableCell>{ interest.emoji }</TableCell>
                                        <TableCell>{ interest.name }</TableCell>
                                        <TableCell>
                                            <Button title="Modifier">
                                                <Pencil />
                                            </Button>
                                            <Button title="Supprimer">
                                                <Trash2 />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                )
                            }) }
                        </TableBody>
                    </Table>
                </div>
            </div>

        </AppLayout>
    )
}
