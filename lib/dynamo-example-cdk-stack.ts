/**
 * A stack that sets up MyCustomResource and shows how to get an attribute from it
 */
import {MyCustomResource} from "./my-custom-rescource";
import {App, CfnOutput, Stack, StackProps} from "@aws-cdk/core";
import {AttributeType, Table} from "@aws-cdk/aws-dynamodb";

export class CustomDynamoExampleStack extends Stack {
    constructor(scope: App, id: string, props?: StackProps) {
        super(scope, id, props);

        // only updates resource when params are updated
        const resource = new MyCustomResource(this, 'DemoResource', {
            keySchema: [
                {
                    attributeName: "id",
                    keyType: "RANGE"

                }
            ]
        });

        const table = new Table(this, "randomTable", {
            partitionKey: {
                name: "id",
                type: AttributeType.STRING,
            },
            writeCapacity: 2
        });

        // Publish the custom resource output
        new CfnOutput(this, 'ResponseMessage', {
            description: 'The message that came back from the Custom Resource',
            value: resource.response
        });
    }
}
