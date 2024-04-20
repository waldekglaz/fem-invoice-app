import { Button } from '.'

type ModalProps = {
  onCancel: () => void
  onDelete: () => void
}

function Modal({ onCancel, onDelete }: ModalProps) {
  return (
    <div className="absolute bg-slate-500 bg-opacity-90 top-0 left-0 right-0  flex justify-center items-center z-10 min-h-full">
      <div>
        <h2 className="md:text-2xl font-bold text-white mb-12 text-center">
          Are you sure?
        </h2>
        <div className="flex justify-center gap-4">
          <Button text="Cancel" role="other" onClick={onCancel} />
          <Button text="Delete Invoice" role="delete" onClick={onDelete} />
        </div>
      </div>
    </div>
  )
}

export default Modal
