import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Pro Memo
            </Link>
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-md">
              Building digital experiences that matter. Specialized in modern web development, machine learning, and scalable solutions.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Navigation</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Home</Link></li>
              <li><Link href="/projects" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Projects</Link></li>
              <li><Link href="/services" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Services</Link></li>
              <li><Link href="/about" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white tracking-wider uppercase">Connect</h3>
            <ul className="mt-4 space-y-4">
              <li><Link href="/contact" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Contact</Link></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">GitHub</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">LinkedIn</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8 flex justify-between items-center">
          <p className="text-base text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Pro Memo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
