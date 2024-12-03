import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import NavBar from '@/components/NavBar'

export const metadata = {
    title: 'About - CaseySpaulding',
    description: 'Learn more about Casey Spaulding, a full-stack developer passionate about creating innovative web solutions.',
}

export default function AboutPage ()
{
    const skills = [
        "JavaScript", "TypeScript", "React", "Next.js", "Node.js",
        "Express", "SQL", "MongoDB", "GraphQL", "AWS"
    ]

    const experiences = [
        { year: "2023", title: "Senior Full Stack Developer", company: "Tech Innovators Inc." },
        { year: "2021", title: "Full Stack Developer", company: "Web Solutions Co." },
        { year: "2019", title: "Junior Developer", company: "StartUp Ventures" },
        { year: "2018", title: "Computer Science Degree", company: "Tech University" },
    ]

    return (<>
          <NavBar />
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32">
           
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
                <div>
                    <h1 className="text-4xl font-bold mb-4">About Me</h1>
                    <p className="text-xl mb-6">
                        Hi, I'm Casey Spaulding, a passionate full-stack developer with a keen interest in building scalable web applications and exploring new technologies.
                    </p>
                    <p className="mb-6">
                        With over 5 years of experience in the tech industry, I've had the opportunity to work on a wide range of projects, from small business websites to large-scale enterprise applications. I'm always eager to take on new challenges and continue learning in this ever-evolving field.
                    </p>
                    <p>
                        When I'm not coding, you can find me hiking in the great outdoors, reading sci-fi novels, or experimenting with new recipes in the kitchen.
                    </p>
                </div>
                <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                    <Image
                        src="/placeholder.svg?height=384&width=384"
                        alt="Casey Spaulding"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-lg"
                    />
                </div>
            </div>

            <Card className="mb-16">
                <CardHeader>
                    <CardTitle className="text-2xl">Skills & Technologies</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="flex flex-wrap gap-2">
                        { skills.map( ( skill ) => (
                            <Badge key={ skill } variant="secondary">{ skill }</Badge>
                        ) ) }
                    </div>
                </CardContent>
            </Card>

            <section>
                <h2 className="text-3xl font-bold mb-8">Experience Timeline</h2>
                <div className="space-y-8">
                    { experiences.map( ( exp, index ) => (
                        <Card key={ index }>
                            <CardContent className="flex items-center p-6">
                                <div className="text-4xl font-bold text-blue-600 mr-6">{ exp.year }</div>
                                <div>
                                    <h3 className="text-xl font-semibold">{ exp.title }</h3>
                                    <p className="text-gray-600">{ exp.company }</p>
                                </div>
                            </CardContent>
                        </Card>
                    ) ) }
                </div>
            </section>
        </main>
    </>
    )
    
}

