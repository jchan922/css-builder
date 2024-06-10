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
  const addBoxBtnClick = () => boxCount < 10 && setBoxCount(boxCount + 1);
  const removeBoxBtnClick = () => boxCount > 1 && setBoxCount(boxCount - 1);

  const [activeBox, setActiveBox] = useState(undefined);
  const onBoxClick = (e) => setActiveBox(e.currentTarget.innerText);

  const [boxStyles, setBoxStyles] = useState({ 1: {} });
  const onDrawerFormInputChange = (e) => {
    const { name, value } = e.target;
    const className = `${name}--${value}`;

    setBoxStyles((prev) => {
      return {
        ...prev,
        [activeBox]: {
          ...prev?.[activeBox],
          [name]: className,
        },
      };
    });
  };

  const getBoxStyles = (boxNum) => {
    const styles = boxStyles[boxNum];
    let classNames = '';

    for (const key in styles) {
      const className = styles[key];
      classNames = `${classNames ? `${classNames} ${className}` : className}`;
    }

    return classNames;
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
      <button
        onClick={() => {
          setSandboxStyles({});
          setBoxCount(1);
          setBoxStyles({ 1: {} });
          setActiveBox(undefined);
        }}
      >
        Reset
      </button>

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
          <Box
            className={getBoxStyles(index + 1)}
            key={`box-${index + 1}`}
            num={index + 1}
            onBoxClick={onBoxClick}
          />
        ))}
      </div>

      <Drawer
        content={
          activeBox
            ? [
                {
                  key: 'form',
                  element: (
                    <form>
                      {boxCount > 1 && (
                        <Fieldset
                          callback={onDrawerFormInputChange}
                          name="order"
                          values={[...Array(boxCount).keys()]}
                        />
                      )}
                      <Fieldset
                        callback={onDrawerFormInputChange}
                        name="flex-grow"
                        values={[...Array(boxCount + 1).keys()]}
                      />
                      <Fieldset
                        callback={onDrawerFormInputChange}
                        name="flex-shrink"
                        values={['1', '0']}
                      />
                      <Fieldset
                        callback={onDrawerFormInputChange}
                        name="flex-basis"
                        values={[
                          '200px',
                          '4em',
                          '50%',
                          'auto',
                          'content',
                          'unset',
                        ]}
                      />
                    </form>
                  ),
                },
                {
                  key: 'reset',
                  element: (
                    <button
                      onClick={() =>
                        setBoxStyles((prev) => ({
                          ...prev,
                          [activeBox]: {},
                        }))
                      }
                    >
                      Reset
                    </button>
                  ),
                },
              ]
            : []
        }
        header={activeBox ? `Box ${activeBox}` : 'Saving changes...'}
        isOpen={Boolean(activeBox)}
        onCloseClick={() => setActiveBox(undefined)}
      ></Drawer>
    </div>
  );
}
