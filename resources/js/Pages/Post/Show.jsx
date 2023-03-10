import { useEffect, useState } from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, router } from '@inertiajs/react'
import CommentCreate from '@/Pages/Post/Partials/Comment/CommentCreate'
import CommentEdit from '@/Pages/Post/Partials/Comment/CommentEdit'
import Comment from '@/Pages/Post/Partials/Comment/Comment'
import CustomModal from '@/Components/CustomModal'
import CustomModalUser from '@/Components/CustomModalUser'
import CommentDelete from '@/Pages/Post/Partials/Comment/CommentDelete'
import PostEdit from '@/Pages/Post/Partials/Post/PostEdit'
import PostDelete from '@/Pages/Post/Partials/Post/PostDelete'
import PostImage from '@/Pages/Post/Partials/Post/PostImage'
import PostInfo from '@/Pages/Post/Partials/Post/PostInfo'

export default function Index({ auth, errors, post }) {
  const [openLikeModal, setOpenLikeModal] = useState(false)
  const [currentComment, setCurrentComment] = useState({})
  const [openCommentEditModal, setOpenCommentEditModal] = useState(false)
  const [openCommentDeleteModal, setOpenCommentDeleteModal] = useState(false)
  const [openPostEditModal, setOpenPostEditModal] = useState(false)
  const [openPostDeleteModal, setOpenPostDeleteModal] = useState(false)

  const postHasDescription = post.description !== null
  const postHasComments = post.comments.length > 0

  useEffect(() => {
    Echo.channel(`post.${post.id}`).listen('UpdatePost', (e) => {
      if (e.user_id !== auth.user.id) {
        router.reload({
          preserveState: true,
          preserveScroll: true,
        })
      }
    })

    return () => {
      Echo.leaveAllChannels()
    }
  }, [])

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
        <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-6">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <PostImage post={post} />
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <PostInfo
              post={post}
              auth={auth}
              onLikesClick={() => setOpenLikeModal(true)}
              onCommentsClick={() =>
                document.getElementById('comments').scrollIntoView({
                  behavior: 'smooth',
                })
              }
            />
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div id="comments" className="text-gray-900 flex space-x-4">
              <ul className="flex flex-col w-full">
                <li className="odd:bg-slate-600 text-slate-50 p-6">
                  <Comment
                    comment={{
                      content: postHasDescription ? post.description : '',
                      user: post.user,
                      created_at: post.created_at,
                      updated_at: post.updated_at,
                    }}
                  />
                </li>
                {postHasComments &&
                  post.comments.map((comment) => (
                    <li className="odd:bg-slate-200 p-6" key={comment.id}>
                      <Comment comment={comment} />
                      {comment.user.id === auth.user.id && (
                        <div className="flex justify-end space-x-6 pr-6">
                          <button
                            className="text-sm"
                            onClick={() => {
                              setCurrentComment(comment)
                              setOpenCommentEditModal(true)
                            }}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => {
                              setCurrentComment(comment)
                              setOpenCommentDeleteModal(true)
                            }}
                            className="text-sm text-red-500"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 flex space-x-4">
              <CommentCreate post={post} />
            </div>
          </div>
          {post.user.id === auth.user.id && (
            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 flex space-x-6">
                <button type="button" className="hover:underline" onClick={() => setOpenPostEditModal(true)}>
                  Edit Post
                </button>
                <button
                  type="button"
                  className="hover:underline text-red-500"
                  onClick={() => setOpenPostDeleteModal(true)}
                >
                  Delete Post
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <CustomModal show={openLikeModal} onClose={() => setOpenLikeModal(false)} title="Likes">
        <ul className="flex flex-col space-y-3 p-3">
          {[...post.likes].map((like) => (
            <CustomModalUser key={like.user.id} user={like.user} />
          ))}
        </ul>
      </CustomModal>

      <CustomModal
        show={openCommentEditModal}
        onClose={() => setOpenCommentEditModal(false)}
        title="Edit Comment"
        list={false}
      >
        <div className="p-6">
          <CommentEdit onSuccess={() => setOpenCommentEditModal(false)} comment={currentComment} />
        </div>
      </CustomModal>

      <CustomModal
        show={openCommentDeleteModal}
        onClose={() => setOpenCommentDeleteModal(false)}
        title="Delete Comment"
        list={false}
      >
        <div className="p-6">
          <CommentDelete onSuccess={() => setOpenCommentDeleteModal(false)} comment={currentComment} />
        </div>
      </CustomModal>

      <CustomModal show={openPostEditModal} onClose={() => setOpenPostEditModal(false)} title="Edit Post" list={false}>
        <div className="p-6">
          <PostEdit onSuccess={() => setOpenPostEditModal(false)} post={post} />
        </div>
      </CustomModal>

      <CustomModal
        show={openPostDeleteModal}
        onClose={() => setOpenPostDeleteModal(false)}
        title="Delete Post"
        list={false}
      >
        <div className="p-6">
          <PostDelete onSuccess={() => router.visit(route('profile.show', auth.user))} post={post} />
        </div>
      </CustomModal>
    </AuthenticatedLayout>
  )
}
