import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { http } from '@xenous/http';

export const createTRPCContext = (opts: { headers: Headers }) => {
    const source = opts.headers.get('x-trpc-source') ?? 'unknown';

    console.log('>>> tRPC Request from', source, 'by', undefined);

    return {
        http,
        ...opts,
    };
};

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superjson,
    errorFormatter: ({ shape, error }) => ({
        ...shape,
        data: {
            ...shape.data,
            zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
        },
    }),
});

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure;
