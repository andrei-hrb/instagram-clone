import InputLabel from '@/Components/InputLabel'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'

export default function CommentEdit({ comment, onSuccess }) {
  const { data, setData, patch, reset, errors, processing } = useForm({
    content: comment.content,
  })

  const submit = (e) => {
    e.preventDefault()

    patch(route('comments.update', comment), {
      preserveScroll: true,
      onSuccess: () => {
        setData('content', '')
        onSuccess()
      },
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6 w-full">
      <div>
        <InputLabel for="content" value="Edit the Comment" />

        <TextArea
          id="content"
          className="mt-1 block w-full border p-3"
          value={data.content}
          handleChange={(e) => setData('content', e.target.value)}
          rows={3}
        />

        <InputError className="mt-2" message={errors.content} />
      </div>

      <div className="flex items-center gap-4">
        <PrimaryButton processing={processing}>Edit the Comment</PrimaryButton>
      </div>
    </form>
  )
}
