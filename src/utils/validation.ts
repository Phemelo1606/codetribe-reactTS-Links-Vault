export const MAX_TAGS = 6;

/** Adds https:// when the person pastes a bare domain like "example.com". */
export function normalizeUrl(input: string): string {
  const value = input.trim();
  if (!value) return value;
  return /^[a-z][a-z0-9+.-]*:\/\//i.test(value) ? value : `https://${value}`;
}

export function isValidUrl(input: string): boolean {
  try {
    const url = new URL(normalizeUrl(input));
    const isWeb = url.protocol === 'http:' || url.protocol === 'https:';
    return isWeb && url.hostname.includes('.');
  } catch {
    return false;
  }
}

/** "News, tools ,news" -> ["news", "tools"] */
export function parseTags(input: string): string[] {
  const seen = new Set<string>();
  for (const raw of input.split(',')) {
    const tag = raw.trim().toLowerCase();
    if (tag) seen.add(tag);
  }
  return Array.from(seen).slice(0, MAX_TAGS);
}

export interface FormErrors {
  title?: string;
  url?: string;
}

export function validate(fields: { title: string; url: string }): FormErrors {
  const errors: FormErrors = {};
  if (!fields.title.trim()) {
    errors.title = 'Give this link a name so you can find it later.';
  }
  if (!fields.url.trim()) {
    errors.url = 'Paste the link you want to keep.';
  } else if (!isValidUrl(fields.url)) {
    errors.url = 'That doesn’t look like a web address. Try https://example.com.';
  }
  return errors;
}
