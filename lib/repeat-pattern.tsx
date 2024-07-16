export default function repeatPattern(length: number, pattern = [1, 2, 2, 1]) {
    const result = [];
    for (let i = 0; i < length; i++) {
        result.push(pattern[i % pattern.length]);
    }
    return result;
}
