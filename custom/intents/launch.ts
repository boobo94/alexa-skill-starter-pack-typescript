import * as  Alexa from 'ask-sdk'
import { GetRequestAttributes } from '../lib/helpers';

export const LaunchRequestHandler: Alexa.RequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput)
        const speechText = t("WELCOME_MSG")

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t('SKILL_NAME'), speechText)
            .getResponse();
    }
};
