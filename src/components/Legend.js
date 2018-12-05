import React from 'react';

import './Legend.scss';

export const Legend = props => {
  const { entries } = props;
  console.log('entries', entries);
  return (
      <div class="legend">
      {
        entries.map(({ label, color }) => (
          <div className="entry">
            <div className="box" style={{ backgroundColor: color }}></div>
            <div className="label">{label}</div>
          </div>
        ))}
    </div>
  );
}
