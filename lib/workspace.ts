import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from './auth';
import { prisma } from './prisma';

export async function getWorkspaceContext(wsSlug: string) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect(`/auth/signin?callbackUrl=/w/${wsSlug}/admin`);
  }

  const workspace = await prisma.workspace.findUnique({
    where: { slug: wsSlug }
  });

  if (!workspace) {
    notFound();
  }

  const membership = await prisma.workspaceUser.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: session.user.id
      }
    }
  });

  if (!membership) {
    redirect('/403');
  }

  return {
    workspaceId: workspace.id,
    workspaceSlug: workspace.slug,
    role: membership.role,
    userId: session.user.id
  };
}
