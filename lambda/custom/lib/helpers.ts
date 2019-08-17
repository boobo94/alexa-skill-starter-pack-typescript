import { HandlerInput } from "ask-sdk";
import { RequestAttributes, SessionAttributes, PersistentAttributes } from './interfaces';
import { SlotValues, RequestTypes } from "./types";

export function IsIntent(handlerInput: HandlerInput, ...intents: string[]): boolean {
    if (handlerInput.requestEnvelope.request.type === "IntentRequest") {
        for (let i = 0; i < intents.length; i++) {
            if (handlerInput.requestEnvelope.request.intent.name === intents[i]) {
                return true;
            }
        }
    }
    return false;
}

export function IsType(handlerInput: HandlerInput, ...types: string[]): boolean {
    for (let i = 0; i < types.length; i++) {
        if (handlerInput.requestEnvelope.request.type === types[i]) {
            return true;
        }
    }
    return false;
}

export function GetRequestAttributes(handlerInput: HandlerInput): RequestAttributes {
    return handlerInput.attributesManager.getRequestAttributes() as RequestAttributes;
}

export function GetSessionAttributes(handlerInput: HandlerInput): SessionAttributes {
    return handlerInput.attributesManager.getSessionAttributes() as SessionAttributes;
}

export function GetPersistentAttributes(handlerInput: HandlerInput): Promise<PersistentAttributes> {
    return handlerInput.attributesManager.getPersistentAttributes() as Promise<PersistentAttributes>;
}

export function CreateError(message: string, name: string): Error {
    let error = new Error(message)
    error.name = name
    return error
}

export function GetSlotValues(handlerInput: HandlerInput): SlotValues {
    if (handlerInput.requestEnvelope.request.type === RequestTypes.Intent) {
        const filledSlots = handlerInput.requestEnvelope.request.intent.slots
        const slotValues: SlotValues = {};

        if (filledSlots) {
            Object.keys(filledSlots).forEach((item) => {
                const name = filledSlots[item].name;
                const value = filledSlots[item].value;
                const confirmationStatus = filledSlots[item].confirmationStatus;

                if (filledSlots[item]
                    && filledSlots[item].resolutions
                    && filledSlots[item].resolutions!.resolutionsPerAuthority) {

                    const resolutions = filledSlots[item].resolutions!.resolutionsPerAuthority!;

                    let foundMatch = false;

                    for (let resolution of resolutions) {
                        switch (resolution.status.code) {
                            case "ER_SUCCESS_MATCH":
                                foundMatch = true;

                                const valueWrappers = resolution.values;

                                if (valueWrappers.length > 1) {
                                    slotValues[name] = {
                                        name: name,
                                        value: value,
                                        isMatch: true,
                                        confirmationStatus: confirmationStatus,
                                    };
                                    break;
                                }

                                slotValues[name] = {
                                    name: name,
                                    value: value,
                                    isMatch: true,
                                    confirmationStatus: confirmationStatus,
                                };
                                break;
                            case "ER_SUCCESS_NO_MATCH":
                                if (!slotValues[name]) {
                                    slotValues[name] = {
                                        name: name,
                                        value: value,
                                        isMatch: false,
                                        confirmationStatus: confirmationStatus,
                                    };
                                }
                                break;
                            default:
                                break;
                        }

                        if (foundMatch) {
                            break;
                        }
                    }
                }
                // slots which do not have any resolutions but have a value
                // e.g. for AMAZON.NUMBER
                else if (filledSlots[item]
                    && !filledSlots[item].resolutions
                    && filledSlots[item].value) {
                    slotValues[name] = {
                        name: name,
                        value: value,
                        isMatch: true,
                        confirmationStatus: confirmationStatus,
                    };
                } else {
                    slotValues[name] = {
                        name: name,
                        value: value,
                        isMatch: false,
                        confirmationStatus: confirmationStatus,
                    };
                }
            });
        }

        return slotValues;
    }
    else
        return {}
}
