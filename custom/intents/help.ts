import { RequestHandler } from 'ask-sdk';
import { GetRequestAttributes, IsIntent } from '../lib/helpers';
import { IntentTypes } from '../lib/types';

export const HelpIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.Help)
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput)
        const speechText = t("HELP_MSG")

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t('SKILL_NAME'), speechText)
            .getResponse();
    }
};
