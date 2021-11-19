import { ScenarioHandler } from './types';
import * as dictionary from './system.i18n'
import { getNumberFromMessage } from './utils/utils';
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
}

export const noMatchHandler: ScenarioHandler = async ({ req, res }) => {
    const keyset = req.i18n(dictionary)
    const responseText = keyset('404')
    res.appendBubble(responseText)
    res.setPronounceText(responseText)
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
            counter: arr.join(', ')
        }))
    }
}