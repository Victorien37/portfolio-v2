import { useLanguage } from "@/contexts/LanguageContext";
import { useTranslation } from "@/hooks/use-translation";
import { User } from "@/types";
import { useForm } from "@inertiajs/react";
import { Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import React, { FormEvent } from "react";
import { toast } from "sonner";

type ContactSectionProps = {
    user: User;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ user }) => {

    const { t } = useTranslation();
    const { language } = useLanguage();

    const { data, setData, post, reset, processing, errors } = useForm<{firstname: string, lastname: string, email: string, subject: string, message: string, honeypot: string}>({
        firstname: "",
        lastname: "",
        email: "",
        subject: "",
        message: "",
        honeypot: "",
    });

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('contact'), {
            onSuccess: () => {
                reset();
                toast.success("Message envoyé ! Je vous répondrai rapidement.");
            },
            onError: (errors) => {
                // Affiche l'erreur personnalisée du backend si elle existe
                if (errors.form) {
                    toast.error(errors.form);
                } else {
                    // Affiche la première erreur trouvée sinon
                    const firstError = Object.values(errors)[0];
                    if (Array.isArray(firstError)) {
                        toast.error(firstError[0]);
                    } else if (typeof firstError === 'string') {
                        toast.error(firstError);
                    } else {
                        toast.error("Une erreur s'est produite lors de l'envoi du message.");
                    }
                }
            },
        });
    }

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">
                        {t('contact.stay')} {t('contact.in')} <span className="text-primary">{t('contact.contact')}</span>
                    </h2>
                    <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                    <p className="text-xl text-secondary max-w-2xl mx-auto">{t('contact.subtitle')}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
                {/* Informations de contact */}
                <div className="space-y-8">
                    <div className="bg-background/50 p-8 rounded-lg border border-secondary/50">
                        <h3 className="text-2xl font-bold mb-6 text-primary">{t('contact.infos.title')}</h3>
                        
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <Phone className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm">{t('contact.infos.tel')}</p>
                                    <p className="text-secondary font-medium">{ language === 'fr' ? user.tel : `+33${user.tel.slice(1)}` }</p>
                                </div>
                                </div>

                                <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <Mail className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm">{t('contact.infos.email')}</p>
                                    <p className="text-secondary font-medium">{ user.email }</p>
                                </div>
                                </div>

                                <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/20 rounded-lg">
                                    <MapPin className="w-5 h-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-secondary text-sm">{t('contact.infos.location')}</p>
                                    <p className="text-secondary font-medium">Tours, France</p>
                                </div>
                            </div>
                        </div>

                        {/* <div className="mt-8 pt-6 border-t border-gray-700">
                            <p className="text-gray-400 mb-4">Suivez-moi sur :</p>
                            <div className="flex gap-4">
                            <a href="#" className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition-colors group">
                                <Github className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                            </a>
                            <a href="#" className="p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg hover:bg-yellow-400/20 transition-colors group">
                                <Linkedin className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
                            </a>
                            </div>
                        </div> */}
                    </div>

                </div>

                {/* Formulaire de contact */}
                <div className="bg-background/50 p-8 rounded-lg border border-secondary/50">
                    <h3 className="text-2xl font-bold mb-6 text-primary">{t('contact.form.title')}</h3>
                    
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="firstname" className="block text-sm font-medium text-secondary mb-2">{t('contact.form.labels.firstname')}</label>
                                <input
                                    type="text"
                                    id="firstame"
                                    className="w-full px-4 py-3 bg-background border border-secondary rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder={t('contact.form.placeholders.firstname')}
                                    onChange={e => setData('firstname', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="lastname" className="block text-sm font-medium text-secondary mb-2">{t('contact.form.labels.lastname')}</label>
                                <input
                                    type="text"
                                    id="lastname"
                                    className="w-full px-4 py-3 bg-background border border-secondary rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder={t('contact.form.placeholders.lastname')}
                                    onChange={e => setData('lastname', e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">{t('contact.form.labels.email')}</label>
                                <input
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 bg-background border border-secondary rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                    placeholder={t('contact.form.placeholders.email')}
                                    onChange={e => setData('email', e.target.value)}
                                />

                                <input type="text" className="invisible" name="honeypot" id="honeypot" onChange={e => setData('honeypot', e.target.value)} />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">{t('contact.form.labels.subject')}</label>
                            <input
                                type="text"
                                id="subject"
                                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
                                placeholder={t('contact.form.placeholders.subject')}
                                onChange={e => setData('subject', e.target.value)}
                            />
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">{t('contact.form.labels.message')}</label>
                            <textarea
                                id="message"
                                rows={6}
                                className="w-full px-4 py-3 bg-background border border-secondary rounded-lg text-secondary placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
                                placeholder={t('contact.form.placeholders.message')}
                                onChange={e => setData('message', e.target.value)}
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-primary to-primary-dark text-secondary font-semibold py-4 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group hover:to-primary/35"
                        >
                            <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            {t('contact.form.labels.send')}
                        </button>
                    </form>
                </div>
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-700 text-center">
                    <p className="text-gray-400">© 2025 { new Date().getFullYear() !== 2025 ? `- ${new Date().getFullYear()}` : '' } Victorien Rodrigues. {t('footer')} Tours, France.</p>
                </div>
            </div>
        </section>
    )
}