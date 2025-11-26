import Link from 'next/link';

export default function Projects() {
    const projects = [
        {
            id: 1,
            title: "E-Commerce Platform",
            description: "A full-featured online store with cart, checkout, and admin dashboard.",
            tags: ["Next.js", "Stripe", "PostgreSQL"],
            image: "bg-blue-100 dark:bg-blue-900/20"
        },
        {
            id: 2,
            title: "Task Management App",
            description: "Collaborative task manager with real-time updates and team features.",
            tags: ["React", "Firebase", "Tailwind"],
            image: "bg-violet-100 dark:bg-violet-900/20"
        },
        {
            id: 3,
            title: "AI Content Generator",
            description: "SaaS application using OpenAI API to generate marketing copy.",
            tags: ["Python", "FastAPI", "React"],
            image: "bg-emerald-100 dark:bg-emerald-900/20"
        },
        {
            id: 4,
            title: "Portfolio Website",
            description: "Modern personal portfolio with dark mode and animations.",
            tags: ["Next.js", "Tailwind CSS", "Framer Motion"],
            image: "bg-orange-100 dark:bg-orange-900/20"
        }
    ];

    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">My Projects</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    A collection of my recent work, side projects, and experiments.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project) => (
                    <div key={project.id} className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
                        <div className={`aspect-video ${project.image} w-full`}></div>
                        <div className="p-6 flex flex-col flex-grow">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4 flex-grow">
                                {project.description}
                            </p>
                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.tags.map((tag) => (
                                    <span key={tag} className="px-3 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-4 mt-auto">
                                <Link href="#" className="flex-1 text-center px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-medium hover:opacity-90 transition-opacity">
                                    View Demo
                                </Link>
                                <Link href="#" className="flex-1 text-center px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                    Code
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
