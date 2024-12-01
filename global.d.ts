// global.d.ts
declare global
{
  interface Window
  {
    google: any;
  }
}

export { };
interface Window
{
  handleSignInWithGoogle: ( response: { credential: string } ) => Promise<void>;
}