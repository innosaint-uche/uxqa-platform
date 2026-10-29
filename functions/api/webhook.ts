import { Env } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Authorization check
  const apiKey = request.headers.get('x-cto-api-key') || '';
  const expectedKey = env.CTO_API_KEY || 'radoss-cto-cloud-qa-key-2026';

  if (apiKey !== expectedKey) {
    return new Response(
      JSON.stringify({ success: false, error: 'Unauthorized webhook callback.' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const payload = await request.json() as any;

    return new Response(
      JSON.stringify({
        success: true,
        receivedAt: new Date().toISOString(),
        event: payload.event || 'test_run.completed',
        message: 'Agent webhook broadcast processed successfully.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Webhook processing failed.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
