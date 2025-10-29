import type { Film } from "@/dto/film.dto";
import { FilmCard } from "./FilmCard";

interface Props {
  films: Film[];
}

export const FilmGrid = ({ films }: Props) => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-semibold mb-6 text-text-primary">Movies</h2>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {films.map((film) => (
          <FilmCard key={film.id} film={film} />
        ))}
      </div>
    </div>
  );
};
