import { Link } from '@inertiajs/react'
import ReactTimeAgo from 'react-time-ago'

export default function Comment({ comment }) {
  return (
    <>
      <div className="grid grid-cols-[4rem_1fr] space-x-6">
        <Link className="font-bold w-16" href={route('profile.show', comment.user.id)}>
          <img
            className="h-16 w-16 rounded-full"
            src={comment.user.image?.url ?? '/default.png'}
            alt={`${comment.user.name}'s Profile Picture`}
          />
        </Link>
        <div className="flex flex-col justify-center">
          <div className="flex items-baseline space-x-2 mb-2 relative">
            <Link className="font-bold" href={route('profile.show', comment.user.id)}>
              @{comment.user.username}
            </Link>
            <small>
              <ReactTimeAgo date={new Date(comment.created_at)} />
              {comment.created_at !== comment.updated_at && <>&nbsp;(edited)</>}
            </small>
          </div>
          {comment.content !== '' && <p className="w-[70vw] pr-10 max-w-3xl break-words">{comment.content}</p>}
        </div>
      </div>
    </>
  )
}
