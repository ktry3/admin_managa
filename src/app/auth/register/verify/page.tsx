import Link from 'next/link';

const VerifyPage = ({ email }: { email: string }) => {
  return (
    <main className='flex justify-center items-center h-[100vh] shadow-[0_11px_35px_2px_rgba(0,0,0,0.14)] bg-[#009688]'>
      <div className='bg-[white] p-4 rounded-[8px] g-dashboard-boxShadow text-center'>
        <h1>We have sent a verification email</h1>
        {email && <p>{email}</p>}
        <p>Click the link in your email to verify your account. After verifying your email, </p>{' '}
        <Link href='/auth/login'>Click here to login</Link>
      </div>
    </main>
  );
};

export default VerifyPage;
