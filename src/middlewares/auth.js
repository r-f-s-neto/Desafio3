import { expressjwt } from 'express-jwt';
import key from '../configs/secret.js';

const auth = expressjwt({
  secret: key,
  algorithms: ['HS256'],
});

export default auth;
