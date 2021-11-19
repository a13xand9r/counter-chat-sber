
export function getRandomFromArray<T>(arr: T[]): T {
    return arr[Math.floor(arr.length * Math.random())]
}

export const getNumberFromMessage = (text: string) => {
    console.log(text)
    const textArr = text.split(' ')
    for (let i = 0; i < textArr.length; i++) {
        if (!!Number(textArr[i])) return Number(textArr[i])
    }
}

