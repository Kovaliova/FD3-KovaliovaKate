import React from 'react';

class RainbowFrameHOC {
  constructor(colors) {
    this.colors = colors;
  }

  wrap(WrappedComponent) {
    const colors = this.colors;

    return class RainbowFrameWrapper extends React.Component {
      render() {
        let content = (
          <WrappedComponent {...this.props}>
            {this.props.children}
          </WrappedComponent>
        );

        colors.forEach((color, index) => {
          content = (
            <div key={index} style={{ border: `5px solid ${color}`, padding: '5px', boxSizing: 'border-box', }}> {content} </div>
          );
        });

        return content;
      }
    };
  }
}

export default RainbowFrameHOC;
