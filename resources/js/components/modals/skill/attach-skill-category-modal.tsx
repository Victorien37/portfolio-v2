import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm } from "@inertiajs/react";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Skill, SkillCategory } from "@/types";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface AttachSkillCategoryModalProps {
    skillCategory:  SkillCategory;
    skills:         Skill[];
}

export function AttachSkillCategoryModal({ skillCategory, skills }: AttachSkillCategoryModalProps) {

    const [open, setOpen] = useState<boolean>(false);

    
    const { data, setData, post, processing, reset, errors } = useForm<{skills: number[], _method: string}>({
        skills: skillCategory.skills?.map(s => typeof s === "number" ? s : s.id),
        _method: 'PUT'
    });
    console.log(data.skills);

    const toggleSkill = (id: number) => {
        setData(
            "skills",
            data.skills.includes(id)
                ? data.skills.filter((skillId) => skillId !== id)
                : [...data.skills, id]
        );
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('skill.category.attach', skillCategory.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("La catégorie de compétence à bien été ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la création de la catégorie de compétence.");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button title="Ajouter une catégorie de compétence">
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Lié des compétence à la catégorie {skillCategory.name.fr}</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <ScrollArea className="max-h-[300px] border rounded-md p-2">
                                <div className="space-y-3">
                                    {skills.map((skill) => (
                                        <div key={skill.id} className="flex items-center gap-2">
                                            <Checkbox
                                                id={`skill-${skill.id}`}
                                                checked={data.skills.includes(skill.id)}
                                                onCheckedChange={() => toggleSkill(skill.id)}
                                            />
                                            <Label htmlFor={`skill-${skill.id}`} className="text-sm">
                                                {skill.name.fr}
                                            </Label>
                                        </div>
                                    ))}
                                </div>
                                </ScrollArea>

                                {errors.skills && ( <p className="text-sm text-red-500">{errors.skills}</p> )}
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Attacher</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}