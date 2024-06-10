import { useState } from 'react';

import Box from './Box.jsx';
import Drawer from './Drawer.jsx';
import Fieldset from './Fieldset.jsx';

import './Stage.scss';

export default function Stage() {
  const [sandboxStyles, setSandboxStyles] = useState({});
  const onRadioBtnChange = (e) => {
    const { name, value } = e.target;
    const className = `${name}--${value}`;

    setSandboxStyles((prev) => ({
      ...prev,
      [name]: className,
    }));
  };
  const getElSandboxClasses = (obj) => {
    return Object.keys(obj)?.reduce(
      (string, key) => `${string} ${obj[key]}`,
      ''
    );
  };

  const [boxCount, setBoxCount] = useState(1);
  const addBoxBtnClick = () => setBoxCount(boxCount + 1);
  const removeBoxBtnClick = () => boxCount > 1 && setBoxCount(boxCount - 1);

  const [activeBox, setActiveBox] = useState(undefined);
  const onBoxClick = (e) => {
    // const elDrawer = document.getElementById('drawer');
    // const elDrawerBackground = document.getElementById('drawer-background');

    // [elDrawerBackground, elDrawer].forEach((el) =>
    //   el.classList.contains('hide')
    //     ? el.classList.remove('hide')
    //     : el.classList.add('hide')
    // );

    // document.getElementById('drawer').classList.contains('hide')
    //   ? document.getElementById('stage').classList.add('no-pointer')
    //   : document.getElementById('stage').classList.remove('no-pointer');

    setActiveBox(e.currentTarget.innerText);
  };

  return (
    <div id="stage" className={activeBox && 'no-pointer'}>
      <button id="add-box-btn" onClick={addBoxBtnClick}>
        Add box
      </button>

      <button id="remove-box-btn" onClick={removeBoxBtnClick}>
        Remove box
      </button>

      <form>
        <Fieldset
          callback={onRadioBtnChange}
          name="align-items"
          values={[
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
          ]}
        />
        <Fieldset
          callback={onRadioBtnChange}
          name="flex-direction"
          values={['row', 'column']}
        />
        <Fieldset
          callback={onRadioBtnChange}
          name="flex-wrap"
          values={['nowrap', 'wrap', 'wrap-reverse']}
        />
        <Fieldset
          callback={onRadioBtnChange}
          name="justify-content"
          values={[
            'flex-start',
            'flex-end',
            'center',
            'space-between',
            'space-around',
            'space-evenly',
          ]}
        />
      </form>

      <div id="info-box">
        <h2>Description</h2>
        <p>
          By default, <code>display: flex;</code> will position it's children
          elements as a single row with content aligned to the left.
        </p>
      </div>
      <div
        id="sandbox"
        className={getElSandboxClasses(sandboxStyles)}
        style={{
          width: '100%',
          height:
            sandboxStyles?.['flex-direction'] === 'flex-direction--column'
              ? boxCount * 200 + 100
              : '100%',
        }}
      >
        {[...Array(boxCount).keys()].map((index) => (
          <Box key={`box-${index}`} num={index + 1} onBoxClick={onBoxClick} />
        ))}
      </div>

      <Drawer
        header={activeBox ? `Box ${activeBox}` : 'Saving changes...'}
        content={
          activeBox
            ? [
                {
                  key: 'order',
                  element: (
                    <form>
                      <Fieldset
                        callback={() => console.log('ORDER')}
                        name="order"
                        values={[...Array(boxCount).keys()]}
                      />
                    </form>
                  ),
                },
              ]
            : []
        }
        isOpen={Boolean(activeBox)}
        onCloseClick={() => setActiveBox(undefined)}
      ></Drawer>
    </div>
  );
}
