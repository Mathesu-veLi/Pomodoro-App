import { zeroLeft } from './zero-left';

export function secondsToMinutes(seconds: number): string {
    const minutes = zeroLeft((seconds / 60) % 60);
    const secondsLeft = zeroLeft((seconds % 60) % 60);
    return `${minutes}:${secondsLeft}`;
}
