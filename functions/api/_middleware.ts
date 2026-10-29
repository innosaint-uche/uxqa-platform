import { Env } from '../types';

export const onRequest: PagesFunction<Env> = async (context) => {
  const { request, next } = context;

  // Handle preflight OPTIONS request
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With, X-Super-Admin-Email',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  try {
    const response = await next();
    const newHeaders = new Headers(response.headers);
    newHeaders.set('Access-Control-Allow-Origin', '*');
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    newHeaders.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, X-Super-Admin-Email');
    newHeaders.set('X-Content-Type-Options', 'nosniff');
    newHeaders.set('X-Frame-Options', 'DENY');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders,
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal Edge Error',
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      }
    );
  }
};
