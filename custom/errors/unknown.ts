import * as  Alexa from 'ask-sdk'
import { GetRequestAttributes } from '../lib/helpers';

export const Unknown: Alexa.ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(error)
        console.log(`Error handled: ${error.message}`);

        const { t } = GetRequestAttributes(handlerInput)
        const speechText = t("ERROR_MSG")

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    },
};
