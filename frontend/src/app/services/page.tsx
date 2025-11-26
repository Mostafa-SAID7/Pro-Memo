export default function Services() {
    const services = [
        {
            title: "Web Development",
            description: "Custom websites and web applications built with modern technologies like React, Next.js, and Node.js.",
            icon: "💻",
            features: ["Responsive Design", "SEO Optimization", "Performance Tuning", "CMS Integration"]
        },
        {
            title: "Machine Learning",
            description: "Intelligent solutions powered by AI. From data analysis to predictive modeling and NLP applications.",
            icon: "🤖",
            features: ["Data Analysis", "Predictive Modeling", "NLP Solutions", "Computer Vision"]
        },
        {
            title: "UI/UX Design",
            description: "User-centric design that looks great and works perfectly. I focus on creating intuitive and engaging experiences.",
            icon: "🎨",
            features: ["User Research", "Wireframing", "Prototyping", "Design Systems"]
        },
        {
            title: "Consulting",
            description: "Technical strategy and advice to help you make the right decisions for your digital product.",
            icon: "💡",
            features: ["Tech Stack Selection", "Architecture Review", "Code Audits", "Team Training"]
        }
    ];

    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Services</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    I help businesses and individuals bring their ideas to life with high-quality technical solutions.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {services.map((service, index) => (
                    <div key={index} className="p-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors group">
                        <div className="text-4xl mb-6 bg-gray-50 dark:bg-gray-800 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            {service.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            {service.description}
                        </p>
                        <ul className="space-y-3">
                            {service.features.map((feature) => (
                                <li key={feature} className="flex items-center text-gray-700 dark:text-gray-300">
                                    <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
