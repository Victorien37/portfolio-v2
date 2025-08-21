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
    type Interest,
    type SkillCategory,
    User,
    type PdfFile,
} from "@/types";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { FileDown, Plus, Save } from "lucide-react";
import { CreateLanguageModal } from "../../components/modals/language/create-language-modal";
import { FormEvent, useState } from "react";
import { ConfigTheme } from "@/components/personnal/config-theme";
import { EditLanguageModal } from "@/components/modals/language/edit-language-modal";
import { DeleteModal } from "@/components/modals/delete-modal";
import { toast } from "sonner";
import { CreateInterestModal } from "@/components/modals/interest/create-interest-modal";
import { Emoji } from "emoji-picker-react";
import { EditInterestModal } from "@/components/modals/interest/edit-interest-modal";
import { DynamicIcon } from "@/components/personnal/dynamic-icon";
import { CreateSkillCategoryModal } from "@/components/modals/skill/create-skill-category-modal";
import { SkillModal } from "@/components/modals/skill/skill-modal";
import { AttachSkillCategoryModal } from "@/components/modals/skill/attach-skill-category-modal";
import { Separator } from "@/components/ui/separator";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuration',
        href: '/configs',
    },
];

export default function Config() {

    const { config }                                            = usePage<SharedData & { config: Config }>().props;
    const { user }                                              = usePage<SharedData & { user: User }>().props;
    const { languages }                                         = usePage<SharedData & { languages: Language[] }>().props;
    const { interests }                                         = usePage<SharedData & { interests: Interest[] }>().props;
    const { skillCategories }                                   = usePage<SharedData & { skillCategories: SkillCategory[] }>().props;
    const { skills }                                            = usePage<SharedData & { skills: SkillCategory[] }>().props;
    const { data, setData, post, processing, reset, errors }    = useForm<{ job: string, description: string, cv: PdfFile | null, github: string | null, gitlab: string | null, linkedin: string | null, _method: string }>({
        job:            config.job.fr,
        description:    config.description.fr,
        cv:             null,
        github:         user?.github,
        gitlab:         user?.gitlab,
        linkedin:       user?.linkedin,
        _method:        'PUT',
    });
    const [openLanguageModal, setOpenLanguageModal]             = useState<boolean>(false);
    const [openInterestModal, setOpenInterestModal]             = useState<boolean>(false);
    const [openSkillCategoryModal, setOpenSkillCategoryModal]   = useState<boolean>(false);
    const [openSkillModal, setOpenSkillModal]                   = useState<boolean>(false);

    const handleUpdateJob = (e: FormEvent) => {
        e.preventDefault();
        post(route('config.job'), {
            onSuccess: () => {
                toast.success('Métier et description modifiés');
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la mise à job du métier et de la description");
            }
        })
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration" />
            <div
                className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    lg:grid-cols-3
                    gap-4
                    rounded-xl
                    p-4
                    overflow-x-auto
                "
                style={{
                    minHeight: '100vh',
                    gridTemplateRows: 'auto',
                }}
            >
                {/* Ligne 1 */}
                <ConfigTheme mode="light" background={config.light_background} primary={config.light_primary} secondary={config.light_secondary} />
                <ConfigTheme mode="dark" background={config.dark_background} primary={config.dark_primary} secondary={config.dark_secondary} />
                <div className="relative h-full w-full overflow-y-auto rounded-xsl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="job">Métier</Label>
                        <Input type="text" id="job" placeholder="Métier" value={data.job} onChange={e => setData('job', e.target.value)} />
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Description"
                            onChange={e => setData('description', e.target.value)}
                        >
                            { data.description }
                        </Textarea>
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <div className="flex items-center gap-2">
                            <Label htmlFor="cv">CV <small>(pdf)</small></Label>
                            {user?.cv !== null && (
                                <a
                                    href={user.cv}
                                    download
                                    className="flex items-center p-0 h-auto"
                                    style={{ textDecoration: "none" }}
                                >
                                    <Button type="button" variant="link" className="p-0 h-auto">
                                        <FileDown />
                                    </Button>
                                </a>
                            )}
                        </div>
                        <Input
                            type="file"
                            id="cv"
                            name="cv"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                if (file && file.type === "application/pdf") {
                                    setData("cv", file as PdfFile);
                                } else {
                                    setData("cv", null);
                                }
                            }}
                        />
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="github">Lien Github</Label>
                        <Input
                            type="url"
                            id="github"
                            name="github"
                            placeholder="https://github.com/mon-profil"
                            value={data.github ?? ""}
                            onChange={e => setData('github', e.target.value)}
                        />
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="gitlab">Lien Gitlab</Label>
                        <Input
                            type="url"
                            id="gitlab"
                            name="gitlab"
                            placeholder="https://gitlab.com/mon-profil"
                            value={data.gitlab ?? ""}
                            onChange={e => setData('gitlab', e.target.value)}
                        />
                    </div>
                    <div className="grid w-full items-center gap-3 p-2">
                        <Label htmlFor="linkedin">Lien LinkedIn</Label>
                        <Input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            placeholder="https://linkedin.com/in/mon-profil"
                            value={data.linkedin ?? ""}
                            onChange={e => setData('linkedin', e.target.value)}
                        />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Button title="Enregistrer" onClick={handleUpdateJob}>
                            <Save />
                        </Button>
                    </div>
                </div>

                {/* Bloc vertical 2 lignes */}
                <div className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border md:col-span-2 md:row-span-2 p-2">
                    <div className="flex items-center gap-3 w-full m-2">
                        <p className="text-lg font-semibold mb-2">Compétences</p>
                        <div className="ml-auto">
                            <SkillModal skills={skills} open={openSkillModal} setOpen={setOpenSkillModal} />
                            <CreateSkillCategoryModal open={openSkillCategoryModal} setOpen={setOpenSkillCategoryModal} />
                        </div>
                    </div>

                    <div className="flex flex-col h-full gap-4">
                        { skillCategories.map(skillCategory => {
                            console.log(skillCategory.skill_ids)
                            return (
                                <div key={`skill-categroy-${skillCategory.id}`} className="flex-1 rounded-lg border p-4 bg-muted text-muted-foreground shadow-sm">
                                    <div className="flex items-center gap-3 w-full">
                                        <DynamicIcon name={skillCategory.svg} />
                                        <span className="text-medium">{skillCategory.name.fr}</span>
                                        <div className="ml-auto">
                                            <AttachSkillCategoryModal skillCategory={skillCategory} skills={skills} />
                                            <DeleteModal id={skillCategory.id} routeName="skill.category.destroy" message={`Voulez-vous vraiment supprimer la catégorie de compétence ${skillCategory.name.fr} ?`} />
                                        </div>
                                    </div>
                                    {skills.filter(skill => skillCategory?.skill_ids?.includes(skill.id)).map((skill, index) => (
                                        <div key={`category-${skillCategory.id}-skill-${skill.id}`} className="m-2">
                                            <p className="text-sm font-medium">{skill.name.fr}</p>
                                            {index < skills.length - 1 && <Separator />}
                                        </div>
                                    ))}
                                </div>
                            )
                        }) }
                    </div>
                </div>

                {/* Ligne 2 petit bloc */}
                <div className="relative h-full w-full overflow-y-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', padding: 5 }}>
                        <p>Langues</p>
                        <CreateLanguageModal open={openLanguageModal} setOpen={setOpenLanguageModal} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Langue</TableHead>
                                <TableHead className="text-center">Niveau</TableHead>
                                <TableHead className="text-end">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { languages.map(language => {
                                return (
                                    <TableRow key={`language-${language.id}`}>
                                        <TableCell className="text-start">{ language.name.fr }</TableCell>
                                        <TableCell className="text-center">{ language.level }</TableCell>
                                        <TableCell className="text-end">
                                            <EditLanguageModal language={language} />
                                            <DeleteModal
                                                id={language.id}
                                                routeName="language.destroy"
                                                message={`Voulez-vous vraiment supprimer ${language.name.fr} ?`}
                                            />
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
                        <CreateInterestModal open={openInterestModal} setOpen={setOpenInterestModal} />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-start">Emoji</TableHead>
                                <TableHead className="text-center">Intérêt</TableHead>
                                <TableHead className="text-end">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            { interests.map(interest => {
                                return (
                                    <TableRow key={`language-${interest.id}`}>
                                        <TableCell className="text-start"><Emoji unified={interest.emoji} /></TableCell>
                                        <TableCell className="text-center">{ interest.name.fr }</TableCell>
                                        <TableCell className="text-end">
                                            <EditInterestModal interest={interest} />
                                            <DeleteModal id={interest.id} routeName="interest.destroy" message={`Voulez-vous vraiment supprimer ${interest.name.fr}`} />
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
