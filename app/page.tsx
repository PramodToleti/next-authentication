import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Home</h1>
      <UserButton afterSignOutUrl='/sign-in' />
    </main>
  );
}
