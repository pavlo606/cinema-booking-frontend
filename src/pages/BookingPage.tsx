import { ScreeningAPI } from '@/api/screening.api'
import SeatComponent from '@/components/booking/SeatComponent'
import type { Screening } from '@/dto/screening.dto'
import type { Seat } from '@/dto/seat.dto'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function BookingPage() {
  const { id: screeningId } = useParams()
  const [seats, setSeats] = useState<Seat[]>([])
  const [selected, setSelcted] = useState<number | undefined>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (screeningId) {
      ScreeningAPI.getById(+screeningId).then((data: Screening) => {
        setSeats(data.hall.seats)
        setLoading(false)
      })
    }
  }, [screeningId])

  //   const toggleSeat = (id: string) => {
  //     setSeats((prev) =>
  //       prev.map((s) =>
  //         s.id === id && s.status === "available"
  //           ? { ...s, status: "selected" }
  //           : s.status === "selected" && s.id === id
  //           ? { ...s, status: "available" }
  //           : s
  //       )
  //     );
  //   };

  //   const handleBooking = () => {
  //     const selectedSeats = seats.filter((s) => s.status === "selected");
  //     if (selectedSeats.length === 0) return alert("Оберіть хоча б одне місце!");

  //     fetch(`/api/bookings`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         showtimeId,
  //         seats: selectedSeats.map((s) => s.id),
  //       }),
  //     }).then(() => alert("Бронювання успішне ✅"));
  //   };

  if (loading) return <p className="text-center text-text-secondary">Завантаження...</p>

  // Групуємо по рядах
  console.log(seats)
  const rows = Object.groupBy(seats, (s) => s.row)

  return (
    <div className="flex flex-col items-center min-h-[80vh] p-8">
      <h1 className="text-3xl font-semibold text-gray-100 mb-8">Choose seat</h1>

      <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
        <div className="text-center text-gray-400 mb-4">Screen</div>
        <div className="bg-gray-600 h-1 w-full mb-6" />

        <div className="space-y-3">
          {Object.entries(rows).map(([row, seats]) => (
            <div key={row} className="flex justify-center gap-2">
              {seats?.map((seat) => (
                <SeatComponent onClick={() => setSelcted(seat.id)} seat={seat} selected={selected} />
              ))}
            </div>
          ))}
        </div>
      </div>

      <button
        // onClick={handleBooking}
        className="mt-8 bg-primary/80 hover:bg-primary/50 text-white font-semibold px-6 py-3 rounded-xl transition"
      >
        Submit booking
      </button>
    </div>
  )
}
