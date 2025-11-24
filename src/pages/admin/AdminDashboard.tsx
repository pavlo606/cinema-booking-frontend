import { DashboardInfoAPI } from '@/api/dashboard-info.api'
import { ReportsAPI } from '@/api/reports.api';
import { OccupancyTable } from '@/components/reports/OccupancyTable';
import ReportFilters from '@/components/reports/ReportFilters';
import { RevenueTable } from '@/components/reports/RevenueTable';
import { TicketsSoldTable } from '@/components/reports/TicketsSoldTable';
import { useEffect, useState } from 'react'

type ModeType = "tickets" | "revenue" | "occupancy"

const AdminDashboard = () => {
  const [countInfo, setCountInfo] = useState<{ title: string; value: number }[]>([
    { title: 'Films', value: 0 },
    { title: 'Screenings', value: 0 },
    { title: 'Users', value: 0 },
    { title: 'Bookings', value: 0 },
  ])

  useEffect(() => {
    DashboardInfoAPI.getCount().then((res) => {
      setCountInfo([
        { title: 'Films', value: res.filmsCount },
        { title: 'Screenings', value: res.screeningsCount },
        { title: 'Users', value: res.usersCount },
        { title: 'Bookings', value: res.bookingsCount },
      ])
    })
  }, [])

  const [filters, setFilters] = useState({
    from: "",
    to: "",
  });

  const [mode, setMode] = useState<ModeType>("tickets"); // tickets | revenue | occupancy

  const [soldTicketsData, setSoldTicketsData] = useState<any>()
  const [revenueData, setRevenueData] = useState<any>()
  const [occupancyData, setOccupancyData] = useState<any>()


  const generateReport = () => {
    const _filters = Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != ''))
    
    if (mode === "tickets") {
      ReportsAPI.getTicketsSoldReport(_filters).then((res) => {
        setSoldTicketsData(res)
      })
    }
    else if (mode === "revenue") {
      ReportsAPI.getRevenueReport(_filters).then((res) => {
        setRevenueData(res)
      })
    }
    else if (mode === "occupancy") {
      ReportsAPI.getOccupancyReport(_filters).then((res) => {
        setOccupancyData(res)
      })
    }
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-textPrimary">Dashboard</h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {countInfo.map((item) => (
          <div
            key={item.title}
            className="bg-surface p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-textSecondary text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold text-accent mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      <div className="p-6 textPrimary">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>

        <div className="flex gap-4 mb-6">
          {(['tickets', 'revenue', 'occupancy'] as ModeType[]).map((tab) => (
            <button
              key={tab}
              className={`px-4 py-2 rounded-md ${
                mode === tab ? 'bg-primary text-white' : 'bg-surface'
              }`}
              onClick={() => setMode(tab)}
            >
              {tab === 'tickets' && 'Tickets Sold'}
              {tab === 'revenue' && 'Revenue'}
              {tab === 'occupancy' && 'Hall Occupancy'}
            </button>
          ))}
        </div>

        <ReportFilters value={filters} onChange={setFilters} onSubmit={() => generateReport()} />

        {soldTicketsData && mode === 'tickets' && <TicketsSoldTable data={soldTicketsData} />}
        {revenueData && mode === 'revenue' && <RevenueTable data={revenueData} />}
        {occupancyData && mode === 'occupancy' && <OccupancyTable data={occupancyData} />}

        {/* {query.data && mode === 'tickets' && <TicketsSoldTable data={query.data} />}
        {query.data && mode === 'revenue' && <RevenueTable data={query.data} />}
        {query.data && mode === 'occupancy' && <OccupancyChart data={query.data} />} */}
      </div>
    </div>
  )
}

export default AdminDashboard
