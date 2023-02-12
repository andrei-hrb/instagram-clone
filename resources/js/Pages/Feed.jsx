import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import {Head, Link, router} from '@inertiajs/react'
import PostImage from "@/Pages/Post/Partials/Post/PostImage";
import PostInfo from "@/Pages/Post/Partials/Post/PostInfo";
import ReactTimeAgo from "react-time-ago";
import {useState} from "react";
import CustomModalUser from "@/Components/CustomModalUser";
import CustomModal from "@/Components/CustomModal";

export default function Feed({ auth, errors, posts }) {
  const [currentPost, setCurrentPost] = useState({})
  const [openLikeModal, setOpenLikeModal] = useState(false)

  return (
    <AuthenticatedLayout
      auth={auth}
      errors={errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Feed</h2>}
    >
      <Head title="Feed" />

      <div className="py-12">
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
          {posts.map(post => (
          <div  key={post.id} className="bg-white mb-6 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="text-gray-900">
                <div>
                  <Link className="flex items-center space-x-4 pb-6 md:pb-0 pt-6 px-6" href={route('profile.show', post.user)}>
                    <img className="rounded-full w-16 h-16" src={post.user.image?.url ?? '/default.png'} alt={`${post.user.name}'s Profile Picture`}/>
                    <div className="flex flex-col">
                      <p className="font-bold">{post.user.name}</p>
                      <small className="font-slate-600"><ReactTimeAgo date={new Date(post.created_at)} /></small>
                    </div>
                  </Link>
                  <PostImage post={post} />
                  {(post.description && post.description !== '') &&
                    <p className="pt-6 md:pt-0 px-6"><Link className="font-black" href={route('profile.show', post.user)}>@{post.user.username}</Link> {post.description}</p>
                  }
                  {!(post.description && post.description !== '') && <div className="md:-mt-6"></div>}
                  <PostInfo post={post} auth={auth} onLikesClick={() => {
                    setCurrentPost(post)
                    setOpenLikeModal(true)
                  }} onCommentsClick={() => router.visit(route('posts.show', post))} />
                </div>
            </div>
          </div>
          ))}
        </div>
      </div>

        <CustomModal show={openLikeModal} onClose={() => setOpenLikeModal(false)} title="Likes">
          <ul className="flex flex-col space-y-3 p-3">
            {JSON.stringify(currentPost) !== '{}' &&
              [...currentPost.likes].map((like) => (
                <CustomModalUser key={like.user.id} user={like.user} />
              ))
            }
          </ul>
        </CustomModal>
    </AuthenticatedLayout>
  )
}
