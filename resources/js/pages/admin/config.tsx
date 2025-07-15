import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout"
import { type BreadcrumbItem } from "@/types"
import { Head } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuration',
        href: '/configs',
    },
];


export default function Config() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Configuration" />
            <div
                className="grid grid-cols-3 gap-4 rounded-xl p-4 overflow-x-auto"
                style={{
                    height: '92vh',
                    gridTemplateRows: '30% 30% 30%',
                }}
            >
                {/* Ligne 1 */}
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                    <div className="grid w-full max-w-sm items-center gap-3 pl-2 pt-2">
                        <Label htmlFor="firstname">Prénom</Label>
                        <Input type="text" id="firstname" placeholder="Prénom" value={'Victorien'} onChange={(text) => console.log(text)} />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-3 pl-2 pt-2">
                        <Label htmlFor="lastname">Nom</Label>
                        <Input type="text" id="lastname" placeholder="Nom" value={'Victorien'} onChange={(text) => console.log(text)} />
                    </div>

                </div>
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-2">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>

                {/* Bloc vertical 2 lignes */}
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-2 row-span-2">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>

                {/* Ligne 2 petit bloc */}
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>

                {/* Ligne 3 petit bloc */}
                <div className="relative h-full w-full overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border col-span-1">
                    {/* <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" /> */}
                </div>
            </div>

        </AppLayout>
    )
}
