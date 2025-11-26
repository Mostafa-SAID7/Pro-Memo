export default function About() {
    return (
        <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Bio Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
                <div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">About Me</h1>
                    <div className="prose dark:prose-invert text-gray-600 dark:text-gray-300">
                        <p className="mb-4">
                            Hello! I'm a passionate software engineer with a love for building things that live on the internet. My journey started when I decided to try editing custom Tumblr themes — turns out hacking together HTML & CSS is pretty fun!
                        </p>
                        <p className="mb-4">
                            Fast-forward to today, and I've had the privilege of working at an advertising agency, a start-up, a huge corporation, and a student-led design studio. My main focus these days is building accessible, inclusive products and digital experiences for a variety of clients.
                        </p>
                        <p>
                            When I'm not at the computer, I'm usually hanging out with my cat, reading, or running around searching for new coffee shops.
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
                        {/* Placeholder for profile image */}
                        <div className="w-full h-full flex items-center justify-center text-gray-400 dark:text-gray-600">
                            <span className="text-6xl">👋</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Skills Section */}
            <div className="mb-20">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Technical Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {['JavaScript (ES6+)', 'TypeScript', 'React', 'Next.js', 'Node.js', 'Python', 'PostgreSQL', 'AWS'].map((skill) => (
                        <div key={skill} className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-center font-medium text-gray-700 dark:text-gray-300 hover:border-blue-500 transition-colors">
                            {skill}
                        </div>
                    ))}
                </div>
            </div>

            {/* Experience Section */}
            <div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Experience</h2>
                <div className="space-y-8">
                    {[
                        {
                            role: "Senior Frontend Engineer",
                            company: "Tech Corp",
                            period: "2022 - Present",
                            description: "Leading the frontend team in rebuilding the core product dashboard using Next.js and Tailwind CSS."
                        },
                        {
                            role: "Full Stack Developer",
                            company: "StartUp Inc",
                            period: "2020 - 2022",
                            description: "Developed and maintained multiple client-facing features using React and Node.js."
                        },
                        {
                            role: "Junior Developer",
                            company: "Web Agency",
                            period: "2019 - 2020",
                            description: "Collaborated with designers to implement pixel-perfect responsive websites."
                        }
                    ].map((job, index) => (
                        <div key={index} className="flex flex-col md:flex-row gap-4 md:gap-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl">
                            <div className="md:w-1/4">
                                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{job.period}</span>
                            </div>
                            <div className="md:w-3/4">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{job.role}</h3>
                                <p className="text-gray-600 dark:text-gray-400 font-medium mb-2">{job.company}</p>
                                <p className="text-gray-600 dark:text-gray-300">{job.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
