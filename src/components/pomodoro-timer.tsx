import React, { useEffect, useState, useCallback } from 'react';
import { useInterval } from '../hooks/use-interval';

import { Button } from './button';
import { Timer } from './timer';
import { secondsToTime } from '../utils/seconds-to-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface IProps {
    defaultPomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function PomodoroTimer(props: IProps): JSX.Element {
    const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
    const [timeCounting, setTimeCounting] = useState(false);
    const [working, setWorking] = useState(false);
    const [resting, setResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true),
    );

    const [completedCycles, setCompletedCycles] = useState(0);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (working) setFullWorkingTime(fullWorkingTime + 1);
        },
        timeCounting ? 1000 : null,
    );

    const configureWork = useCallback(() => {
        setTimeCounting(true);
        setWorking(true);
        setResting(false);
        setMainTime(props.defaultPomodoroTime);
        audioStartWorking.play();
    }, [setTimeCounting, setWorking, setResting, setMainTime, props.defaultPomodoroTime]);

    const configureRest = useCallback(
        (long: boolean) => {
            setTimeCounting(true);
            setWorking(false);
            setResting(true);

            setMainTime(long ? props.longRestTime : props.shortRestTime);

            audioStopWorking.play();
        },
        [
            setTimeCounting,
            setWorking,
            setResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime,
        ],
    );

    useEffect(() => {
        if (working) document.body.classList.add('working');
        if (resting) document.body.classList.remove('working');

        if (mainTime > 0) return;

        if (working && cyclesQtdManager.length > 0) {
            configureRest(false);
            cyclesQtdManager.pop();
        } else if (working && cyclesQtdManager.length <= 0) {
            configureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (working) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (resting) configureWork();
    }, [
        mainTime,
        working,
        configureWork,
        resting,
        configureRest,
        numberOfPomodoros,
        props.cycles,
        completedCycles,
        cyclesQtdManager,
        setCyclesQtdManager,
    ]);

    return (
        <div className="pomodoro">
            <h2>You are: {working ? 'Working' : 'Resting'}</h2>
            <Timer mainTime={mainTime} />

            <div className="controls">
                <Button text="Work" onClick={() => configureWork()}></Button>
                <Button text="Rest" onClick={() => configureRest(false)}></Button>
                <Button
                    className={!working && !resting ? 'hidden' : 'active'}
                    text={timeCounting ? 'Pause' : 'Play'}
                    onClick={() => (working ? setTimeCounting(!timeCounting) : configureWork())}
                ></Button>
            </div>

            <div className="details">
                <p>Completed cycles: {completedCycles}</p>
                <p>Hours worked: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros completed: {numberOfPomodoros}</p>
            </div>
        </div>
    );
}
