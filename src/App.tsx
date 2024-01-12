import React from 'react';
import './App.css';
import { PomodoroTimer } from './components/pomodoro-timer';

function App() {
    return (
        <div className="App">
            <PomodoroTimer defaultPomodoroTime={1500} />
        </div>
    );
}

export default App;
