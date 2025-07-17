import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ModalProps } from '@/types/props';
import { useForm } from '@inertiajs/react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { Plus } from 'lucide-react';
import { FormEvent } from 'react';
import { toast } from 'sonner';

export function CreateInterestModal({ open, setOpen }: ModalProps) {
    const { data, setData, post, processing, reset, errors } = useForm<{emoji: string | null, name: string | null}>({
        emoji: null,
        name: null,
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('interest.store'), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Intérêt ajouté");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de l'ajout de l'intérêt");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Ajouter un intérêt</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            { data?.emoji && <Emoji unified={data.emoji} /> }
                            { errors?.emoji && <p className='text-red-500'>{ errors.emoji }</p> }
                            <EmojiPicker onEmojiClick={e => setData('emoji', e.unified)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor='interest-name'>Intérêt</Label>
                            <Input id='interest-name' name='name' onChange={e => setData('name', e.target.value)} />
                            { errors?.name && <p className='text-red-500'>{ errors.name }</p> }
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Ajouter</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}