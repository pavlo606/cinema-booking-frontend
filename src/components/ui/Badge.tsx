interface BadgeParams {
  children: React.ReactNode;
}

const Badge = ({children}: BadgeParams) => {
  return (
    <span className="inline-flex items-center justify-center border rounded-full border-text-primary text-xs font-medium w-fit whitespace-nowrap px-2 py-0.5 shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 overflow-hidden cursor-default   hover:bg-primary/80">
      {children}
    </span>
  )
}

export default Badge
