import style from "./page.module.css";

export default function Loader() {
  return (
    <div className={style.loader_container}>
      <div className={style.lds_default}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
