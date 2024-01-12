import React from 'react';

interface IProps {
    text: string;
    onClick?: () => void;
    className?: string;
}

export function Button(props: IProps): JSX.Element {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    );
}
