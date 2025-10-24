"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { PasswordInput } from "../components/password-input";
import axios from "axios";
import { axiosInstance } from "@/src/api/axios-instance";
import { validateEmail } from "@/src/utils/helpers";

export default function SignUp() {
  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [error, setError] = useState<null | string>(null)
  const router = useRouter()

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email adrees")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError("")

    try {
      const response = await axiosInstance.post('/create-account', {
        fullName: name,
        email: email,
        password: password
      })

      if (response.data && response.data.accessToken) {
        localStorage.setItem("cm:token", response.data.accessToken)
        router.push("/home")
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data && error.response.data.message) {
          setError(error.response.data.message)
        }
      } else {
        setError("An unexpected error ocurred. Please try again.")
      }
    }
  }

  return (
    <main className="h-screen bg-emerald-50 overflow-hidden relative">
      <aside className="w-80 h-[450px] rounded-full bg-emerald-500 absolute rotate-45 right-10 -top-10" />
      <aside className="w-80 h-[450px] rounded-full bg-emerald-200 absolute rotate-45 -bottom-40 right-1/2" />

      <div className="container h-screen flex items-center justify-center px-20 mx-auto">
        <section className="w-2/4 h-[90vh] flex items-start flex-col justify-end bg-[url('/images/floresta.png')] bg-cover bg-center rounded-lg p-10 z-50">
          <h4 className="text-5xl text-white font-semibold leading-[58px]">Embark on <br /> Your Journey </h4>
          <p className="text-[15px] text-white leading-6 pr-7 mt-4">Sign up now to begin capturing your adventures and preserving
            unforgettable moments in your personal travel log.</p>
        </section>

        <section className="w-2/4 h-[75vh] bg-white rounded-r-lg relative p-16 shadow-lg shadow-violet-200/20">
          <form onSubmit={handleSignUp}>
            <h4 className="text-2xl font-semibold mb-7">
              SignUp
            </h4>

            <input
              type="text"
              placeholder="Full Name"
              className="w-full text-sm bg-violet-600/5 rounded px-5 py-3 mb-4 outline-none"
              value={name}
              onChange={({ target }) => { setName(target.value) }}
            />

            <input
              type="text"
              placeholder="Email"
              className="w-full text-sm bg-violet-600/5 rounded px-5 py-3 mb-4 outline-none"
              onChange={({ target }) => { setEmail(target.value) }}
            />

            <PasswordInput
              value={password}
              onChange={({ target }) => {
                setPassword(target.value)
              }}
              placeholder="Password"
            />

            <p className="text-red-500 text-sm pb-1">{error}</p>

            <button
              type="submit"
              className="w-full text-sm font-medium text-white bg-emerald-500 hover:bg-emerald-100 hover:text-emerald-500 shadow-lg rounded-full my-1 py-2.5 cursor-pointer"
            // onClick={() => router.push("/sign-up")}
            >
              CREATE ACCOUT
            </button>

            <p className="text-xs text-slate-500 text-center my-4">OR</p>

            <button
              type="submit"
              className="w-full text-sm font-medium text-emerald-500 bg-white hover:bg-emerald-500 hover:text-white shadow-lg rounded-full my-1 py-2.5 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              LOGIN
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
