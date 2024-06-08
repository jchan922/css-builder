import { useState } from 'react';

import Box from './Box.jsx';
import InputRadio from './InputRadio.jsx';

import './Stage.scss';

export default function Stage() {
  const [sandboxStyles, setSandboxStyles] = useState({});
  const [boxCount, setBoxCount] = useState(1);
  const addBoxBtnClick = () => setBoxCount(boxCount + 1);
  const removeBoxBtnClick = () => boxCount > 1 && setBoxCount(boxCount - 1);

  const onRadioBtnChange = (e) => {
    const { name, value } = e.target;

    setSandboxStyles((prev) => ({
      ...prev,
      [name]: `${name}--${value}`,
    }));
  };

  const getElSandboxClasses = (obj) => {
    return Object.keys(obj)?.reduce(
      (string, key) => `${string} ${obj[key]}`,
      ''
    );
  };

  return (
    <div id="stage">
      <button id="add-box-btn" onClick={addBoxBtnClick}>
        Add box
      </button>

      <button id="remove-box-btn" onClick={removeBoxBtnClick}>
        Remove box
      </button>

      <form>
        <fieldset>
          <legend>justify-content:</legend>
          {[
            'center',
            'flex-start',
            'flex-end',
            'space-between',
            'space-around',
            'space-evenly',
          ].map((value) => {
            return (
              <InputRadio
                callback={onRadioBtnChange}
                key={`justify-content:${value}`}
                name="justify-content"
                value={value}
              />
            );
          })}
        </fieldset>
      </form>

      <div id="sandbox" className={getElSandboxClasses(sandboxStyles)}>
        {[...Array(boxCount).keys()].map((index) => (
          <Box key={`box-${index}`} />
        ))}
      </div>
    </div>
  );
}
