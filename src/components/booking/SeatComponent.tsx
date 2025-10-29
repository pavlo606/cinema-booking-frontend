import type { Seat } from '@/dto/seat.dto'

interface SeatPrams {
  seat: Seat
  selected?: number | undefined
  onClick?: () => void
}

const SeatComponent = ({ seat, selected, onClick }: SeatPrams) => {
  let defaultColor = seat.category.color || 'bg-gray-700'
  console.log(defaultColor)

  return (
    <button
      onClick={onClick}
      key={seat.id}
      // onClick={() => toggleSeat(seat.id)}
      // disabled={seat.status === 'booked'}
      className={`
        w-8 h-8 rounded-md text-sm font-medium transition hover:bg-primary/60
        bg-${defaultColor}
        ${selected === seat.id && 'bg-primary/50'}
      `}
    >
      {seat.number}
    </button>
  )
}

export default SeatComponent
