# used python cause i pulled in some hello world example that used it
import boto3


def main(event, context):
    import logging as log
    import cfnresponse
    log.getLogger().setLevel(log.INFO)

    # This needs to change if there are to be multiple resources in the same stack
    physical_id = 'TheOnlyCustomResource'
    # shows we can interact with the dynamo api
    client = boto3.client('dynamodb')
    result = client.describe_table(
        TableName='prodEventsTable'
    )

    try:
        log.info(f'Input event: {event}')
        log.info(f'result: {result}')

        # Check if this is a Create and we're failing Creates
        if event['RequestType'] == 'Create' and event['ResourceProperties'].get('FailCreate', False):
            raise RuntimeError('Create failure requested')

        # Do the thin
        attributes = {
            'Response': 'You said foooo'
        }

        cfnresponse.send(event, context, cfnresponse.SUCCESS, attributes, physical_id)
    except Exception as e:
        log.exception(e)
        # cfnresponse's error message is always "see CloudWatch"
        cfnresponse.send(event, context, cfnresponse.FAILED, {}, physical_id)
