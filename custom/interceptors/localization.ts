import { RequestInterceptor } from "ask-sdk-core";
import i18next from 'i18next';
import * as sprintf from "i18next-sprintf-postprocessor";
import { RequestAttributes } from "../lib/interfaces";
import { locales } from "../locales";


type TranslationFunction = (...args: any[]) => string;

/**
 * Adds translation functions to the RequestAttributes.
 */
export const Localization: RequestInterceptor = {
    process(handlerInput) {
        const localizationClient = i18next.use(sprintf).init({
            lng: (handlerInput.requestEnvelope.request as any).locale,
            overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
            resources: locales,
            returnObjects: true,
        });

        const attributes = handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;

        attributes.t = function (...args: any[]) {
            return (i18next.t as TranslationFunction)(...args);
        };

        attributes.tr = function (key: any) {
            const arr = i18next.t(key) as string[];
            return arr[Math.floor(Math.random() * arr.length)];
        };
    },
};