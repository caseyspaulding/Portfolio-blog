export function absoluteUrl ( path: string ): string
{
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://CaseySpaulding.com';
  return `${ baseUrl }${ path }`;
}