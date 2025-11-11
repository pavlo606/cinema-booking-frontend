interface EditButtonParams {
  onClick: () => void
  icon: React.ReactNode
  color?: string
}

const IconButton = ({ onClick, icon, color }: EditButtonParams) => {
  if (!color) color = 'text-blue'
  return (
    <button onClick={onClick} className={`${color}-400 hover:${color}-300`}>
      {icon}
    </button>
  )
}

export default IconButton
