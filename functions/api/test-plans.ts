import { Env, TestPlan } from '../types';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);
  const projectSlug = url.searchParams.get('projectSlug') || 'aira-academy';

  try {
    if (env.DB) {
      const { results } = await env.DB.prepare(`
        SELECT tp.*, p.slug as project_slug, p.name as project_name
        FROM test_plans tp
        JOIN projects p ON tp.project_id = p.id
        WHERE p.slug = ? OR tp.project_id = ?
        ORDER BY tp.updated_at DESC
      `).bind(projectSlug, projectSlug).all();

      if (results && results.length > 0) {
        return new Response(
          JSON.stringify({
            success: true,
            source: 'cloudflare-d1',
            plans: results.map((r: any) => ({
              id: r.id,
              projectId: r.project_id,
              projectSlug: r.project_slug,
              title: r.title,
              targetUrl: r.target_url,
              version: r.version,
              viewport: r.viewport,
              steps: JSON.parse(r.steps_json || '[]'),
              createdAt: r.created_at,
              updatedAt: r.updated_at,
            })),
          }),
          { status: 200, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    // Default Seeded Plan for Vibe Coders when none yet authored in D1
    const defaultSteps = [
      { id: 'step-1', order: 1, type: 'navigate', description: 'Load target application URL and wait for DOM network idle', timeoutMs: 5000 },
      { id: 'step-2', order: 2, type: 'assert_visible', targetSelector: 'h1, [data-hero-title]', expectedValue: 'visible', description: 'Assert primary conversion heading renders cleanly' },
      { id: 'step-3', order: 3, type: 'check_a11y', targetSelector: 'button, a', expectedValue: '>=48px', description: 'Verify all interactive tap targets exceed 48px on mobile viewports' },
      { id: 'step-4', order: 4, type: 'screenshot', targetSelector: 'body', expectedValue: 'full_page', description: 'Capture full-page high-resolution screenshot for visual regression baseline' },
    ];

    return new Response(
      JSON.stringify({
        success: true,
        source: 'default-template',
        plans: [
          {
            id: `plan_${projectSlug}_default`,
            projectId: projectSlug,
            projectSlug,
            title: `Core Conversion Journey: ${projectSlug}`,
            targetUrl: projectSlug === 'aira-academy' ? 'https://aira.radoss.agency' : projectSlug === 'naija-grid' ? 'https://naijagrid.com' : projectSlug === 'deepsyque' ? 'https://deepsyque.com' : 'https://eatalia.ng',
            version: 'v1.0',
            viewport: 'responsive',
            steps: defaultSteps,
            createdAt: new Date().toISOString(),
          }
        ],
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Failed to fetch test plans' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  try {
    const body = (await request.json()) as TestPlan;

    if (!body.title || !body.targetUrl || !body.steps || body.steps.length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: 'Title, target URL, and at least one journey step are required.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const planId = body.id || `plan_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const version = body.version || 'v1.0';

    if (env.DB) {
      // Find matching project_id in D1
      const projectRow = await env.DB.prepare(`
        SELECT id FROM projects WHERE slug = ? OR id = ? LIMIT 1
      `).bind(body.projectSlug || body.projectId || 'aira-academy', body.projectId || 'proj_aira_01').first<{ id: string }>();

      const projectId = projectRow?.id || 'proj_aira_01';

      await env.DB.prepare(`
        INSERT INTO test_plans (id, project_id, title, target_url, version, viewport, steps_json, updated_at)
        VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
        ON CONFLICT(id) DO UPDATE SET
          title = excluded.title,
          target_url = excluded.target_url,
          version = excluded.version,
          viewport = excluded.viewport,
          steps_json = excluded.steps_json,
          updated_at = CURRENT_TIMESTAMP
      `).bind(
        planId,
        projectId,
        body.title,
        body.targetUrl,
        version,
        body.viewport || 'desktop',
        JSON.stringify(body.steps)
      ).run();
    }

    return new Response(
      JSON.stringify({
        success: true,
        planId,
        version,
        message: 'Test journey saved to Cloudflare D1 successfully.',
      }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ success: false, error: err.message || 'Failed to save test plan' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
