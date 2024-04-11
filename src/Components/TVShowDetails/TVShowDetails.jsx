import { Rating } from "../Rating/Rating";
import s from "./style.module.css";

export function TVShowDetails({ tvShow }) {
  return (
    <div className="mt-28">
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.rating_container}>
        <div className={s.rating}>
          <Rating rating={tvShow.vote_average / 2} />
        </div>
        {tvShow.vote_average / 2}
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
    </div>
  );
}
