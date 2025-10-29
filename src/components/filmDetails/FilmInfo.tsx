import type { Film } from "@/dto/film.dto";
import Badge from "../ui/Badge";
import { minutesToHHMM } from "@/utils/dateFormatter";

export const MovieInfo = ({ film }: { film: Film }) => {
  return (
    <section className="flex flex-col md:flex-row gap-8">
      {/* Poster */}
      <div className="md:w-1/3">
        <img
          src={film.posterURL}
          alt={film.name}
          className="w-full rounded-2xl object-cover shadow-lg"
        />
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold text-textPrimary mb-3">
            {film.name}
          </h1>
          <div className="flex gap-2">
            {film.categories.map((category) => <Badge>{category.name}</Badge>)}
          </div>
          <p className="text-textSecondary mb-4">
            {minutesToHHMM(film.duration)}
          </p>
          <p className="text-textMuted leading-relaxed">{film.description}</p>
        </div>
      </div>
    </section>
  );
};