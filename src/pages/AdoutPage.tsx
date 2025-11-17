const AboutPage = () => {
  return (
    <div className="min-h-screen bg-neutral-900 text-neutral-100 p-8 flex flex-col items-center">
      <div className="max-w-3xl w-full space-y-6">
        <h1 className="text-4xl font-bold text-center">About CinemaBook</h1>
        <p className="text-lg leading-relaxed">
          CinemaBook is a modern platform designed to simplify the process of discovering movies,
          browsing schedules, and booking seats in your favorite cinema halls. It aims to provide a
          fast, intuitive, and enjoyable experience for both cinema visitors and administrators.
        </p>
        <p className="text-lg leading-relaxed">
          The system offers powerful tools such as film management, hall configuration, screening
          scheduling, and dynamic seat pricing. All pages are crafted with a clean dark-themed
          interface to ensure both usability and visual comfort.
        </p>
        <p className="text-lg leading-relaxed">
          Whether you're managing a cinema or simply booking a ticket for your next movie night,
          CinemaBook is built to make everything effortless.
        </p>
      </div>
    </div>
  )
}

export default AboutPage
