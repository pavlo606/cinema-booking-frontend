import { FilmsAPI } from "@/api/films.api"
import { useEffect } from "react"

const HomePage = () => {
    useEffect(() => {
        FilmsAPI.get().then(console.log)
    })

    return (
        <div className="text-text-primary">
            HomePage
        </div>
    )
}

export default HomePage