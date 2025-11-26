import { useTranslations } from 'next-intl';

export default function ContactUsPage() {
    const t = useTranslations('contactUs');
    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{t('title') ?? 'Contact Us'}</h1>
            <p className="text-lg text-gray-700 dark:text-gray-300">{t('description') ?? 'Get in touch with us through this page.'}</p>
        </div>
    );
}
