import { router } from '@inertiajs/react'

export default function PostImage({ post }) {
  return (
    <div
      className="md:p-12 text-gray-900 select-none"
      onDoubleClick={() =>
        router.visit(route('posts.like', post.id), {
          method: 'post',
          preserveScroll: true,
        })
      }
    >
      <img className="w-full rounded-sm" src={post.image?.url} alt={`${post.user.name}'s Post #${post.id}`} />
    </div>
  )
}
