import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { ImagePicker } from '@/components/personnal/image-picker';
import { DatePicker } from '@/components/personnal/date-picker';

type RegisterForm = {
    avatar:                 File | null;
    firstname:              string;
    lastname:               string;
    birthday:               Date | null;
    tel:                    string;
    email:                  string;
    password:               string;
    password_confirmation:  string;
};

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<RegisterForm>>({
        avatar :                null,
        firstname:              '',
        lastname:               '',
        birthday:               null,
        tel:                    '',
        email:                  '',
        password:               '',
        password_confirmation:  '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('register'), {
            forceFormData: true,
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <AuthLayout title="Créer un compte" description="Entrez les informations afin de créer votre compte">
            <Head title="Register" />
            <form className="flex flex-col gap-6" onSubmit={submit} encType='multipart/form-data'>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label>Image de profil</Label>
                        <ImagePicker
                            onFileSelected={file => setData('avatar', file)}
                            initialFile={data.avatar}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="firstname">Prénom</Label>
                        <Input
                            id="firstname"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="firstname"
                            value={data.firstname}
                            onChange={(e) => setData('firstname', e.target.value)}
                            disabled={processing}
                            placeholder="Prénom"
                        />
                        <InputError message={errors.firstname} className="mt-2" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="lastname">Nom</Label>
                        <Input
                            id="lastname"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="lastname"
                            value={data.lastname}
                            onChange={(e) => setData('lastname', e.target.value)}
                            disabled={processing}
                            placeholder="Nom"
                        />
                        <InputError message={errors.lastname} className="mt-2" />
                    </div>

                    <div className="grid gap-2">
                        <DatePicker date={data.birthday} setDate={date => setData('birthday', date)} title='Date de naissance' />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor='tel'>Téléphone</Label>
                        <Input
                            id='tel'
                            type='tel'
                            required
                            tabIndex={2}
                            autoComplete='tel'
                            value={data.tel}
                            onChange={e => setData('tel', e.target.value)}
                            disabled={processing}
                            placeholder='0623451789'
                        />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Adresse mail</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            tabIndex={2}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            disabled={processing}
                            placeholder="email@example.com"
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={3}
                            autoComplete="new-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            disabled={processing}
                            placeholder="Mot de passe"
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="password_confirmation">Confirmez votre mot de passe</Label>
                        <Input
                            id="password_confirmation"
                            type="password"
                            required
                            tabIndex={4}
                            autoComplete="new-password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            disabled={processing}
                            placeholder="Confirmez le mot de passe"
                        />
                        <InputError message={errors.password_confirmation} />
                    </div>

                    <Button type="submit" className="mt-2 w-full" tabIndex={5} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Créer le compte
                    </Button>
                </div>
            </form>
        </AuthLayout>
    );
}
