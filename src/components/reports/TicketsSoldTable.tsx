export function TicketsSoldTable({ data }: any) {
  return (
    <div className="bg-surface p-4 rounded-xl mt-6">
      <p className="mb-4">Total tickets sold: {data.totalSold}</p>
      <table className="w-full text-left">
        <thead className="text-secondary border-b border-gray-700">
          <tr>
            <th className="py-2">Film</th>
            <th>Date</th>
            <th>Sold Tickets</th>
          </tr>
        </thead>
        <tbody className="text-text-primary">
          {data.soldTickets.map((item: any) => (
            <tr key={item.screeningId} className="border-b border-gray-800">
              <td className="py-2">{item.film.name}</td>
              <td>{new Date(item.startTime).toLocaleString()}</td>
              <td>{item.soldTickets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}