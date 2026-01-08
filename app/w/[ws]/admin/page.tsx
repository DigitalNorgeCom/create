import { getWorkspaceContext } from '@/lib/workspace';

interface PageProps {
  params: { ws: string };
}

export default async function WorkspaceAdminPage({ params }: PageProps) {
  const context = await getWorkspaceContext(params.ws);

  return (
    <section className="card">
      <h1>Workspace admin</h1>
      <p className="helper">
        Workspace: <strong>{context.workspaceSlug}</strong>
      </p>
      <p className="helper">Role: {context.role}</p>
    </section>
  );
}
