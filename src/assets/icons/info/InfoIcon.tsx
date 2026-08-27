import { Component } from 'react';

type InfoIconProps = {
  size?: number;
};

export default class InfoIcon extends Component<InfoIconProps> {
  render() {
    const size = this.props.size ?? 14;

    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
        <path
          d="M12 10.5v6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="7.25" r="1.1" fill="currentColor" />
      </svg>
    );
  }
}
