export default function Footer() {
    return (
        <footer className="bg-gray-800 dark:bg-gray-900 text-white dark:text-gray-200 py-6 px-4 text-center md:text-left">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                    <p className="text-sm">Email: <a href="mailto:info@carshowcase.com" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">info@carshowcase.com</a></p>
                    <p className="text-sm">Phone: <a href="tel:+1234567890" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">+1 (234) 567-890</a></p>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Our Locations</h3>
                    <ul className="text-sm space-y-1">
                        <li>📍 Budapest, Hungary</li>
                        <li>📍 Ózd, UK</li>
                        <li>📍 Miskolc, Germany</li>
                        <li>📍 Szeged, Japan</li>
                    </ul>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
                    <ul className="text-sm space-y-1">
                        <li><a href="https://facebook.com" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">Facebook</a></li>
                        <li><a href="https://x.com" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">X</a></li>
                        <li><a href="https://instagram.com" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">Instagram</a></li>
                        <li><a href="/privacy-policy" className="text-blue-400 dark:text-blue-300 hover:underline dark:hover:text-blue-200">Privacy Policy</a></li>
                    </ul>
                </div>
            </div>

            <div className="mt-6 text-center text-sm text-gray-400 dark:text-gray-500">
                © {new Date().getFullYear()} Car Showcase. All rights reserved.
            </div>
        </footer>
    );
}