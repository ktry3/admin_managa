"use client";
import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import SvgIcon from "../../../../public/dist/svg/icon";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Grid,
  TextField,
  InputLabel,
  IconButton,
  InputAdornment,
  FormControl,
  FilledInput,
  Stack,
} from "@mui/material";

interface IFormInput {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  password: string;
  organization: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<IFormInput> = async (formData) => {
    setLoading(true);
    setMessage(null);
    try {
      const response = await axios.post("/api/register", formData);
      setMessage("User registered successfully!");
      console.log("User registered successfully:", response.data);
      router.push("/auth/register/verify");
    } catch (error: any) {
      setMessage(
        error.response?.data?.error?.message || "Error registering user."
      );
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex justify-center items-center h-[100vh] shadow-[0_11px_35px_2px_rgba(0,0,0,0.14)] bg-[white]">
      <div className="w-[100%] border border-[#32de84] p-4 rounded-[14px]">
        <Grid container justifyContent="center">
          <Grid item xs={6} sx={{ padding: "0 10%" }}>
            <div className="w-[100%]">
              <Stack
                component="form"
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-[14px]"
                spacing={2}
                noValidate
                autoComplete="off"
              >
                <div className="mb-4 text-center">
                  <p className="text-[1.5rem] font-bold text-[#32de84]">
                    Sign Up
                  </p>
                </div>
                {message && <p>{message}</p>}
                <TextField
                  required
                  label="Organization"
                  id="filled-dob"
                  fullWidth
                  variant="filled"
                  {...register("organization", {
                    required: "Organization is required",
                  })}
                  error={!!errors.dob}
                  helperText={errors.dob?.message}
                />
                <TextField
                  required
                  variant="filled"
                  label="First Name"
                  type="text"
                  {...register("firstName", {
                    required: "First name is required",
                  })}
                  error={!!errors.firstName}
                  helperText={errors.firstName?.message}
                />
                <TextField
                  required
                  variant="filled"
                  label="Last Name"
                  type="text"
                  {...register("lastName", {
                    required: "Last name is required",
                  })}
                  error={!!errors.lastName}
                  helperText={errors.lastName?.message}
                />
                <TextField
                  required
                  id="filled-email"
                  label="Email"
                  fullWidth
                  variant="filled"
                  type="email"
                  {...register("email", { required: "Email is required" })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
                {/* <TextField
                required
                id='filled-dob'
                fullWidth
                variant='filled'
                type='date'
                {...register('dob', { required: 'Date of birth is required' })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              /> */}

                <FormControl
                  variant="filled"
                  fullWidth
                  error={!!errors.password}
                >
                  <InputLabel htmlFor="filled-adornment-password">
                    Password
                  </InputLabel>
                  <FilledInput
                    id="filled-adornment-password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Password is required",
                    })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <button type="submit" className="mt-4 login-btn">
                  Register
                </button>
                <div className="mt-2">
                  <span className="font-[500] text-slate-400">
                    Already got account?
                    <span className="text-[#4ec7e8]">
                      <Link href={"/auth/login"}>&nbsp;Login!</Link>
                    </span>
                  </span>
                </div>
              </Stack>

              <div className="opts-sign-in mt-4">
                <div className="my-4 text-center">
                  <span className="font-bold">Sign Up Options</span>
                </div>
                <div className="opts-method py-2">
                  {SvgIcon.githubIcon}
                  <div className="ml-2">Github</div>
                </div>
                <div className="opts-method mt-2 py-2">
                  {SvgIcon.gmailIcon}
                  <div className="ml-2-">Gmail</div>
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
      </div>
    </main>
  );
}
