import { ResponseInterceptor } from "ask-sdk-core";

export const SavePersistentAttributes: ResponseInterceptor = {
    async process(handlerInput) {
        await handlerInput.attributesManager.savePersistentAttributes();
    },
};
