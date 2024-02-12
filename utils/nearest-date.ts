

export default function (arr: number[], value: number): number {
    return arr.reduce((a: number,c: number) => a < value ? c : a);
}
  