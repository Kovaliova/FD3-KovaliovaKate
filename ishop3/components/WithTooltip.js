import React, { useState, useRef, useEffect } from 'react';
import './Shop.css';

export function withTooltip(defaultContent, position = 'top', delay = 300, offsetTop = 40) {
  return function (WrappedComponent) {
    return function TooltipWrapper(props) {
      const [visible, setVisible] = useState(false);
      const [coords, setCoords] = useState({ top: 0, left: 0 });
      const timeoutRef = useRef(null);
      const wrapperRef = useRef(null);

      const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
          if (!wrapperRef.current || typeof wrapperRef.current.getBoundingClientRect !== 'function') return;
          const rect = wrapperRef.current.getBoundingClientRect();
          const topOffset = props.offsetTop !== undefined ? props.offsetTop : offsetTop;

          setCoords({ top: rect.top - topOffset, left: rect.left });
          setVisible(true);
        }, delay);
      };

      const hideTooltip = () => {
        clearTimeout(timeoutRef.current);
        setVisible(false);
      };

      useEffect(() => {
        return () => clearTimeout(timeoutRef.current);
      }, []);

      const tooltipContent = props.text || defaultContent;

      return (
        <React.Fragment>
          <div
            ref={wrapperRef}
            onMouseEnter={showTooltip}
            onMouseLeave={hideTooltip}
            className="tooltip-wrapper"
          >
            <WrappedComponent {...props} />
          </div>
          {visible && (
            <div
              className="tooltip"
              style={{
                top: coords.top,
                left: coords.left
              }}
            >
              {tooltipContent}
            </div>
          )}
        </React.Fragment>
      );
    };
  };
}