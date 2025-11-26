export default function Contact() {
    return (
        <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Get in Touch</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                    Have a project in mind or just want to say hi? I'd love to hear from you.
                </p>
            </div>

            <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800 shadow-lg">
                <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                id="name"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                            placeholder="Project Inquiry"
                        />
                    </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            id="message"
                            rows={6}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                            placeholder="Tell me about your project..."
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-blue-500/30"
                    >
                        Send Message
                    </button>
                </form>
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <div className="text-2xl mb-2">📧</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Email</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">hello@example.com</p>
                </div>
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <div className="text-2xl mb-2">📍</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Location</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">San Francisco, CA</p>
                </div>
                <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900/50">
                    <div className="text-2xl mb-2">📱</div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">Social</h3>
                    <div className="flex justify-center gap-4 mt-2">
                        <a href="#" className="text-gray-400 hover:text-blue-500">Twitter</a>
                        <a href="#" className="text-gray-400 hover:text-blue-500">LinkedIn</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
