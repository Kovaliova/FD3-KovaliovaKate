import React from 'react';

class RainbowFrame extends React.Component {
  render() {
    const { colors, children } = this.props;

    let content = children;
    colors.forEach(color => {
      content = (
        <div style={{
          border: `5px solid ${color}`,
          padding: '5px'
        }}>
          {content}
        </div>
      );
    });

    return content;
  }
}

export default RainbowFrame;
