import { Redis } from 'ioredis';
import { v4 } from 'uuid';
export const createConfirmationUrl = async (userId: number, redis: Redis) => {
  const token = v4();
  await redis.set(token, userId, 'ex', 60 * 60 * 24);
  return `http://localhost:3000/user/confirm/${token}`;
};
