import React, { PropTypes } from 'react';

const Loading = ({ size, border }) =>
  <div
    className="c-loading"
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${border}px`
    }}
  >
  </div>;

Loading.propTypes = {
  size: PropTypes.number,
  border: PropTypes.number
};

export default Loading;
