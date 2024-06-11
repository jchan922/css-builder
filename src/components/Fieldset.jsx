export default function Fieldset({ name, values, callback }) {
  return (
    <>
      <fieldset>
        <legend>{name.toUpperCase()}</legend>
        {values.map((value, index) => (
          <div key={index}>
            <input
              type="radio"
              id={`${name}-${value}`}
              name={name}
              value={value}
              onChange={callback}
              defaultChecked={index === 0}
            />
            <label htmlFor={`${name}-${value}`}>{value}</label>
          </div>
        ))}
      </fieldset>
    </>
  );
}
