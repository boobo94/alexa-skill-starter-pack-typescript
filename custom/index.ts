import { SkillBuilders } from 'ask-sdk';
import * as Intents from './intents'
import * as Errors from './errors';

export const handler = SkillBuilders.custom()
    .addRequestHandlers(

        // built in intents
        Intents.LaunchRequestHandler,
        Intents.HelpIntentHandler,
        Intents.CancelAndStopIntentHandler,
        
        // custom
        Intents.HelloWorldIntentHandler,
)
    .addErrorHandlers(
        Errors.Unknown,
    )
    .addRequestInterceptors(
       
    )
    .lambda();
