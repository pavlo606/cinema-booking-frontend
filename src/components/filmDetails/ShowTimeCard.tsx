import type { Screening } from '@/dto/screening.dto'

interface Props {
  showtime: Screening
  onSelect: () => void
}

export const ShowtimeCard = ({ showtime, onSelect }: Props) => {
  const date = new Date(showtime.startTime)
  const timeStr = date.toLocaleTimeString('uk-UA', {
    timeZone: 'UTC',
    hour: '2-digit',
    minute: '2-digit',
  })
  const dayStr = date.toLocaleDateString('en-EN', {
    timeZone: 'UTC',
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })

  const minPrice = Math.min(...showtime.seatPrices.map((price) => +price.price))
  const maxPrice = Math.max(...showtime.seatPrices.map((price) => +price.price))

  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-bgDark border border-border rounded-xl p-4 hover:border-accent transition-colors"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="text-text-primary font-semibold">{dayStr}</span>
        <span className="text-text-secondary text-sm">{showtime.hall.name}</span>
      </div>
      <div className="text-2xl font-semibold text-accent mb-2">{timeStr}</div>
      {showtime.seatPrices.length > 0 && (
        <div className="text-sm text-textMuted">
          Price:{' '}
          <span className="text-text-primary font-medium">
            {minPrice}-{maxPrice} ₴
          </span>
        </div>
      )}
    </div>
  )
}
