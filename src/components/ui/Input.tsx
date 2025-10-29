const Input = (params: React.InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...params}
      autoComplete="off"
      className="w-full px-4 py-2 bg-bg-dark text-text-primary border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
    />
  )
}

export default Input
