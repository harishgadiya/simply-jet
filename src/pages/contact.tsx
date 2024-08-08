import { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Link href="/dashboard">
        <a className="text-2xl font-bold text-blue-500 hover:underline">Go to Dashboard</a>
      </Link>
    </div>
  );
};

export default Home;
