import { Link } from '@inertiajs/react'

export default function CustomModalUser({ user }) {
  return (
    <li key={user.id}>
      <Link className="flex items-center space-x-3 hover:underline" href={route('profile.show', user.id)}>
        <img
          className="h-16 w-16 rounded-full"
          src={user.image?.url ?? '/default.png'}
          alt={`${user.name}'s Profile Picture`}
        />
        <div className="flex flex-col">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-slate-400">@{user.username}</p>
        </div>
      </Link>
    </li>
  )
}
