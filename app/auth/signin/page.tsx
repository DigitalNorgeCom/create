import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { SignInForm } from './sign-in-form';

export default async function SignInPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect('/');
  }

  return (
    <section className="card">
      <h1>Sign in</h1>
      <p className="helper">
        We will email you a magic link for passwordless access.
      </p>
      <SignInForm />
    </section>
  );
}
