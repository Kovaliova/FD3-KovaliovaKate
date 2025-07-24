import React from 'react';

const withRainbowFrame = (colors) => (WrappedComponent) => (props) => {
  const content = <WrappedComponent {...props} />;

  return colors.reduce((acc, color, index) => (
      <div key={index} style={{ border: `5px solid ${color}`, padding: '5px', boxSizing: 'border-box', }}> {acc} </div>
  ), content);
}

export default withRainbowFrame;