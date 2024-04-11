import s from "./style.module.css";
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/solid";
export function SearchBar({ onSubmit }) {
  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      onSubmit(e.target.value);
    }
  }
  return (
    <>
      <SearchIcon className={s.icon} />
      <input onKeyUp={submit} className={s.input} type="text" />
    </>
  );
}
