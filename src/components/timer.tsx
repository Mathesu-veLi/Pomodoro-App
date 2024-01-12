import React from 'react';
import { secondsToMinutes } from '../utils/seconds-to-minutes';

interface IProps {
    mainTime: number;
}

export function Timer(props: IProps): JSX.Element {
    return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
}
