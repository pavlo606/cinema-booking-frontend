import { X, Check } from 'lucide-react'

interface SubmitButtonsParams {
  onSubmit: () => void
  onCancel: () => void
  sumbitIcon?: React.ReactNode
  cancelIcon?: React.ReactNode
}

const SubmitButtons = ({ onCancel, onSubmit, sumbitIcon, cancelIcon }: SubmitButtonsParams) => {
  if (!sumbitIcon) sumbitIcon = <Check size={18} />
  if (!cancelIcon) cancelIcon = <X size={18} />

  return (
    <div>
      <button
        onClick={onSubmit}
        className="text-green-400 hover:text-blue-300"
      >
        {sumbitIcon}
      </button>
      <button
        onClick={onCancel}
        className="text-red-400 hover:text-blue-300"
      >
        {cancelIcon}
      </button>
    </div>
  )
}

export default SubmitButtons
