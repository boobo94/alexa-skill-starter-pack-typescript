import { Slot, SlotConfirmationStatus } from "ask-sdk-model";

export enum IntentTypes {
    Help = "AMAZON.HelpIntent",
    Stop = "AMAZON.StopIntent",
    Cancel = "AMAZON.CancelIntent",
    Fallback = "AMAZON.FallbackIntent",
    Yes = "AMAZON.YesIntent",
    No = "AMAZON.NoIntent",
    Pause = "AMAZON.PauseIntent",

}

export enum RequestTypes {
    Launch = "LaunchRequest",
    Intent = "IntentRequest",
    SessionEnded = "SessionEndedRequest",
}

export enum States {
}

export enum Errors {
}

export enum SlotTypes {
}

export type SlotValue = {
    name: string;
    value: string
    isMatch: boolean;
    confirmationStatus: SlotConfirmationStatus;
}

export type SlotValues = {
    [key: string]: SlotValue | undefined;

}
