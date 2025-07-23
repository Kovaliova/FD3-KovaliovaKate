import React from "react";

class DoubleButton extends React.Component{
    render() {
        const { caption1, caption2, cbPressed, children } = this.props;

        return(
            <div>
                <input type="button" value={caption1} onClick={() => cbPressed(1)} />
                    {children}
                <input type="button" value={caption2} onClick={() => cbPressed(2)} />
            </div>
        )
    }
}

export default DoubleButton;