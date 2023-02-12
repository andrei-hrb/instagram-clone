import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'
import Modal from '@/Components/Modal'
import { useState } from 'react'

export default function Show({ auth, user }) {
    const { posts, followers, following } = user

    const title =
        auth.user.id === user.id ? 'Your Profile' : `${user.name} 's Profile`

    const [followersModalOpen, setFollowersModalOpen] = useState(false)
    const [followingModalOpen, setFollowingModalOpen] = useState(false)

    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {title}
                </h2>
            }
        >
            <Head title={title} />

            <div className="py-12">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <div className="grid text-center md:text-left place-items-center md:place-items-start md:grid-cols-2 gap-12">
                            <img
                                src={user.image?.url ?? '/default.png'}
                                alt={`${user.name}'s Profile Picture`}
                                className="h-48 w-48 rounded-full object-cover border border-4"
                            />
                            <div className="my-auto">
                                <h3 className="font-bold text-2xl">
                                    {user.name}
                                </h3>
                                <h4 className="text-lg text-slate-400">
                                    @{user.username}
                                </h4>
                                <div className="flex space-x-6 mt-4">
                                    <div>
                                        <strong>{posts.length}</strong> posts
                                    </div>
                                    <button
                                        disabled={!followers.length}
                                        onClick={() =>
                                            setFollowersModalOpen(true)
                                        }
                                    >
                                        <strong>{followers.length}</strong>{' '}
                                        followers
                                    </button>
                                    <button
                                        disabled={!following.length}
                                        onClick={() =>
                                            setFollowingModalOpen(true)
                                        }
                                    >
                                        <strong>{following.length}</strong>{' '}
                                        following
                                    </button>
                                </div>
                                <div className="flex justify-center md:justify-start mt-6">
                                    {auth.user.id === user.id && (
                                        <Link
                                            href={route('profile.edit')}
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Edit Pofile
                                        </Link>
                                    )}
                                    {auth.user.id !== user.id &&
                                        !followers.filter(
                                            (follower) =>
                                                follower.id === auth.user.id
                                        ).length && (
                                            <Follow followedId={user.id} />
                                        )}
                                    {auth.user.id !== user.id &&
                                        !!followers.filter(
                                            (follower) =>
                                                follower.id === auth.user.id
                                        ).length && (
                                            <Unfollow followedId={user.id} />
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        {posts.length > 0 && (
                            <ul className="grid grid-cols-3 gap-6">
                                {posts.map((post) => (
                                    <li key={post.id}>
                                        <Link
                                            href={route('posts.show', post.id)}
                                        >
                                            <img
                                                className="object-cover aspect-square rounded-sm hover:brightness-75 transition"
                                                src={post.image?.url}
                                                alt={post.description}
                                            />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        )}
                        {posts.length === 0 && (
                            <h3 className="py-5 text-center text-2xl font-bold">
                                No posts yet.
                            </h3>
                        )}
                    </div>
                </div>
            </div>

            <Modal
                show={followersModalOpen}
                onClose={() => setFollowersModalOpen(false)}
                maxWidth={'lg'}
            >
                <div className="overflow-y-scroll h-[80vh]">
                    <div className="sticky top-0 bg-white flex justify-between items-center pl-5 font-bold font-lg ">
                        <h5>Followers</h5>
                        <button
                            className="p-5"
                            onClick={() => setFollowersModalOpen(false)}
                        >
                            &#10005;
                        </button>
                    </div>
                    <hr />
                    <ul className="flex flex-col space-y-3 p-3">
                        {[...followers].map((follower) => (
                            <li key={follower.id}>
                                <Link
                                    className="flex items-center space-x-3 hover:underline"
                                    href={route('profile.show', follower.id)}
                                >
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src={
                                            follower.image?.url ??
                                            '/default.png'
                                        }
                                        alt={`${follower.name}'s Profile Picture`}
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">
                                            {follower.name}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            @{follower.username}
                                        </p>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </Modal>

            <Modal
                show={followingModalOpen}
                onClose={() => setFollowingModalOpen(false)}
                maxWidth={'lg'}
            >
                <div className="overflow-y-scroll h-[80vh]">
                    <div className="sticky top-0 bg-white flex justify-between items-center pl-5 font-bold font-lg ">
                        <h5>Following</h5>
                        <button
                            className="p-5"
                            onClick={() => setFollowingModalOpen(false)}
                        >
                            &#10005;
                        </button>
                    </div>
                    <hr />
                    <ul className="flex flex-col space-y-3 p-3">
                        {[...following].map((follower) => (
                            <li key={follower.id}>
                                <Link
                                    className="flex items-center space-x-3 hover:underline"
                                    href={route('profile.show', follower.id)}
                                >
                                    <img
                                        className="h-16 w-16 rounded-full"
                                        src={
                                            follower.image?.url ??
                                            '/default.png'
                                        }
                                        alt={`${follower.name}'s Profile Picture`}
                                    />
                                    <div className="flex flex-col">
                                        <p className="font-semibold">
                                            {follower.name}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            @{follower.username}
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

export function Follow({ followedId }) {
    const { post, processing } = useForm({ id: followedId })

    const followUser = (e) => {
        e.preventDefault()

        post(route('profile.follow'))
    }

    return (
        <form onSubmit={followUser}>
            <button
                disabled={processing}
                type="submit"
                className="inline-flex cursor-pointer items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Follow
            </button>
        </form>
    )
}

export function Unfollow({ followedId }) {
    const { post, processing } = useForm({ id: followedId })

    const unfollowUser = (e) => {
        e.preventDefault()

        post(route('profile.unfollow'))
    }

    return (
        <form onSubmit={unfollowUser}>
            <button
                disabled={processing}
                type="submit"
                className="inline-flex cursor-pointer items-center px-4 py-2 bg-white border border-gray-800 border-2 rounded-md font-semibold text-xs text-gray-800 hover:text-gray-100 uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition ease-in-out duration-150"
            >
                Unfollow
            </button>
        </form>
    )
}
