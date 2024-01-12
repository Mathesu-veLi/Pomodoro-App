import { zeroLeft } from './zero-left';

export function secondsToTime(seconds: number): string {
    const hours = zeroLeft(seconds / 3600);
    const minutes = zeroLeft((seconds / 60) % 60);
    const secondsLeft = zeroLeft((seconds % 60) % 60);
    return `${hours}h${minutes}m${secondsLeft}s`;
}
