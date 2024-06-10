import React from 'react';

import './Drawer.scss';

export default function Drawer({ content, header, isOpen, onCloseClick }) {
  return (
    <>
      <div id="drawer-background" className={isOpen ? '' : 'hide'}></div>
      <div id="drawer" className={isOpen ? '' : 'hide'}>
        <div className="drawer-header">
          <h2>{header}</h2>
          <button className="transparent" onClick={onCloseClick}>
            Close
          </button>
        </div>
        <div className="drawer-content">
          {content &&
            content.map((item) => (
              <React.Fragment key={item.key}>{item.element}</React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
}
