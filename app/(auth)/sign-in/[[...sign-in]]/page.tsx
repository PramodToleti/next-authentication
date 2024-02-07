import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='min-h-screen flex justify-center items-center p-2 bg-slate-300 dark:bg-gray-900'>
      <SignIn />
    </div>
  );
}
