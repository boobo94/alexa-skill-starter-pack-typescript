import * as express from "express";
import * as bodyParser from "body-parser";
import { LambdaHandler } from "ask-sdk-core/dist/skill/factory/BaseSkillFactory";
import { RequestEnvelope } from "ask-sdk-model";
import { AddressInfo } from "net";

import {handler} from './index.handler'

// Convert LambdaFunction to RequestHandler

function ConvertHandler(handler: LambdaHandler): express.RequestHandler {
    return (req, res) => {
        handler(req.body as RequestEnvelope, null, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            return res.status(200).json(result);
        });
    };
}

// create server
const server = express();
const listener = server.listen(process.env.port || process.env.PORT || 3000, function () {
    const { address, port } = listener.address() as AddressInfo;
    console.log('%s listening to %s%s', server.name, address, port);
});

// parse json
server.use(bodyParser.json());

// connect the lambda functions to http
server.post("/", ConvertHandler(handler));