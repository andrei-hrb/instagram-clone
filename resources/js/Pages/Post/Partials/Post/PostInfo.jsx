import { Link } from '@inertiajs/react'
import Heart from '@/Components/Icons/Heart'

export default function PostInfo({ post, auth, onLikesClick, onCommentsClick }) {
  return (
    <div className="p-6 text-gray-900 flex space-x-4">
      <Link href={route('posts.like', post.id)} preserveScroll={true} as="button" method="post">
        <Heart classNames={'w-6 h-6'} filled={[...post.likes].map((like) => like.user_id).includes(auth.user.id)} />
      </Link>

      <button
        disabled={post.likes.length === 0}
        type="button"
        onClick={onLikesClick}
        className={`${post.likes.length !== 0 ? 'hover:underline' : ''}`}
      >
        {post.likes.length} Like
        {post.likes.length !== 1 && <>s</>}
      </button>
      <button type="button" className="hover:underline" onClick={onCommentsClick}>
        {post.comments.length} Comment
        {post.comments.length !== 1 && <>s</>}
      </button>
    </div>
  )
}
