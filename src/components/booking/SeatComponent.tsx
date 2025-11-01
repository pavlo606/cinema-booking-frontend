import type { Seat } from '@/dto/seat.dto'

interface SeatPrams {
  seat: Seat
  selected?: number | undefined
  onClick?: () => void
  disabled?: boolean
}

const SeatComponent = ({ seat, selected, onClick, disabled }: SeatPrams) => {
  let defaultColor = seat.category.color || 'bg-gray-700'

  return (
    <button
      onClick={onClick}
      key={seat.id}
      disabled={disabled}
      className={`
        w-8 h-8 rounded-md text-sm font-medium transition hover:bg-primary/60 cursor-pointer disabled:bg-gray-900 disabled:hoover:bg-gray-900 disabled:cursor-default
        ${defaultColor}
        ${selected === seat.id && 'bg-primary/50'}
      `}
    >
    </button>
  )
}

export default SeatComponent
