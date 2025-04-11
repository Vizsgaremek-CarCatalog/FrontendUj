export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white py-4 text-center">
            <p className="text-sm">
                © {new Date().getFullYear()} Car Showcase. All rights reserved.
            </p>
            <p className="text-sm">
                Contact us: <a href="mailto:info@carshowcase.com" className="text-blue-400 hover:underline">info@carshowcase.com</a>
            </p>
        </footer>
    );
}
