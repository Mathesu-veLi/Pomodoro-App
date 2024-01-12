export function secondsToMinutes(seconds: number): string {
    const zeroLeft = (n: number) => Math.floor(n).toString().padStart(2, '0');
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds - minutes * 60;
    return `${zeroLeft(minutes)}:${zeroLeft(secondsLeft)}`;
}
