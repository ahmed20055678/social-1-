export declare class RedisService {
    private readonly redis_client;
    constructor();
    connect(): Promise<void>;
    setValue: ({ key, value, ttl }: {
        key: string;
        value: unknown;
        ttl?: number;
    }) => Promise<string | null>;
    update: ({ key, value, ttl }: {
        key: string;
        value: unknown;
        ttl?: number;
    }) => Promise<0 | 1>;
    getValue: (key: string) => Promise<unknown | null>;
    ttl: (key: string) => Promise<number>;
    exists: (key: string) => Promise<boolean>;
    expire: ({ key, ttl }: {
        key: string;
        ttl: number;
    }) => Promise<number | false>;
    deleteKey: (key: string | string[]) => Promise<number>;
    keys: (key: string) => Promise<string[]>;
    incr: (key: string) => Promise<number>;
}
declare const _default: RedisService;
export default _default;
//# sourceMappingURL=redis.connection.d.ts.map