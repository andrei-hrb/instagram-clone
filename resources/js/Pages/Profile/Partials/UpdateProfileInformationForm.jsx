import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import ImageInput from '@/Components/ImageInput'
import { Link, useForm, usePage } from '@inertiajs/react'
import { Transition } from '@headlessui/react'
import { useState } from 'react'

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className,
}) {
    const user = usePage().props.auth.user

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
            username: user.username,
            image: null,
        })

    const [previewImage, setPreviewImage] = useState(
        user.image?.url === null || user.image?.url === undefined
            ? '/default.png'
            : user.image?.url
    )

    const submit = (e) => {
        e.preventDefault()

        post(route('profile.update'), data, {
            forceFormData: true,
        })
    }

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel for="name" value="Name" />
                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        handleChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel for="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        handleChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="email"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="text-sm mt-2 text-gray-800">
                            Your email address is unverified.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 font-medium text-sm text-green-600">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

                <div>
                    <InputLabel for="username" value="Username" />

                    <TextInput
                        id="username"
                        type="text"
                        className="mt-1 block w-full"
                        value={data.username}
                        handleChange={(e) =>
                            setData('username', e.target.value)
                        }
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.username} />
                </div>

                <div>
                    <InputLabel for="image" value="Image" />

                    <div className="flex gap-5 items-center mt-1">
                        <img
                            src={previewImage}
                            className="h-24 w-24 rounded-full border object-cover"
                            alt="Image"
                        />

                        <ImageInput
                            id="image"
                            className="block w-full"
                            handleChange={(e) => {
                                setData('image', e.target.files[0])

                                const reader = new FileReader()
                                reader.onload = (file) =>
                                    setPreviewImage(file.target.result)

                                if (e.target.files[0] instanceof Blob) {
                                    reader.readAsDataURL(e.target.files[0])
                                }
                            }}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.image} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton processing={processing}>Save</PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enterFrom="opacity-0"
                        leaveTo="opacity-0"
                        className="transition ease-in-out"
                    >
                        <p className="text-sm text-gray-600">Saved.</p>
                    </Transition>
                </div>
            </form>
        </section>
    )
}
