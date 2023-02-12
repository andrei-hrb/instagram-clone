import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link } from '@inertiajs/react'

export default function Index({ auth, errors, post }) {
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
                        <div className="p-6 text-gray-900">
                            <img
                                className="w-full rounded-sm"
                                src={post.image?.url}
                                alt={`${post.user.name}'s Post #${post.id}`}
                            />
                        </div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Posted by:</div>
                        <hr />
                        <div className="p-6 text-gray-900">test</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
