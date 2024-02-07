import { UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className='flex justify-between w-screen items-center p-4 px-8 bg-slate-300 dark:bg-gray-900'>
      <h1>Home</h1>
      <div>
        <UserButton afterSignOutUrl='/sign-in' />
      </div>
    </nav>
  );
}
