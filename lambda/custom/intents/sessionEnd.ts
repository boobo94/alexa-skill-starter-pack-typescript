import { RequestHandler } from "ask-sdk-core";
import { IsType } from "../lib/helpers";

export const SessionEnded: RequestHandler = {
    canHandle(handlerInput) {
        return IsType(handlerInput, "SessionEndedRequest");
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder.getResponse();
    }
};
