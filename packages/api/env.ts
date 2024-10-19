/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// @ts-nocheck

import { createEnv } from '@t3-oss/env-nextjs';

import { env as httpEnv } from '@xenous/http/env';

export const env = createEnv({
    extends: [httpEnv] as any,
    server: {},
    client: {},
    shared: {},
    experimental__runtimeEnv: {},
    skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION || process.env.npm_lifecycle_event === 'lint',
});
