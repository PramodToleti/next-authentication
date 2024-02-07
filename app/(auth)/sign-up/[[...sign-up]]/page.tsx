import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className='min-h-screen flex justify-center items-center bg-slate-300 dark:bg-gray-900 p-2'>
      <SignUp />
    </div>
  );
}
