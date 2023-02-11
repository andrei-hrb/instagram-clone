import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import InputLabel from '@/Components/InputLabel'
import ImageInput from '@/Components/ImageInput'
import InputError from '@/Components/InputError'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { Transition } from '@headlessui/react'
import { useEffect, useState } from 'react'
import TextArea from '@/Components/TextArea'

export default function Create({ auth, status }) {
    const {
        data,
        setData,
        post,
        reset,
        errors,
        processing,
        defaults,
        recentlySuccessful,
    } = useForm({
        description: '',
        image: null,
    })

    const [previewImage, setPreviewImage] = useState(null)

    const submit = (e) => {
        e.preventDefault()

        post(route('posts.store'), data, {
            forceFormData: true,
        })
    }

    useEffect(() => {
        setPreviewImage(null)
        reset()
    }, [recentlySuccessful])

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create a new Post
                </h2>
            }
        >
            <Head title="Create a new Post" />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <InputLabel for="image" value="Image" />

                                <div className="flex flex-col gap-5 mt-1">
                                    {previewImage !== null && (
                                        <img
                                            src={previewImage}
                                            className="h-full min-h-36 w-full rounded-lg border object-cover"
                                            alt="Post"
                                        />
                                    )}
                                    <ImageInput
                                        id="image"
                                        className="block w-full"
                                        handleChange={(e) => {
                                            setData('image', e.target.files[0])

                                            const reader = new FileReader()
                                            reader.onload = (file) =>
                                                setPreviewImage(
                                                    file.target.result
                                                )
                                            reader.readAsDataURL(
                                                e.target.files[0]
                                            )
                                        }}
                                    />
                                </div>

                                <InputError
                                    className="mt-2"
                                    message={errors.image}
                                />
                            </div>

                            <div>
                                <InputLabel
                                    for="description"
                                    value="Description"
                                />

                                <TextArea
                                    id="description"
                                    className="mt-1 block w-full border p-3"
                                    value={data.description}
                                    handleChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows={3}
                                />

                                <InputError
                                    className="mt-2"
                                    message={errors.description}
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <PrimaryButton processing={processing}>
                                    Post
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enterFrom="opacity-0"
                                    leaveTo="opacity-0"
                                    className="transition ease-in-out"
                                >
                                    <p className="text-sm text-gray-600">
                                        Posted.
                                    </p>
                                </Transition>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
