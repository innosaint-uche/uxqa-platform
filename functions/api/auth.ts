import { Env } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const { email, password } = (await request.json()) as { email?: string; password?: string };

    if (!email || !password) {
      return new Response(
        JSON.stringify({ success: false, error: 'Email and password/token are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cleanEmail = email.trim().toLowerCase();
    const authorized = (env.SUPER_ADMIN_EMAILS || 'uchenna@radossdigital.com,innosaint.uche@gmail.com')
      .split(',')
      .map((e) => e.trim().toLowerCase());

    const isSuperAdmin = authorized.includes(cleanEmail);

    if (!isSuperAdmin) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Access restricted. User is not an authorized Super Admin.',
        }),
        { status: 403, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Return authenticated session payload
    return new Response(
      JSON.stringify({
        success: true,
        user: {
          email: cleanEmail,
          role: 'Super Admin',
          permissions: ['all_workspaces', 'all_projects', 'd1_admin', 'r2_admin'],
        },
        sessionToken: `token_edge_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Authentication error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
