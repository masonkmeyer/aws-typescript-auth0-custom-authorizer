# About

This is a an implementation of an AWS custom authorizer for the serverless framework. 

This repository is for my reference. If you have any questions, open an issue and I would be happy to help. 

## Remember

1. Any serverless function using this function as an authorizer must configure the authorizer in the events.
```
functions:
  hello:
    handler: handler.hello
    events:
      - http:
          method: get
          cors: true
          path: hello
          authorizer:  arn:aws:lambda:us-east-1:539572642504:function:aws-custom-authorizer-auth0-dev-auth
          identitySource: method.request.header.Authorization 
```

2. Any serverless function using this function as an authorizer must configure a CORS response in resources. 
```
resources:
  Resources:    
    GatewayResponse:
      Type: 'AWS::ApiGateway::GatewayResponse'
      Properties:
        ResponseParameters:
          gatewayresponse.header.Access-Control-Allow-Origin: "'*'"
          gatewayresponse.header.Access-Control-Allow-Headers: "'*'"
        ResponseType: EXPIRED_TOKEN
        RestApiId:
          Ref: 'ApiGatewayRestApi'
        StatusCode: '401'
    AuthFailureGatewayResponse:
      Type: 'AWS::ApiGateway::GatewayResponse'
      Properties:
        ResponseParameters:
          gatewayresponse.header.Access-Control-Allow-Origin: "'*'"
          gatewayresponse.header.Access-Control-Allow-Headers: "'*'"
        ResponseType: UNAUTHORIZED
        RestApiId:
          Ref: 'ApiGatewayRestApi'
        StatusCode: '401'
```
