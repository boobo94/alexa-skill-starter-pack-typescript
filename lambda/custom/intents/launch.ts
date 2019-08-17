import * as  Alexa from 'ask-sdk'
import { GetRequestAttributes } from '../lib/helpers';
import { RequestTypes } from '../lib/types';

export const LaunchRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === RequestTypes.Launch;
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput)
        const speechText = t("WELCOME_MSG")

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .getResponse();
    }
};
