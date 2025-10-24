"use client";

import { useRouter } from 'next/navigation'
import Logo from '../../assets/captured-moments-logo.svg'
import { ProfileInfo } from './card/profile-info'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface UserInfoProps {
  created_at: string
  email: string
  fullName: string
  id: string
  password: string
  uptaded_at: string
}

interface NavbarProps {
  userInfo: UserInfoProps | null
}

export function Navbar({ userInfo }: NavbarProps) {
  const router = useRouter()
  const [isToken, setIsToken] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('cm:token')
    setIsToken(!!token)
  }, [])

  const showProfileinfo = isToken && userInfo

  const handleLogout = async () => {
    setIsLoggingOut(true)

    // Simula um pequeno delay pra mostrar o spinner
    await new Promise((resolve) => setTimeout(resolve, 1000))

    localStorage.clear()
    router.push("/login")
  }

  return (
    <div className="bg-white flex items-center justify-between px-6 py-2 drop-shadow sticky top-0 z-10">
      <Image src={Logo} alt="captured-moments-logo" className='h-11' />

      {showProfileinfo && (
        <ProfileInfo
          userInfo={userInfo}
          onLogout={handleLogout}
          isLoggingOut={isLoggingOut} // envia o estado
        />
      )}
    </div>
  )
}
