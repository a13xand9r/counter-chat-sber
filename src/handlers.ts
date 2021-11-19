import { ScenarioHandler } from './types';
import * as dictionary from './system.i18n'
import { getNumberFromMessage, getRandomFromArray } from './utils/utils';
require('dotenv').config()


export const runAppHandler: ScenarioHandler = ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    res.appendBubble(keyset('Привет',{
        from: 1,
        to: 100
    }))
    res.setPronounceText(keyset('Привет',{
        from: 'одного',
        to: 'ста'
    }))
    res.appendSuggestions([getRandomFromArray(['До 10', 'До 30', 'До 45', 'До 100', 'Досчитай до 25', 'Досчитай до 15', 'Досчитай до 5'])])
}

export const noMatchHandler: ScenarioHandler = async ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('404')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
    res.appendSuggestions([getRandomFromArray(['До 10', 'До 30', 'До 45', 'До 100', 'Досчитай до 25', 'Досчитай до 15', 'Досчитай до 5']), 'Хватит'])
}

export const counterHandler: ScenarioHandler = async ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const num = getNumberFromMessage(req.message.human_normalized_text)

    if (num && num > 100) {
        res.appendBubble('Я умею считать только до 100')
        res.setPronounceText('Я умею считать только до ста')
    } else if (num && num < 1){
        res.appendBubble('Нужно число больше нуля')
        res.setPronounceText('Нужно число больше нуля')
    } else {
        const arr = [...new Array(num)].map((_, index) => index + 1)
        res.appendBubble(keyset('Счет', {
            counter: arr.join(' ')
        }))
        res.setPronounceText(keyset('Счет', {
            counter: arr.join('; ')
        }))
    }
    res.appendSuggestions([getRandomFromArray(['До 10', 'До 30', 'До 45', 'До 100', 'Досчитай до 25', 'Досчитай до 15', 'Досчитай до 5']), 'Хватит'])
}