import { cache } from 'react';
import { headers } from 'next/headers';

import { createCaller, createTRPCContext } from '@xenous/api';

const createContext = cache(() => {
    const heads = new Headers(headers());
    heads.set('x-trpc-source', 'rsc');

    return createTRPCContext({
        headers: heads,
    });
});

export const api = createCaller(createContext);
