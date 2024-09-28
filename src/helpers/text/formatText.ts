export const formatText = (text: string, to: number) => {
    if (text.length > to) {
        return text.slice(0, to) + '...';
    } else {
        return text;
    }
}