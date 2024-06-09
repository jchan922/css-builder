import './Box.scss';

export default function Box({ num, callback }) {
  return (
    <button className="box" onClick={callback}>
      <p>{num}</p>
    </button>
  );
}
