export default function SortAlphabetically(a, b, prop: string): number {
    if (a[prop] < b[prop]) { return -1; }
    if (a[prop] > b[prop]) { return 1; }
    return 0;
}