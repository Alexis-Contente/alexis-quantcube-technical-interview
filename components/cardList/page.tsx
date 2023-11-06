import style from "./page.module.css";
type Posts = {
  id?: number;
  userId?: number;
  title: string;
  body: string;
};

export default function CardList(props: Posts) {
  const { title, body } = props;
  return (
    <>
      <div className={style.card_container}>
        <h1>{title}</h1>
        <p>{body}</p>
      </div>
    </>
  );
}
