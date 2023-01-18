export default interface IToken {
    limit: number,
    tokens: [
        {
            identifier: string,
            token: string,
            status: boolean
        }
    ]
}