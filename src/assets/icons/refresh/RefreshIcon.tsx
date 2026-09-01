import { Component } from 'react';

type RefreshIconProps = {
  size?: number;
  className?: string;
};

export default class RefreshIcon extends Component<RefreshIconProps> {
  render() {
    const size = this.props.size ?? 18;

    return (
      <svg
        className={this.props.className}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M21 12a9 9 0 1 1-2.64-6.36"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M21 3v6h-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
}
