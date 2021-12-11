export function buildUrl(...urls: string[]): string {
    return urls.join('');
}

export function errorCreator(code: string | number) {
    return {
        code,
        message: `Code: ${code}`
    }
}
