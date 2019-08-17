import { SkillBuilders, DynamoDbPersistenceAdapter } from 'ask-sdk';
import * as Intents from './intents'
import * as Errors from './errors';
import * as Interceptors from './interceptors'
import { config } from './interceptors/config';

export const handler = SkillBuilders.custom()
    .addRequestHandlers(

        // built in intents
        Intents.LaunchRequestHandler,
        Intents.HelpIntentHandler,
        Intents.CancelAndStopIntentHandler,
        Intents.SessionEnded,
        Intents.Fallback,

         // custom
        Intents.HelloWorldIntentHandler,

        // custom intents
    )
    .addErrorHandlers(
        Errors.Unknown,
    )
    .addRequestInterceptors(
        Interceptors.LoadPersistentAttributes,
        Interceptors.Localization,
    ).addResponseInterceptors(
        Interceptors.SavePersistentAttributes,
    )
    .withPersistenceAdapter(new DynamoDbPersistenceAdapter({
        createTable: true,
        tableName: config.dynamoDbTableName,
    }))
    .lambda();
