import Modal from '@/Components/Modal'

export default function CustomModal({ children, show, onClose, title, list = true }) {
  return (
    <Modal show={show} onClose={onClose} maxWidth={'lg'}>
      <div className={list === true ? 'overflow-y-scroll h-[80vh]' : ''}>
        <div className="sticky top-0 bg-white flex justify-between items-center pl-5 font-bold font-lg ">
          <h5>{title}</h5>
          <button className="p-5" onClick={onClose}>
            &#10005;
          </button>
        </div>
        <hr />
        {children}
      </div>
    </Modal>
  )
}
