
import { createClient, type RedisClientType } from "redis";

export class RedisService {
    private readonly redis_client: RedisClientType;

    constructor() {
        this.redis_client = createClient({
            url: process.env.REDIS_URL
        });
    }

    async connect() {
        await this.redis_client.connect();
        console.log("Redis connected Successfully");
    }

    setValue = async ({ key, value, ttl }: {
        key: string,
        value: unknown,
        ttl?: number
    }) => {
        try {
            const data = typeof value === "string"
                ? value
                : JSON.stringify(value);

            if (data === undefined) {
                throw new Error("Invalid Redis value");
            }

            if (ttl) {
                return await this.redis_client.set(key, data, { EX: ttl });
            }

            return await this.redis_client.set(key, data);

        } catch (error) {
            console.log("Redis setValue Error:", error);
            return null;
        }
    };

    update = async ({ key, value, ttl }: {
        key: string,
        value: unknown,
        ttl?: number
    }) => {
        try {
            if (!await this.redis_client.exists(key)) {
                return 0;
            }

            const data = typeof value === "string"
                ? value
                : JSON.stringify(value);

            if (data === undefined) {
                throw new Error("Invalid Redis value");
            }

            if (ttl) {
                await this.redis_client.set(key, data, { EX: ttl });
            } else {
                await this.redis_client.set(key, data);
            }

            return 1;

        } catch (error) {
            console.log("Redis update Error:", error);
            return 0;
        }
    };

    getValue = async (key: string): Promise<unknown | null> => {
        try {
            const value = await this.redis_client.get(key);

            if (value === null) {
                return null;
            }

            try {
                return JSON.parse(value);
            } catch {
                return value;
            }

        } catch (error) {
            console.log("Redis getValue Error:", error);
            return null;
        }
    };

    ttl = async (key: string): Promise<number> => {
        try {
            return await this.redis_client.ttl(key);
        } catch (error) {
            console.log("Redis ttl Error:", error);
            return -1;
        }
    };

    exists = async (key: string): Promise<boolean> => {
        try {
            return (await this.redis_client.exists(key)) > 0;
        } catch (error) {
            console.log("Redis exists Error:", error);
            return false;
        }
    };

    expire = async ({ key, ttl }: {
        key: string,
        ttl: number
    }) => {
        try {
            return await this.redis_client.expire(key, ttl);
        } catch (error) {
            console.log("Redis expire Error:", error);
            return false;
        }
    };

    deleteKey = async (key: string | string[]) => {
        try {
            if (!key || key.length === 0) {
                return 0;
            }

            return await this.redis_client.del(key);

        } catch (error) {
            console.log("Redis deleteKey Error:", error);
            return 0;
        }
    };

    keys = async (key: string): Promise<string[]> => {
        try {
            return await this.redis_client.keys(`${key}*`);
        } catch (error) {
            console.log("Redis keys Error:", error);
            return [];
        }
    };

    incr = async (key: string): Promise<number> => {
        try {
            return await this.redis_client.incr(key);
        } catch (error) {
            console.log("Redis incr Error:", error);
            return 0;
        }
    };
}

export default new RedisService() ;