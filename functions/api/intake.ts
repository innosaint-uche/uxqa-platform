import { Env, WaitlistPayload } from '../types';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  try {
    const body = (await request.json()) as WaitlistPayload;

    // Strict validation
    if (!body.workEmail || !body.workEmail.includes('@')) {
      return new Response(
        JSON.stringify({ success: false, error: 'A valid work email is required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!body.fullName || !body.productName) {
      return new Response(
        JSON.stringify({ success: false, error: 'Full name and product name are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const id = `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const email = body.workEmail.trim().toLowerCase();

    // Check if D1 database binding exists
    if (env.DB) {
      const stmt = env.DB.prepare(`
        INSERT INTO waitlist_subscribers (
          id, full_name, work_email, organization, role,
          product_name, production_url, repo_url, tech_stack,
          target_persona, top_pain_point, review_rigor, referral_source,
          status, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', CURRENT_TIMESTAMP)
        ON CONFLICT(work_email) DO UPDATE SET
          full_name = excluded.full_name,
          organization = excluded.organization,
          role = excluded.role,
          product_name = excluded.product_name,
          production_url = excluded.production_url,
          repo_url = excluded.repo_url,
          tech_stack = excluded.tech_stack,
          target_persona = excluded.target_persona,
          top_pain_point = excluded.top_pain_point,
          review_rigor = excluded.review_rigor,
          referral_source = excluded.referral_source,
          updated_at = CURRENT_TIMESTAMP
      `);

      await stmt
        .bind(
          id,
          body.fullName.trim(),
          email,
          body.organization?.trim() || null,
          body.role || 'Vibe Coder',
          body.productName.trim(),
          body.productionUrl?.trim() || null,
          body.repoUrl?.trim() || null,
          body.techStack?.trim() || 'Vite + React + Tailwind',
          body.targetPersona || 'Non-technical Consumer',
          body.topPainPoint || 'General regression anxiety',
          body.reviewRigor || 'Full Executive Suite',
          body.referralSource || 'Radoss Ecosystem'
        )
        .run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        id,
        email,
        status: 'pending',
        cohort: 'Cohort 1 (Active Priority)',
        message: 'Onboarding calibration profile accepted.',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Failed to process intake submission' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  // Super Admin validation
  const authHeader = request.headers.get('Authorization') || '';
  const adminEmail = request.headers.get('x-super-admin-email') || '';

  const authorizedEmails = (env.SUPER_ADMIN_EMAILS || 'uchenna@radossdigital.com,innosaint.uche@gmail.com')
    .split(',')
    .map((e) => e.trim().toLowerCase());

  const isAuthorized = authorizedEmails.includes(adminEmail.trim().toLowerCase());

  if (!isAuthorized && !authHeader.includes('Bearer')) {
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Unauthorized. Super Admin access required.',
      }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    if (!env.DB) {
      return new Response(
        JSON.stringify({
          success: true,
          count: 0,
          subscribers: [],
          notice: 'D1 binding not initialized in current local environment.',
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const { results } = await env.DB.prepare(`
      SELECT id, full_name, work_email, organization, role, product_name, 
             production_url, tech_stack, target_persona, top_pain_point, 
             review_rigor, status, created_at
      FROM waitlist_subscribers
      ORDER BY created_at DESC
      LIMIT 100
    `).all();

    return new Response(
      JSON.stringify({
        success: true,
        count: results.length,
        subscribers: results,
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Failed to query D1 subscribers' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
