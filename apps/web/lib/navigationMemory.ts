import Redis from 'ioredis';

const redis = new Redis();

export async function recordNavPattern(key: string) {
  await redis.incr(key);
  await redis.expire(key, 60 * 60 * 6); // 6 hours
}

export async function getNavPattern(key: string) {
  const count = await redis.get(key);
  return Number(count || 0);
}
