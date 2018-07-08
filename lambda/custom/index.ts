import * as  Alexa from 'ask-sdk'
import * as Handlers from './handlers/builtin.handler'
import * as ErrorHandlers from './handlers/errors.handler'
import { HelloWorldIntentHandler } from './handlers/helloWorldIntent.handler'

export const handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        Handlers.LaunchRequestHandler,
        HelloWorldIntentHandler,
        Handlers.HelpIntentHandler,
        Handlers.CancelAndStopIntentHandler,
        Handlers.SessionEndedRequestHandler,
)
    .addErrorHandlers(ErrorHandlers.Default)
    .lambda();
