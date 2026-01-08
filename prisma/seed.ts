import { PrismaClient, WorkspacePlan, WorkspaceRole, ChannelType } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL;

  if (!adminEmail) {
    throw new Error('SEED_ADMIN_EMAIL is required to seed the database.');
  }

  const workspace = await prisma.workspace.upsert({
    where: { slug: 'ra24' },
    update: {},
    create: {
      slug: 'ra24',
      name: 'Rå24',
      plan: WorkspacePlan.PILOT
    }
  });

  const user = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail
    }
  });

  await prisma.workspaceUser.upsert({
    where: {
      workspaceId_userId: {
        workspaceId: workspace.id,
        userId: user.id
      }
    },
    update: {
      role: WorkspaceRole.ADMIN
    },
    create: {
      workspaceId: workspace.id,
      userId: user.id,
      role: WorkspaceRole.ADMIN
    }
  });

  await prisma.channel.upsert({
    where: {
      workspaceId_type_provider: {
        workspaceId: workspace.id,
        type: ChannelType.WEB,
        provider: 'internal'
      }
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      type: ChannelType.WEB,
      provider: 'internal',
      configJson: {}
    }
  });

  await prisma.channel.upsert({
    where: {
      workspaceId_type_provider: {
        workspaceId: workspace.id,
        type: ChannelType.EMAIL,
        provider: 'resend'
      }
    },
    update: {},
    create: {
      workspaceId: workspace.id,
      type: ChannelType.EMAIL,
      provider: 'resend',
      configJson: {}
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
