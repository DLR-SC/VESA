declare module 'interval-tree-1d' {
    interface IntervalTree<T> {
        insert(low: number, high: number, data: T): void;
        remove(low: number, high: number, data: T): void;
        search(low: number, high: number): Array<T>;
    }

    export default function createIntervalTree<T>(): IntervalTree<T>;
}