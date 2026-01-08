import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="card">
      <h1>Baseline</h1>
      <p>Next.js + Prisma + PostgreSQL starter with magic-link auth.</p>
      <div className="actions">
        <Link className="button" href="/auth/signin">
          Sign in
        </Link>
        <Link className="button secondary" href="/w/ra24/admin">
          Workspace admin
        </Link>
      </div>
    </section>
  );
}
