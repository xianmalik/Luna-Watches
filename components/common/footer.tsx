export default function Footer() {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="text-center">
                <p>&copy; {new Date().getFullYear()} Luna Watches. All rights reserved.</p>
                <p className="mt-2">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a> | 
                    <a href="/terms" className="hover:underline ml-2">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
}