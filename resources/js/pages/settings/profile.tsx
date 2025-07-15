import { type BreadcrumbItem, type SharedData } from '@/types';
import { Transition } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, ChevronDownIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Paramètres du profil',
        href: '/settings/profile',
    },
];

type ProfileForm = {
    firstname: string;
    lastname: string;
    birthday: Date;
    tel: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        firstname: auth.user.firstname,
        lastname: auth.user.lastname,
        birthday: auth.user.birthday,
        tel: auth.user.tel,
        email: auth.user.email,
    });

    const [open, setOpen] = useState<boolean>(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paramètres du profil" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall title="Informations du profil" description="Mettez à jour vos informations" />

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="lastname">Nom</Label>

                            <Input
                                id="lastname"
                                className="mt-1 block w-full"
                                value={data.lastname}
                                onChange={(e) => setData('lastname', e.target.value)}
                                required
                                autoComplete="name"
                                placeholder="Full name"
                            />

                            <InputError className="mt-2" message={errors.lastname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="firstname">Prénom</Label>

                            <Input
                                id="firstname"
                                className="mt-1 block w-full"
                                value={data.firstname}
                                onChange={(e) => setData('firstname', e.target.value)}
                                required
                                autoComplete="firstname"
                                placeholder="Prénom"
                            />

                            <InputError className="mt-2" message={errors.firstname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="bithday">Date de naissance</Label>

                            <Popover open={open} onOpenChange={setOpen}>
                                <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    id="date"
                                    className="w-48 justify-between font-normal"
                                >
                                    {data.birthday ? new Date(data.birthday).toLocaleDateString() : "Select date"}
                                    <ChevronDownIcon />
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={data.birthday}
                                    captionLayout="dropdown"
                                    onSelect={(date) => {
                                    if (date) {
                                        setData('birthday', date);
                                        setOpen(false);
                                    }
                                    }}
                                />
                                </PopoverContent>
                            </Popover>

                            <InputError className="mt-2" message={errors.firstname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="tel">Téléphone</Label>

                            <Input
                                id="tel"
                                className="mt-1 block w-full"
                                type='tel'
                                value={data.tel}
                                onChange={(e) => setData('tel', e.target.value)}
                                required
                                autoComplete="tel"
                                placeholder="0123456789"
                            />

                            <InputError className="mt-2" message={errors.firstname} />
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Adresse mail</Label>

                            <Input
                                id="email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                required
                                autoComplete="username"
                                placeholder="exemple@gmail.com"
                            />

                            <InputError className="mt-2" message={errors.email} />
                        </div>

                        {mustVerifyEmail && auth.user.email_verified_at === null && (
                            <div>
                                <p className="-mt-4 text-sm text-muted-foreground">
                                    L'adresse mail n'est pas vérifié.{' '}
                                    <Link
                                        href={route('verification.send')}
                                        method="post"
                                        as="button"
                                        className="text-foreground underline decoration-neutral-300 underline-offset-4 transition-colors duration-300 ease-out hover:decoration-current! dark:decoration-neutral-500"
                                    >
                                        Cliquez ici pour envoyer un mail de confirmation
                                    </Link>
                                </p>

                                {status === 'verification-link-sent' && (
                                    <div className="mt-2 text-sm font-medium text-green-600">
                                        Un mail avec un lien à été envoyé à votre addresse mail
                                    </div>
                                )}
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Button disabled={processing}>Enregistrer</Button>

                            <Transition
                                show={recentlySuccessful}
                                enter="transition ease-in-out"
                                enterFrom="opacity-0"
                                leave="transition ease-in-out"
                                leaveTo="opacity-0"
                            >
                                <p className="text-sm text-neutral-600">Enregistré</p>
                            </Transition>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
