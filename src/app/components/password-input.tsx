"use client"

import { useState } from "react"
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { usePathname } from "next/navigation";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export function PasswordInput({ onChange, placeholder, value }: InputProps) {
    const [isShawPassword, setIsShawPassword] = useState(false)
    const pathname = usePathname()

    const iconColor = 
        pathname === '/login' ? 'text-[#8c52ff]' :
        pathname === '/sign-up' && 'text-emerald-500'

    const toggleShowPassword = () => {
        setIsShawPassword(!isShawPassword)
    }

    return (
        <div className="flex items-center bg-violet-600/5 px-5 mb-3">
            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder || "Password"}
                type={isShawPassword ? "text" : "password"}
                className="w-full text-sm bg-transparent py-3 mr-4 rounded outline-none"
            />

            {isShawPassword ?
                <FaRegEyeSlash
                    size={22}
                    className={`${iconColor} cursor-pointer`}
                    onClick={() => toggleShowPassword()}
                />
                :
                <FaRegEye
                    size={22}
                    className={`${iconColor} cursor-pointer`}
                    onClick={() => toggleShowPassword()}
                />
            }
        </div>
    )
}