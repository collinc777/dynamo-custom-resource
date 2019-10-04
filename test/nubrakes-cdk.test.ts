import {expect as expectCDK, haveResource} from '@aws-cdk/assert';
import {App} from "@aws-cdk/core";
import {CustomDynamoExampleStack} from "../lib/dynamo-example-cdk-stack";

test('SQS Queue Created', () => {
    const app = new App();
    // WHEN
    const stack = new CustomDynamoExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::SQS::Queue", {
        VisibilityTimeout: 300
    }));
});

test('SNS Topic Created', () => {
    const app = new App();
    // WHEN
    const stack = new CustomDynamoExampleStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::SNS::Topic"));
});
