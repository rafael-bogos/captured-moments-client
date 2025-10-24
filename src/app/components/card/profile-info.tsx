import { getInitials } from "@/src/utils/helpers"

interface UserInfoProps {
  created_at: string
  email: string
  fullName: string
  id: string
  password: string
  uptaded_at: string
}

interface ProfileInfoProps {
  userInfo: UserInfoProps
  onLogout: () => void
  isLoggingOut: boolean
}

export function ProfileInfo({ userInfo, onLogout, isLoggingOut }: ProfileInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitials(userInfo.fullName)}
      </div>

      <div>
        <p className="text-sm font-medium">{userInfo.fullName || ""}</p>
        <button
          className="text-sm text-slate-700 underline cursor-pointer flex items-center gap-2 disabled:opacity-70"
          onClick={onLogout}
          disabled={isLoggingOut}
        >
          {isLoggingOut ? (
            <>
              <div className="w-4 h-4 border-2 border-slate-500 border-t-transparent rounded-full animate-spin"></div>
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    </div>
  )
}
