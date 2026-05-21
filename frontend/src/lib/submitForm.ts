// Sends form submissions to your email via Web3Forms (https://web3forms.com).
// No backend needed — it works from a static site. Get a free access key by
// entering your email at web3forms.com, then set it as VITE_WEB3FORMS_ACCESS_KEY
// in frontend/.env.local (see .env.example).

const ACCESS_KEY = (import.meta.env as Record<string, string | undefined>).VITE_WEB3FORMS_ACCESS_KEY;

export async function submitForm(subject: string, data: Record<string, unknown>): Promise<void> {
  if (!ACCESS_KEY) {
    throw new Error(
      'Forms are not configured yet. Add VITE_WEB3FORMS_ACCESS_KEY to frontend/.env.local (see .env.example).',
    );
  }

  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: ACCESS_KEY,
      subject,
      from_name: 'ShubhMandap website',
      ...data,
    }),
  });

  let json: { success?: boolean; message?: string } = {};
  try {
    json = await res.json();
  } catch {
    /* ignore parse errors, handled below */
  }

  if (!res.ok || !json.success) {
    throw new Error(json.message || 'Something went wrong sending your message. Please try again.');
  }
}
