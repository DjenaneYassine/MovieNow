import s from "./style.module.css";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconEmpty } from "@heroicons/react/24/outline";

export function Rating({ rating }) {
  const starList = [];

  const starFillCount = Math.floor(rating);

  const emptyStarCount = 5 - starFillCount;

  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarIcon className="h-4" key={"star" + i} />);
  }

  for (let i = 1; i <= emptyStarCount; i++) {
    starList.push(<StarIconEmpty className="h-4" key={"starEmpty" + i} />);
  }
  return <div className="flex">{starList}</div>;
}
