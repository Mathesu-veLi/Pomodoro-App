import React from 'react';
import { secondsToTime } from '../utils/seconds-to-time';

interface IProps {
    mainTime: number;
}

export function Timer(props: IProps): JSX.Element {
    return <div className="timer">{secondsToTime(props.mainTime)}</div>;
}
