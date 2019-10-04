#!/usr/bin/env node
import cdk = require('@aws-cdk/core');
import {CustomDynamoExampleStack} from "../lib/dynamo-example-cdk-stack";

const app = new cdk.App();
new CustomDynamoExampleStack(app, 'CustomDynamoStack');
