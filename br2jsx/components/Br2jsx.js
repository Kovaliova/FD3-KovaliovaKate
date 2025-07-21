import React from 'react';

class Br2jsx extends React.Component{
    render() {
        const { text } = this.props;

        const fragments = text.split(/<br\s*\/?>/i);
        const jsxFragments = [];

        fragments.forEach((part, index) => {
            jsxFragments.push(part);

            if(index !== fragments.length - 1){
                jsxFragments.push(<br key={index} />);
            }
        });

        return <div className='br2jsx'>{jsxFragments}</div>;
    }
}

export default Br2jsx;