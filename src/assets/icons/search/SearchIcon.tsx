import { Component } from 'react';

type SearchIconProps = {
  size: number;
};

export default class SearchIcon extends Component<SearchIconProps> {
  render() {
    const { size } = this.props;

    return (
      <svg
        style={{ width: size, height: 'auto', display: 'inline-block' }}
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0" />
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g id="SVGRepo_iconCarrier">
          <defs>
            <style>
              {`.cls-1 {
                color: inherit;
                fill: none;
                stroke: currentColor;
                stroke-miterlimit: 10;
                stroke-width: 3px;
              }`}
            </style>
          </defs>
          <circle className="cls-1" cx="9.14" cy="9.14" r="7.64" />
          <line className="cls-1" x1="22.5" y1="22.5" x2="14.39" y2="14.39" />
        </g>
      </svg>
    );
  }
}
