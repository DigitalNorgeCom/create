'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { signIn } from 'next-auth/react';

export function SignInForm() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    await signIn('email', {
      email,
      callbackUrl: '/'
    });
    setSubmitting(false);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Work email
        <input
          className="input"
          type="email"
          name="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@company.com"
          required
        />
      </label>
      <button className="button" type="submit" disabled={submitting}>
        {submitting ? 'Sending magic link…' : 'Send magic link'}
      </button>
      <p className="helper">
        Check MailHog for the sign-in email when running locally.
      </p>
    </form>
  );
}
