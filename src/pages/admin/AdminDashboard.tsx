const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-textPrimary">Dashboard</h1>

      {/* Статистика */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { title: 'Фільми', value: 12 },
          { title: 'Сеанси', value: 34 },
          { title: 'Користувачі', value: 215 },
          { title: 'Бронювання', value: 142 },
        ].map((item) => (
          <div
            key={item.title}
            className="bg-surface p-4 rounded-xl shadow hover:shadow-lg transition"
          >
            <p className="text-textSecondary text-sm">{item.title}</p>
            <h2 className="text-2xl font-bold text-accent mt-2">{item.value}</h2>
          </div>
        ))}
      </div>

      {/* Останні бронювання */}
      <div className="bg-surface p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Останні бронювання</h2>
        <table className="w-full text-left text-textSecondary">
          <thead className="border-b border-gray-700">
            <tr>
              <th>Користувач</th>
              <th>Фільм</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td>Іван Петренко</td>
              <td>Дюна 2</td>
              <td>28 жовтня 2025, 18:00</td>
              <td className="text-green-400">Підтверджено</td>
            </tr>
            <tr>
              <td>Марія Коваль</td>
              <td>Джокер 2</td>
              <td>29 жовтня 2025, 21:00</td>
              <td className="text-yellow-400">Очікує</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard
