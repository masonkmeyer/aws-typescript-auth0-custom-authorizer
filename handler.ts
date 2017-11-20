import { Authorizer } from './src/authorizer';
import { AWSPolicyGenerator } from './src/aws-policy-generator';

const AUDIENCE = process.env.AUDIENCE;
const JWKS_URI = process.env.JWKS_URI;
const TOKEN_ISSUER = process.env.TOKEN_ISSUER;

export const authorize = (event, context, cb) => {
  try {
    const token = event.authorizationToken.substring(7);
    const client = new Authorizer(TOKEN_ISSUER, JWKS_URI, AUDIENCE);

    client.authorize(token)
      .then((result) => {
        cb(null,
          AWSPolicyGenerator.generate(result.sub, 'Allow', event.methodArn));
      })
      .catch(err => {
        console.log(err);
        cb('Unauthorized');
      });
  } catch (err) {
    console.log(err);
    cb('Unauthorized')
  }
}