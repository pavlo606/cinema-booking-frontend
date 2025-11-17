import { FilmsAPI } from '@/api/films.api'
import { HallAPI } from '@/api/hall.api'
import { ScreeningAPI } from '@/api/screening.api'
import CustomSelect from '@/components/ui/CustomSelect'
import IconButton from '@/components/ui/IconButton'
import Input from '@/components/ui/Input'
import type { Film } from '@/dto/film.dto'
import type { Hall } from '@/dto/hall.dto'
import type { Screening } from '@/dto/screening.dto'
import { Check, Pencil, Plus, Trash2, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router'

const AdminScreeningPage = () => {
  const navigate = useNavigate()

  const [screenings, setScreenings] = useState<Screening[]>([])
  const [films, setFilms] = useState<Film[]>([])
  const [halls, setHalls] = useState<Hall[]>([])
  const [editId, setEditId] = useState<number | null>(null)
  const [inputFilm, setInputFilm] = useState<Film | null>(null)
  const [inputHall, setInputHall] = useState<Hall | null>(null)
  const [inputDate, setInputDate] = useState<string>('')
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false)

  useEffect(() => {
    update()
  }, [])

  const update = () => {
    ScreeningAPI.get().then((res: Screening[]) => {
      setScreenings(res)
      console.log(res)
    })
    FilmsAPI.get().then((res: Film[]) => {
      setFilms(res)
    })
    HallAPI.get().then((res: Hall[]) => {
      setHalls(res)
    })
  }

  const startEdit = (id: number) => {
    setIsCreateMode(false)
    setEditId(id)
    const selectedScreening = screenings.find((screening) => screening.id === id)
    if (selectedScreening?.film) setInputFilm(selectedScreening.film)
    if (selectedScreening?.hall) setInputHall(selectedScreening.hall)
    if (selectedScreening?.startTime) {
      const date = new Date(selectedScreening.startTime)
      setInputDate(
        `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`
      )
    }
  }

  const endEdit = () => {
    setIsCreateMode(false)
    setEditId(null)
  }

  const confirmUpdate = () => {
    if (!editId || !inputFilm || !inputHall || !inputDate) return

    ScreeningAPI.update(editId, {
      filmId: inputFilm.id,
      hallId: inputHall.id,
      startTime: new Date(inputDate).toISOString(),
    }).then(() => {
      setEditId(null)
      update()
    })
  }

  const confirmCreate = () => {
    if (!inputFilm || !inputHall || !inputDate) return

    ScreeningAPI.create({
      filmId: inputFilm.id,
      hallId: inputHall.id,
      startTime: new Date(inputDate).toISOString(),
      endTime: new Date(inputDate).toISOString(),
    }).then(() => {
      setEditId(null)
      setIsCreateMode(false)
      update()
    })
  }

  const handleAddFilm = () => {
    setIsCreateMode(true)
    setEditId(null)
    setInputDate('')
    setInputFilm(null)
    setInputHall(null)
  }

  return (
    <div className="min-h-screen bg-bgDark text-textPrimary p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Screenings</h2>
        <button
          onClick={handleAddFilm}
          className="flex items-center gap-2 bg-accent text-black px-4 py-2 rounded-lg hover:opacity-90 transition"
        >
          <Plus size={18} />
          Add Screening
        </button>
      </div>

      <div className="bg-surface p-4 rounded-xl shadow-xl">
        <table className="w-full text-left">
          <thead className="text-textSecondary border-b border-gray-700">
            <tr>
              <th className="py-3">Film</th>
              <th className="py-3">hall</th>
              <th className="py-3">Date and Time</th>
              <th className="py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isCreateMode && (
              <tr>
                <td className="py-4">
                  <CustomSelect<Film>
                    className="w-48"
                    options={films}
                    value={inputFilm}
                    onChange={(newValue: any) => setInputFilm(newValue)}
                  />
                </td>
                <td>
                  <CustomSelect<Hall>
                    className="w-48"
                    options={halls}
                    value={inputHall}
                    onChange={(newValue: any) => setInputHall(newValue)}
                  />
                </td>
                <td>
                  <Input
                    type="datetime-local"
                    value={inputDate}
                    onChange={(e) => setInputDate(e.target.value)}
                  />
                </td>
                <td className="py-3 px-3 text-right flex gap-2 justify-end">
                  <IconButton
                    onClick={confirmCreate}
                    icon={<Check size={18} />}
                    color="text-green"
                  />
                  <IconButton onClick={endEdit} icon={<X size={18} />} color="text-red" />
                </td>
              </tr>
            )}
            {screenings.map((s) => (
              <tr key={s.id} className="border-b border-gray-800">
                {editId === s.id ? (
                  <>
                    <td className="py-4">
                      <CustomSelect<Film>
                        className="w-48"
                        options={films}
                        value={inputFilm}
                        onChange={(newValue: any) => setInputFilm(newValue)}
                      />
                    </td>
                    <td>
                      <CustomSelect<Hall>
                        className="w-48"
                        options={halls}
                        value={inputHall}
                        onChange={(newValue: any) => setInputHall(newValue)}
                      />
                    </td>
                    <td>
                      <Input
                        type="datetime-local"
                        value={inputDate}
                        onChange={(e) => setInputDate(e.target.value)}
                      />
                    </td>
                    <td className="py-3 px-3 text-right flex gap-2 justify-end">
                      <IconButton
                        onClick={confirmUpdate}
                        icon={<Check size={18} />}
                        color="text-green"
                      />
                      <IconButton onClick={endEdit} icon={<X size={18} />} color="text-red" />
                    </td>
                  </>
                ) : (
                  <>
                    <td className="py-4">
                      <Link to={`/admin/films/${s.filmId}/edit`}>{s.film.name}</Link>
                    </td>
                    <td>
                      <Link to={`/admin/halls/${s.hallId}/edit`}>{s.hall.name}</Link>
                    </td>
                    <td>{new Date(s.startTime).toLocaleString()}</td>
                    <td className="py-3 px-3 text-right flex gap-2 justify-end">
                      <IconButton
                        onClick={() => startEdit(s.id)}
                        icon={<Pencil size={18} />}
                        color="text-blue"
                      />
                      <IconButton
                        onClick={() => null}
                        icon={<Trash2 size={18} />}
                        color="text-red"
                      />
                    </td>
                  </>
                )}
              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminScreeningPage
