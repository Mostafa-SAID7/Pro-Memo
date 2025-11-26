import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function NavBar() {
    const t = useTranslations('navigation');
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md">
            <ul className="flex space-x-4 px-4 py-2">
                <li>
                    <Link href="/" className="text-gray-900 dark:text-gray-100 hover:underline">
                        {t('home') ?? 'Home'}
                    </Link>
                </li>
                <li>
                    <Link href="/projects" className="text-gray-900 dark:text-gray-100 hover:underline">
                        {t('projects') ?? 'Projects'}
                    </Link>
                </li>
                <li>
                    <Link href="/about" className="text-gray-900 dark:text-gray-100 hover:underline">
                        {t('about') ?? 'About'}
                    </Link>
                </li>
                <li>
                    <Link href="/contactus" className="text-gray-900 dark:text-gray-100 hover:underline">
                        {t('contactUs') ?? 'Contact Us'}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
