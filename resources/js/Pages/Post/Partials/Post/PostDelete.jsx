import { useForm } from '@inertiajs/react'
import DangerButton from '@/Components/DangerButton'

export default function PostDelete({ post, onSuccess }) {
  const { delete: destroy, processing } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()

    destroy(route('posts.destroy', post), {
      onSuccess: onSuccess,
    })
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <p>Are your sure you want to delete your post?</p>
      <form onSubmit={onSubmit} className="flex justify-end">
        <DangerButton processing={processing} type="submit">
          Yes, delete my Post
        </DangerButton>
      </form>
    </div>
  )
}
