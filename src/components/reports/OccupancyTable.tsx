export function OccupancyTable({ data }: any) {
  return (
    <div className="bg-surface p-4 rounded-xl mt-6">
      <table className="w-full text-left">
        <thead className="text-secondary border-b border-gray-700">
          <tr>
            <th className="py-2">Hall</th>
            <th>Total Seats</th>
            <th>Occupancy (%)</th>
          </tr>
        </thead>
        <tbody className="text-text-primary">
          {data.map((item: any) => (
            <tr key={item.hallId} className="border-b border-gray-800">
              <td className="py-2">{item.name}</td>
              <td>{item.totalSeats}</td>
              <td>{item.average} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}