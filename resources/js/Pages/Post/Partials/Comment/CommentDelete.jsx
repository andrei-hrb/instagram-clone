import { useForm } from '@inertiajs/react'
import DangerButton from '@/Components/DangerButton'

export default function CommentDelete({ comment, onSuccess }) {
  const { delete: destroy, processing } = useForm()

  const onSubmit = (e) => {
    e.preventDefault()

    destroy(route('comments.destroy', comment), {
      onSuccess: onSuccess,
      preserveScroll: true,
    })
  }

  return (
    <div className="w-full flex flex-col space-y-4">
      <p>Are your sure you want to delete your comment?</p>
      <code className="break-words">{comment.content}</code>
      <form onSubmit={onSubmit} className="flex justify-end">
        <DangerButton processing={processing} type="submit">
          Yes, delete my Comment
        </DangerButton>
      </form>
    </div>
  )
}
