import { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import NavBar from "@/components/NavBar"
import PageBackground from "@/components/PageBackGround"

export const metadata: Metadata = {
  title: "Contact Us - CaseySpaulding",
  description:
    "Get in touch with the Casey. I would love to hear from you! Send me a email or contact me on LinkedIn.",
}

export default function Contact ()
{
  return (
    <><PageBackground >

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-2 py-2 sm:py-2 lg:py-2">
        <div className="bg-background py-24 sm:py-12 mt-16 p-5 mb-14 rounded-lg dark:bg-slate-950 bg-white" >
          <div className="container mx-auto px-4 lg:px-8 mb-8">
            <div className="space-y-16">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
                <div>
                  <h1 className="text-3xl font-bold tracking-tight">Contact</h1>
                  <p className="mt-4 text-muted-foreground">
                    Contact me directly if you have any questions.{ ' ' }
                    <a href="mailto:casey@REIstacks.com" className="font-semibold text-primary">
                      casey@REIstacks.com
                    </a>
                  </p>
                  <div className="mt-4 text-muted-foreground">

                    <div className="mt-2">
                      Address: 1101 Miranda Lane<br />
                      Kissimmee, FL. 34741
                    </div>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0">
                  <h3 className="text-lg font-semibold">Follow </h3>
                  <div className="mt-4 flex space-x-4">

                    <Button variant="link" asChild>
                      <a href="https://twitter.com/CaseySpaulding_">X</a>
                    </Button>
                    <Button variant="link" asChild>
                      <a href="https://www.linkedin.com/in/caseyspaulding/">LinkedIn</a>
                    </Button>
                  </div>
                </div>
                <div className="mt-12 lg:mt-0">
                  <h3 className="text-lg font-semibold">Location</h3>
                  <div className="mt-4">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14045.509180239367!2d-81.4144439!3d28.3474407!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88dd86daf816a1ad%3A0xa25df25bf6770055!2sSBC%20Office%20Center!5e0!3m2!1sen!2sus!4v1727818350859!5m2!1sen!2sus"
                      width="100%"
                      height="300"
                      style={ { border: 0 } }
                      allowFullScreen={ true }
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

      </main>
    </PageBackground>
    </>
  )
}

