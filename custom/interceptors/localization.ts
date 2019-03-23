import { RequestInterceptor } from "ask-sdk-core";
import * as i18n from "i18next";
import * as sprintf from "i18next-sprintf-postprocessor";
import { locales } from '../../locales/index';

type TranslationFunction = (...args: any[]) => string;

/**
 * Adds translation functions to the RequestAttributes.
 */
export const Localization: RequestInterceptor = {
    process(handlerInput) {
        const localizationClient = i18n.use(sprintf).init({
            lng: handlerInput.requestEnvelope.request.locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: locales,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes();
        attributes.t = function (...args: any[]) {
            return (localizationClient.t as TranslationFunction)(...args);
        };

        attributes.tr = function (key: any) {
            const result = localizationClient.t(key) as string[];

            return Random(result);
        };
    },
};

export function Random<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}