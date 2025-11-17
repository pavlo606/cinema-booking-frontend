import { HallAPI } from '@/api/hall.api'
import { SeatCategoryAPI } from '@/api/seat-category.api'
import { SeatAPI } from '@/api/seat.api'
import SeatComponent from '@/components/booking/SeatComponent'
import type { Hall } from '@/dto/hall.dto'
import type { SeatCategory } from '@/dto/seat-category.dto'
import { Plus, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'react-toastify'
import IconButton from '@/components/ui/IconButton'

type SeatCreateDTO = {
  row: number
  column: number
  categoryId: number
  id?: number
  hallId?: number
  category?: SeatCategory
}

const AdminHallDetails = () => {
  const { id: hallId } = useParams()
  const navigate = useNavigate()

  const [hall, setHall] = useState<Hall>()
  const [seatCategories, setSeatCategories] = useState<SeatCategory[]>()
  const [seats, setSeats] = useState<SeatCreateDTO[]>([])
  const [maxCols, setMaxCols] = useState<number>(0)
  const [maxRows, setMaxRows] = useState<number>(0)
  const [isSeatEdit, setIsSeatEdit] = useState<boolean>(false)

  useEffect(() => {
    updateHall()
  }, [])

  useEffect(() => {
    const rows = Object.groupBy(seats, (s) => s.row)
    setMaxRows(Math.max(...Object.entries(rows).map(([row, _]) => +row)))
    setMaxCols(
      Math.max(
        ...Object.entries(rows).map(([_, seats]) => {
          if (!seats) return 0
          return Math.max(...seats?.map((seat) => seat.column))
        })
      )
    )
  }, [seats])

  useEffect(() => {
    if (maxCols < 1) setMaxCols(1)
    if (maxRows < 1) setMaxRows(1)
  }, [maxCols, maxRows])

  const updateHall = () => {
    if (hallId) {
      HallAPI.getById(+hallId).then((res: Hall) => {
        setHall(res)
        setSeats(res.seats)
      })
    }
    SeatCategoryAPI.get().then((res: SeatCategory[]) => {
      setSeatCategories(res)
    })
  }

  const handleRightClick = (row: number, column: number) => {
    setSeats(seats.filter((seat) => seat.row !== row || seat.column !== column))
  }

  const handleLeftClick = (seat: SeatCreateDTO) => {
    if (!seatCategories || !seat.category) return

    let index = 0
    for (let i = 0; i < seatCategories.length; i += 1) {
      if (seatCategories[i].id === seat.category.id) {
        index = i
        break
      }
    }
    const nextIndex = (index + 1) % seatCategories.length
    const nextCategory = seatCategories[nextIndex]

    setSeats((prev) =>
      prev.map((s) =>
        s.row === seat.row && s.column === seat.column
          ? { ...s, category: nextCategory, categoryId: nextCategory.id }
          : s
      )
    )
  }

  const handleAddSeat = (row: number, column: number) => {
    if (!seatCategories) return
    const category = seatCategories[0]
    setSeats([...seats, { row, column, categoryId: 4, category }])
  }

  const startEdit = () => {
    setSeats(hall?.seats || [])
    setIsSeatEdit(true)
  }

  const endEdit = () => {
    setIsSeatEdit(false)
  }

  const confirmEdit = () => {
    if (!hall) return

    SeatAPI.updateForHall({
      hallId: hall.id,
      seats: seats.map((seat) => ({
        row: seat.row,
        column: seat.column,
        categoryId: seat.categoryId,
      })),
    })
      .then(() => {
        toast.success('Successfuly updated')
        updateHall()
        endEdit()
      })
      .catch(() => {
        toast.error('Something went wrong')
      })
  }

  if (!hall) return <div>...Loading</div>

  return (
    <div>
      <IconButton icon={<ArrowLeft size={18} />} onClick={() => navigate('/admin/halls')} />
      <h2 className="text-2xl font-bold text-text-primary">{hall.name}</h2>
      <div className="flex flex-col items-center">
        <div className="bg-gray-800 rounded-2xl p-6 shadow-lg">
          {isSeatEdit ? (
            <>
              <div className="flex justify-end">
                <button
                  onClick={() => setMaxCols(maxCols + 1)}
                  className="rounded-md text-sm font-medium transition hover:bg-surface cursor-pointer"
                >
                  <Plus />
                </button>
              </div>
              <div className="flex">
                <div className="flex items-end">
                  <button
                    onClick={() => setMaxRows(maxRows + 1)}
                    className="rounded-md text-sm font-medium transition hover:bg-surface cursor-pointer"
                  >
                    <Plus />
                  </button>
                </div>

                <div className="grid gap-2 items-center justify-items-center">
                  {Array.from({ length: maxRows }, (_, i) => i + 1).map((row) =>
                    Array.from({ length: maxCols }, (_, i) => i + 1).map((col) => (
                      <div
                        style={{ gridRow: row, gridColumn: col }}
                        onContextMenu={(e) => {
                          e.preventDefault()
                          handleRightClick(row, col)
                        }}
                      >
                        {seats.some((seat) => seat.row === row && seat.column === col) ? (
                          <SeatComponent
                            key={row * 10 + col}
                            onClick={() =>
                              handleLeftClick(
                                seats.filter((seat) => seat.row === row && seat.column === col)[0]
                              )
                            }
                            seat={
                              seats.filter((seat) => seat.row === row && seat.column === col)[0]
                            }
                            hoverDisable
                          />
                        ) : (
                          <button
                            onClick={() => handleAddSeat(row, col)}
                            className="w-6 h-6 rounded-md text-sm font-medium transition border border-gray-600 hover:bg-surface"
                          ></button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-center text-gray-400 mb-4">Screen</div>
              <div className="bg-gray-600 h-1 w-full mb-6" />

              <div className="grid gap-2">
                {hall.seats.map((seat) => (
                  <SeatComponent key={seat.id} seat={seat} />
                ))}
                {hall.seats.length < 1 && 'No seats'}
              </div>
            </>
          )}
        </div>
        {isSeatEdit ? (
          <div>
            <button
              onClick={confirmEdit}
              className="mt-8 bg-green-600/60 hover:bg-green-600/40 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:bg-primary/50 disabled:cursor-default"
            >
              Confirm Edit
            </button>
            <button
              onClick={endEdit}
              className="mt-8 bg-primary/80 hover:bg-primary/50 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:bg-primary/50 disabled:cursor-default"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={startEdit}
            className="mt-8 bg-primary/80 hover:bg-primary/50 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer disabled:bg-primary/50 disabled:cursor-default"
          >
            Edit seats
          </button>
        )}
      </div>
      <div>
        <h2 className="text-2xl font-bold text-text-primary">Categories</h2>
        <div className="flex flex-wrap gap-4 mt-8">
          {seatCategories &&
            seatCategories.map((category) => (
              <div key={category.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-md`}
                  style={{ backgroundColor: category.color }}
                ></div>
                <p className="ml-1">- {category.name}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

export default AdminHallDetails
