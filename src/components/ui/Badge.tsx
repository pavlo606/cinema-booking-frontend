interface BadgeParams {
  children: React.ReactNode;
}

const Badge = ({children}: BadgeParams) => {
  return (
    <span className="inline-flex items-center justify-center border rounded-full border-text-primary text-xs font-medium w-fit whitespace-nowrap px-2 py-0.5 shrink-0 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-all duration-200 overflow-hidden cursor-pointer    hover:bg-primary/80">
      {children}
    </span>
  )
}

export default Badge
// inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden
// border-transparent bg-primary text-text-primary font-semibold hover:bg-primary/90 cursor-pointer rounded-2xl