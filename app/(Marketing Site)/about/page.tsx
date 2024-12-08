import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import NavBar from '@/components/NavBar';
import PageBackground from '@/components/PageBackGround';

export const metadata = {
    title: 'About - Casey Spaulding',
    description: 'Learn more about Casey Spaulding, an experienced software engineer specializing in AI, ML, and full-stack development.',
};

export default function AboutPage ()
{
    const skills = [
        ".NET", "C#", "Python", "TypeScript", "React", "PostgreSQL", "SQL Server",
        "AWS (S3, EC2, RDS)", "Entity Framework", "Dapper", "Angular", "Azure", "Machine Learning (PyTorch, TensorFlow)",
    ];

    const experiences = [
        { year: "2024", title: "Software Engineer", company: "Accenture Federal Services" },
        { year: "2023", title: "Full Stack Developer (Subcontractor for USDA)", company: "Experis" },
        { year: "2023", title: "Java Full Stack Developer (VETTEC Program)", company: "SkillStorm" },
        { year: "2023", title: "Software Developer", company: "NovaCharge - EV Solutions" },
        { year: "2019 - 2023", title: "Full Stack Developer (Freelance)", company: "BlueJackett Systems" },
        { year: "2019 - 2021", title: "Cyber Patriot Coach & NJROTC Instructor", company: "San Diego Unified School District" },
        { year: "1998 - 2019", title: "Talent Acquisition & Maintenance Technician", company: "US Navy" },
    ];

    return (
        <>
            <PageBackground>
           
                <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 ">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16 p-5 rounded-lg dark:bg-slate-950 bg-white">
                    <div>
                        <h1 className="text-4xl font-bold mb-4">About Me</h1>
                        <p className="text-xl mb-6">
                            Hi, I'm Casey Spaulding, an experienced Software Engineer specializing in C#, Python, and TypeScript with a passion for cloud technologies, machine learning, and full-stack development.
                        </p>
                        <p className="mb-6">
                            With over two decades of professional experience, I’ve transitioned from military service to leading innovative tech projects. My career includes a diverse range of roles in software engineering, education, and leadership, providing me with a unique blend of technical expertise and strategic insight.
                        </p>
                        <p>
                            I’m currently diving deep into machine learning and natural language processing, building projects with frameworks like PyTorch, TensorFlow, and Hugging Face Transformers. Outside work, I enjoy hiking, exploring AI, and mentoring aspiring developers.
                        </p>
                    </div>
                    <div className="relative h-96 rounded-lg overflow-hidden shadow-xl">
                        <Image
                            src="/images/avatars/family2.jpg"
                            alt="Casey Spaulding"
                            layout="fill"
                            objectFit="cover"
                            className="rounded-lg"
                        />
                    </div>
                </div>

                    <Card className="mb-16 p-5 rounded-lg dark:bg-slate-950 bg-white">
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

                    <section className="mt-16 p-5 rounded-lg dark:bg-slate-950 bg-white">
                    <h2 className="text-3xl font-bold mb-8">Experience Timeline</h2>
                        <div className="space-y-8 ">
                        { experiences.map( ( exp, index ) => (
                            <Card key={ index }>
                                <CardContent className="flex items-center p-6">
                                    <div className="text-4xl font-bold text-blue-700 mr-6">{ exp.year }</div>
                                    <div>
                                        <h3 className="text-xl font-semibold">{ exp.title }</h3>
                                        <p className="text-gray-600">{ exp.company }</p>
                                    </div>
                                </CardContent>
                            </Card>
                        ) ) }
                    </div>
                </section>

                    <section className="mt-16 mt-16 p-5 rounded-lg dark:bg-slate-950 bg-white">
                    <h2 className="text-3xl font-bold mb-8">Certifications & Recognitions</h2>
                    <div className="space-y-4">
                        <p className="text-lg">
                            <strong>Certifications:</strong> Agile Software Design, Domain-Driven Design, C# Algorithms, Software Security & Vulnerabilities.
                        </p>
                        <p className="text-lg">
                            <strong>Honors & Awards:</strong> Navy and Marine Corps Commendation Medal (3 awards), Navy and Marine Corps Achievement Medal.
                        </p>
                    </div>
                </section>
                </main>
            </PageBackground>
        </>
    );
}
