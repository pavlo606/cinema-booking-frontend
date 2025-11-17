import type { Seat } from '@/dto/seat.dto'
import './SeatComponent.css'

interface SeatPrams {
  seat: Partial<Seat>
  selected?: number | undefined
  onClick?: () => void
  disabled?: boolean
  hoverDisable?: boolean
}

const SeatComponent = ({ seat, selected, onClick, disabled, hoverDisable }: SeatPrams) => {
  const defaultColor = seat.category?.color || '#364153'

  const seatStyles = {
    gridRow: seat.row,
    gridColumn: seat.column,
    '--seat-color': defaultColor,
  }

  return (
    <button
      onClick={onClick}
      key={seat.id}
      disabled={disabled}
      className={`${hoverDisable ? "seat-without-hover" : "seat"} ${seat.id && selected === seat.id && 'selected'}`}
      style={seatStyles}
    ></button>
  )
}

export default SeatComponent
