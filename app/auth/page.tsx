import Link from 'next/link';

const AuthPage = () => (
    <div className="flex h-screen items-center justify-center ">
        <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to Google Photos App</h1>
            <p className="mt-2 text-gray-600">Sign in to view your media</p>
            <Link href="/api/auth">
                <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Sign in with Google
                </button>
            </Link>
        </div>
    </div>
);

export default AuthPage;
