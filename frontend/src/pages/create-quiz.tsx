const generateRandomString = (length: number) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    let result = ''
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        result += characters[randomIndex]
    }
    return result
}

export const FakeCreateQuiz = () => {
    return (
        <div>
            <h1>Quiz start</h1>
            <p>Q: {generateRandomString(10)}</p>
            <ul>
                <li>ano</li>
                <li>ne</li>
            </ul>
        </div>
    )
}
