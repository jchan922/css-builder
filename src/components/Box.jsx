import './Box.scss';

export default function Box({ num, onBoxClick }) {
  return (
    <button className="box" onClick={onBoxClick}>
      <p>{num}</p>
    </button>
  );
}
