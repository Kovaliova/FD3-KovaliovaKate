import React from 'react';

function withRainbowFrame(colors) {
  return function(WrappedComponent) {
    return class WithRainbowFrame extends React.Component {
      render() {
        let content = (
          <WrappedComponent {...this.props}>
              {this.props.children}
          </WrappedComponent>
        );

        colors.forEach((color, index) => {
        content = (
          <div key={index} style={{ border: `5px solid ${color}`, padding: '5px', boxSizing: 'border-box'}}> {content} </div>
        );
      });

      return content;
    }
   }
  }
}

export default withRainbowFrame;