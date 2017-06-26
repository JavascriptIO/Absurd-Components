export class Clock {
    private startTime: number;

    constructor(private maxms: number) {}

    start(): void {
        this.startTime = Date.now();
    }

    stop(): number {
        let difference = Date.now() - this.startTime;
        return difference < this.maxms ? difference : this.maxms;
    }
}

export class ClockFactory {
    public static create (maxms = 10000): Clock {
        return new Clock(maxms);
    }
}