import { RequestHandler } from "ask-sdk";
import { GetRequestAttributes, IsIntent } from '../lib/helpers';
import { IntentTypes } from "../lib/types";

export const CancelAndStopIntentHandler: RequestHandler = {
    canHandle(handlerInput) {
        return IsIntent(handlerInput, IntentTypes.Cancel) || IsIntent(handlerInput, IntentTypes.Stop)
    },
    handle(handlerInput) {
        const { t } = GetRequestAttributes(handlerInput)
        const speechText = t("GOODBYE_MSG")

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard(t('SKILL_NAME'), speechText)
            .withShouldEndSession(true)
            .getResponse();
    }
};