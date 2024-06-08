export default function InputRadio({ name, value, callback }) {
  const key = `${name}:${value}`;

  return (
    <>
      <input
        id={key}
        name={name}
        onChange={callback}
        type="radio"
        value={value}
      />
      <label htmlFor={key} key={key}>
        {value}
      </label>
    </>
  );
}
