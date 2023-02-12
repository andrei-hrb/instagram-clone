import InputLabel from '@/Components/InputLabel'
import TextArea from '@/Components/TextArea'
import InputError from '@/Components/InputError'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import { useForm } from '@inertiajs/react'

export default function CommentCreate({ post }) {
  const {
    data,
    setData,
    post: postRequest,
    reset,
    errors,
    processing,
    recentlySuccessful,
  } = useForm({
    content: '',
  })

  const submit = (e) => {
    e.preventDefault()

    postRequest(route('comments.store', post), {
      preserveScroll: true,
      onSuccess: () => reset(),
    })
  }

  return (
    <form onSubmit={submit} className="space-y-6 w-full">
      <div>
        <InputLabel for="content" value="Add a new Comment" />

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
        <PrimaryButton processing={processing}>Post the Comment</PrimaryButton>

        <Transition
          show={recentlySuccessful}
          enterFrom="opacity-0"
          leaveTo="opacity-0"
          className="transition ease-in-out"
        >
          <p className="text-sm text-gray-600">Commented.</p>
        </Transition>
      </div>
    </form>
  )
}
