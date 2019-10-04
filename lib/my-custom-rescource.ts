import * as fs from "fs";
import {Construct, Duration} from "@aws-cdk/core";
import {CustomResource, CustomResourceProvider} from "@aws-cdk/aws-cloudformation";
import * as lambda from "@aws-cdk/aws-lambda"
import {PolicyStatement} from "@aws-cdk/aws-iam";
import {CfnTableProps} from "@aws-cdk/aws-dynamodb";

export interface MyCustomResourceProps {
    /**
     * Message to echo
     */
    message: string;
    foo: string,
}


export class MyCustomResource extends Construct {
    public readonly response: string;

    constructor(scope: Construct, id: string, props: CfnTableProps) {
        super(scope, id);


        const statement = new PolicyStatement();
        statement.addAllResources();
        statement.addActions("dynamodb:*");
        const resource = new CustomResource(this, 'Resource', {
            provider: CustomResourceProvider.lambda(new lambda.SingletonFunction(this, 'Singleton', {
                uuid: 'f7d4f730-4ee1-11e8-9c2d-fa7ae01bbebc',
                code: new lambda.InlineCode(fs.readFileSync('custom-resource-handler.py', {encoding: 'utf-8'})),
                handler: 'index.main',
                timeout: Duration.seconds(300),
                runtime: lambda.Runtime.PYTHON_3_6,
                initialPolicy: [
                    statement,
                ]

            })),
            properties: props
        });

        this.response = resource.getAtt('Response').toString();
    }
}
