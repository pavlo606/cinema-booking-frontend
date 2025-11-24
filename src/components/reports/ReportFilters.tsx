export function ReportFilters({ value, onChange, onSubmit }: any) {
  return (
    <div className="p-4 bg-surface rounded-xl flex gap-4 items-end flex-wrap">
      <div className="flex flex-col">
        <label className="text-sm text-secondary">From</label>
        <input
          type="date"
          className="bg-bg-dark rounded-md p-2 text-text-primary"
          value={value.from}
          onChange={(e) => onChange({ ...value, from: e.target.value })}
        />
      </div>

      <div className="flex flex-col">
        <label className="text-sm text-secondary">To</label>
        <input
          type="date"
          className="bg-bg-dark rounded-md p-2 text-text-primary"
          value={value.to}
          onChange={(e) => onChange({ ...value, to: e.target.value })}
        />
      </div>

      <button
        onClick={onSubmit}
        className="px-4 py-2 bg-primary rounded-lg text-white hover:bg-primary/80"
      >
        Generate report
      </button>
    </div>
  )
}

export default ReportFilters
