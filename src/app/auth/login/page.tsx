'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SvgIcon from '../../../../public/dist/svg/icon';
import { Grid } from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface IFormInput {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordInputType, setPasswordInputType] = useState('password');

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
    setPasswordInputType(passwordVisible ? 'text' : 'password');
  };

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    try {
      console.log('Data', data);
      await signIn('credentials', {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: '/dashboard',
      });
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <main className='flex justify-center items-center h-[100vh] shadow-[0_11px_35px_2px_rgba(0,0,0,0.14)] bg-[#009688]'>
      <Grid container justifyContent='center'>
        <Grid item xs={6} sx={{ padding: '0 10%' }}>
          <div className='w-[100%]'>
            <form className='bg-white p-8 rounded-[14px]' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <div className='mb-4 text-center'>
                  <p className='text-[1.5rem] font-bold text-[#32de84]'>Sign In</p>
                </div>
                <div>
                  <input
                    className='input'
                    type='text'
                    placeholder='Email'
                    {...register('email', { required: 'Email is required' })}
                  />
                  {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
                <div className='mt-4 flex items-center'>
                  <input
                    className='input w-[85%]'
                    type={passwordInputType}
                    placeholder='Password'
                    {...register('password', { required: 'Password is required' })}
                  />
                  <div className='w-[15%]' onClick={togglePasswordVisibility}>
                    {passwordVisible ? SvgIcon.visibility : SvgIcon.visibilityOff}
                  </div>
                </div>
                {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                <button type='submit' className='mt-4 login-btn'>
                  Login
                </button>
                <div className='mt-2'>
                  <span className='font-[500] text-slate-400'>
                    No account?
                    <span className='text-[#4ec7e8]'>
                      <Link href={'/'}>&nbsp;Create one!</Link>
                    </span>
                  </span>
                </div>
              </div>
            </form>
            <div className='opts-sign-in mt-4'>
              <div className='my-4 text-center'>
                <span className='font-bold'>Sign In Options</span>
              </div>
              <div className='opts-method py-2' onClick={() => signIn('github')}>
                {SvgIcon.githubIcon}
                <div className='ml-2'>Github</div>
              </div>
              <div className='opts-method mt-2 py-2' onClick={() => signIn('google')}>
                {SvgIcon.gmailIcon}
                <div className='ml-2'>Gmail</div>
              </div>
            </div>
          </div>
        </Grid>
        {/* <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Image
            src='/dist/images/srongData.png'
            alt='logo'
            width={100}
            height={100}
            style={{ height: '100%', width: '60%', margin: 'auto' }}
          />
        </Grid> */}
      </Grid>
    </main>
  );
}
