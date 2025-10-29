import type { Film } from '@/dto/film.dto'
import Badge from "../ui/Badge";
import { useNavigate } from 'react-router';


interface Props {
  film: Film;
}

export const FilmCard = ({ film }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="bg-bg-dark border border-border rounded-2xl overflow-hidden shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
      {/* Poster */}
      <div className="relative aspect-2/3 overflow-hidden">
        <img
          src={film.posterURL}
          alt={film.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-lg font-semibold text-text-primary line-clamp-1">
            {film.name}
          </h3>
          <div className="flex gap-2">
            {film.categories.map((category) => <Badge>{category.name}</Badge>)}
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-accent text-sm">
          </div>
          <button onClick={() => navigate(`/film/${film.id}`)} className="bg-accent text-bg-dark text-sm px-3 py-1 rounded-lg font-medium hover:bg-accent/80 transition">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};
