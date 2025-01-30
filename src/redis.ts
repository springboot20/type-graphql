// import Redis from "ioredis";
import { createClient } from "redis";

// Initialize client.
export let redisClient = createClient();
