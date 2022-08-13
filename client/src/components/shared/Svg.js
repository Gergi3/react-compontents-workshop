export const Svg = (props) => {
    let className = 'svg-inline--fa';
    if (props.className) {
        className += ` ${props.className}`
    }
    return (
        <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon={props.icon}
            className={className}
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox={props.viewBox}>
            <path fill="currentColor" d={props.d} />
        </svg>
        );
};
