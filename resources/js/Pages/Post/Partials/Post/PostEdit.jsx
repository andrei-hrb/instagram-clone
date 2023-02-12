import InputLabel from '@/Components/InputLabel'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { useForm } from '@inertiajs/react'

export default function PostEdit({ post, onSuccess }) {
  const { data, setData, patch, reset, errors, processing } = useForm({
    description: post.description,
  })

  const submit = (e) => {
    e.preventDefault()

    patch(route('posts.update', post), {
      preserveScroll: true,
      onSuccess: () => {
        setData('description', '')
        onSuccess()
      },
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6 w-full">
      <div>
        <InputLabel for="content" value="Edit the Post" />

        <TextArea
          id="description"
          className="mt-1 block w-full border p-3"
          value={data.description}
          handleChange={(e) => setData('description', e.target.value)}
          rows={3}
        />

        <InputError className="mt-2" message={errors.description} />
      </div>

      <div className="flex items-center gap-4">
        <PrimaryButton processing={processing}>Edit the Post</PrimaryButton>
      </div>
    </form>
  )
}
