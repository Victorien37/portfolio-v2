import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Interest } from '@/types';
import { useForm } from '@inertiajs/react';
import EmojiPicker, { Emoji } from 'emoji-picker-react';
import { Pencil } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface EditInterestModalProps {
    interest: Interest;
}

export function EditInterestModal({ interest }: EditInterestModalProps) {
    const { data, setData, post, processing, reset, errors } = useForm<{emoji: string, name: string, _method: string}>({
        emoji: interest.emoji,
        name: interest.name.fr,
        _method: 'PUT'
    });

    const [open, setOpen] = useState<boolean>(false);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('interest.update', interest.id), {
            onSuccess: () => {
                reset();
                setOpen(false);
                toast.success("Intérêt modifié");
            },
            onError: () => {
                toast.error("Une erreur s'est produite lors de la modification de l'intérêt");
            }
        });
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <Pencil />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>Modifier un intérêt</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Emoji unified={data.emoji} />
                            { errors?.emoji && <p className='text-red-500'>{ errors.emoji }</p> }
                            <EmojiPicker onEmojiClick={e => setData('emoji', e.unified)} />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor='interest-name'>Intérêt</Label>
                            <Input id='interest-name' name='name' onChange={e => setData('name', e.target.value)} value={data.name} />
                            { errors?.name && <p className='text-red-500'>{ errors.name }</p> }
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                        <Button variant="outline">Fermer</Button>
                        </DialogClose>
                        <Button type="submit">Modifier</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}