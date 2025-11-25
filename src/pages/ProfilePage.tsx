import { useState, useEffect } from 'react'
import { User, Pencil } from 'lucide-react'
import { UserAPI } from '@/api/user.api'
import Input from '@/components/ui/Input'
import IconButton from '@/components/ui/IconButton'
import SubmitButtons from '@/components/ui/SubmitButtons'
import { toast } from 'react-toastify'

type ProfileType = {
  email: string
  role: string
  username: string
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileType>({
    email: '',
    role: '',
    username: '',
  })

  const [username, setUsername] = useState('')
  const [isEditUsername, setIsEditUsername] = useState(false)

  useEffect(() => {
    UserAPI.getMe().then((res: ProfileType) => {
      setProfile(res)
      setUsername(res.username)
    })
  }, [])

  const startEditUsername = () => {
    setUsername(profile.username)
    setIsEditUsername(true)
  }

  const cancelEdit = () => {
    setIsEditUsername(false)
  }

  const submitUsername = () => {
    if (!username) return toast.error('Username cannot be empty')

    UserAPI.update(username)
      .then(() => {
        setIsEditUsername(false)
        UserAPI.getMe().then((res: ProfileType) => {
          setProfile(res)
          setUsername(res.username)
        })
      })
      .catch(() => {
        toast.error('Error')
      })
  }

  return (
    <div className="p-6 text-white max-w-2xl">
      <h2 className="text-3xl font-bold mb-4">My Profile</h2>

      <div className="bg-surface border-gray-700 p-6 rounded-2xl">
        <div>
          <h3 className="flex items-center gap-2">
            <User size={20} /> Account Info
          </h3>
        </div>
        <div className="mt-10 flex flex-col gap-2">
          <div>
            <p>Email</p>
            <p className="text-text-secondary">{profile.email}</p>
          </div>

          <div>
            <p>Role</p>
            <p className="text-text-secondary">{profile.role}</p>
          </div>

          <div>
            <div className="flex gap-2">
              <span>Username</span>
              {isEditUsername ? (
                <SubmitButtons onCancel={cancelEdit} onSubmit={submitUsername} />
              ) : (
                <IconButton icon={<Pencil size={14} />} onClick={startEditUsername} />
              )}
            </div>
            {isEditUsername ? (
              <Input value={username} onChange={(e) => setUsername(e.target.value)} />
            ) : (
              <p className="text-text-secondary">{username}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
