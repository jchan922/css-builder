import './Box.scss';

export default function Box({ className, num, onBoxClick }) {
  return (
    <button className={`box ${className}`} onClick={onBoxClick}>
      <p>{num}</p>
    </button>
  );
}
