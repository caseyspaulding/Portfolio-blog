export function absoluteUrl ( path: string ): string
{
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://eventjacket.com';
  return `${ baseUrl }${ path }`;
}