// app/contact/layout.tsx
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact - CaseySpaulding",
  description:
    "Get in touch. I would love to hear from you! Send me a email or contact me on LinkedIn.",
}

import { ReactNode } from "react";

export default function ContactLayout ( { children }: { children: ReactNode } )
{
  return (
    <div>
      { children }
    </div>
  );
}