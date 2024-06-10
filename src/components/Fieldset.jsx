import InputRadio from './InputRadio.jsx';

export default function Fieldset({ name, values, callback }) {
  return (
    <>
      <fieldset>
        <legend>{name.toUpperCase()}</legend>
        {values.map((value, index) => {
          return (
            <InputRadio
              callback={callback}
              key={`${name}:${value}`}
              name={name}
              value={value}
            />
          );
        })}
      </fieldset>
    </>
  );
}
