import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'
import Heart from '@/Components/Icons/Heart'
import { useState } from 'react'
import Modal from '@/Components/Modal'

export default function Index({ auth, errors, post, likes }) {
    const [openLikeModal, setOpenLikeModal] = useState(false)

    return (
        <AuthenticatedLayout
            auth={auth}
            errors={errors}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {post.user.name}'s Post #{post.id}
                </h2>
            }
        >
            <Head title={`${post.user.name}'s Post #${post.id}`} />

            <div className="py-12">
                <div className="max-w-5xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-12 text-gray-900">
                            <img
                                className="w-full rounded-sm"
                                src={post.image?.url}
                                alt={`${post.user.name}'s Post #${post.id}`}
                            />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 flex space-x-4">
                            <Link
                                href={route('posts.like', post.id)}
                                preserveScroll={true}
                            >
                                <Heart
                                    classNames={'w-6 h-6'}
                                    filled={[...likes]
                                        .map((like) => like.user_id)
                                        .includes(auth.user.id)}
                                />
                            </Link>

                            <button
                                disabled={likes.length === 0}
                                type="button"
                                onClick={() => setOpenLikeModal(true)}
                                className={`${
                                    likes.length !== 0 ? 'hover:underline' : ''
                                }`}
                            >
                                {likes.length} Like(s)
                            </button>
                            <button
                                type="button"
                                className="hover:underline"
                                onClick={() =>
                                    document
                                        .getElementById('comments')
                                        .scrollIntoView({
                                            behavior: 'smooth',
                                        })
                                }
                            >
                                0 Comment(s)
                            </button>
                            <button type="button" className="hover:underline">
                                Edit
                            </button>
                            <button type="button" className="hover:underline">
                                Delete
                            </button>
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div
                            id="comments"
                            className="p-6 text-gray-900 flex space-x-4"
                        >
                            test
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={openLikeModal}
                onClose={() => setOpenLikeModal(false)}
                maxWidth={'lg'}
            >
                <div className="overflow-y-scroll h-[80vh]">
                    <div className="sticky top-0 bg-white flex justify-between items-center pl-5 font-bold font-lg ">
                        <h5>Likes</h5>
                        <button
                            className="p-5"
                            onClick={() => setOpenLikeModal(false)}
                        >
                            &#10005;
                        </button>
                    </div>
                    <hr />
                    <ul className="flex flex-col space-y-3 p-3">
                        {[...likes].map((like) => (
                            <li key={like.user.id}>
                                <Link
                                    className="flex items-center space-x-3 hover:underline"
                                    href={route('profile.show', like.user.id)}
                                >
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src={
                                            like.user.image?.url ??
                                            '/default.png'
                                        }
                                        alt={`${like.user.name}'s Profile Picture`}
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">
                                            {like.user.name}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            @{like.user.username}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>
        </AuthenticatedLayout>
    )
}
