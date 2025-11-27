'use client';

import { useEffect, useState } from 'react';
import { ArrowUp01Icon } from 'hugeicons-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 p-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg z-50 transition-colors"
                    aria-label="Scroll to top"
                >
                    <ArrowUp01Icon className="w-6 h-6" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
