

import React, { SVGProps } from 'react';
import Head from 'next/head';
import NavBar1 from '@/components/NavBarTW/NavBar1';
import FooterFull from '@/components/Footers/FooterFull';
import { Metadata } from 'next';
import PageBackground from '@/components/PageBackGround';
import P from 'react';


export const metadata: Metadata = {
  title: 'About Casey Spaulding',
  description: 'Learn more about Casey Spaulding',
}
const CaseyAuthorPage = () =>
{
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Casey",
    "url": "https://www.CaseySpaulding.com/authors/casey-spaulding",
    "image": "https://www.CaseySpaulding.com/images/caseyProfilePic.jpg", // Replace with your image URL
    "sameAs": [
      "https://www.linkedin.com/in/caseyspaulding/"

    ],
    "jobTitle": ".NET Full Stack Developer",
    "worksFor": {
      "@type": "Organization",
      "name": "CaseySpaulding"
    }
  };

  const navigation = {
    social: [
      {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/in/caseyspaulding/',
        icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
          <svg fill="currentColor" x="0px" y="0px" width="24" height="24" viewBox="0 0 50 50">
            <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 14 11.011719 C 12.904779 11.011719 11.919219 11.339079 11.189453 11.953125 C 10.459687 12.567171 10.011719 13.484511 10.011719 14.466797 C 10.011719 16.333977 11.631285 17.789609 13.691406 17.933594 A 0.98809878 0.98809878 0 0 0 13.695312 17.935547 A 0.98809878 0.98809878 0 0 0 14 17.988281 C 16.27301 17.988281 17.988281 16.396083 17.988281 14.466797 A 0.98809878 0.98809878 0 0 0 17.986328 14.414062 C 17.884577 12.513831 16.190443 11.011719 14 11.011719 z M 14 12.988281 C 15.392231 12.988281 15.94197 13.610038 16.001953 14.492188 C 15.989803 15.348434 15.460091 16.011719 14 16.011719 C 12.614594 16.011719 11.988281 15.302225 11.988281 14.466797 C 11.988281 14.049083 12.140703 13.734298 12.460938 13.464844 C 12.78117 13.19539 13.295221 12.988281 14 12.988281 z M 11 19 A 1.0001 1.0001 0 0 0 10 20 L 10 39 A 1.0001 1.0001 0 0 0 11 40 L 17 40 A 1.0001 1.0001 0 0 0 18 39 L 18 33.134766 L 18 20 A 1.0001 1.0001 0 0 0 17 19 L 11 19 z M 20 19 A 1.0001 1.0001 0 0 0 19 20 L 19 39 A 1.0001 1.0001 0 0 0 20 40 L 26 40 A 1.0001 1.0001 0 0 0 27 39 L 27 29 C 27 28.170333 27.226394 27.345035 27.625 26.804688 C 28.023606 26.264339 28.526466 25.940057 29.482422 25.957031 C 30.468166 25.973981 30.989999 26.311669 31.384766 26.841797 C 31.779532 27.371924 32 28.166667 32 29 L 32 39 A 1.0001 1.0001 0 0 0 33 40 L 39 40 A 1.0001 1.0001 0 0 0 40 39 L 40 28.261719 C 40 25.300181 39.122788 22.95433 37.619141 21.367188 C 36.115493 19.780044 34.024172 19 31.8125 19 C 29.710483 19 28.110853 19.704889 27 20.423828 L 27 20 A 1.0001 1.0001 0 0 0 26 19 L 20 19 z M 12 21 L 16 21 L 16 33.134766 L 16 38 L 12 38 L 12 21 z M 21 21 L 25 21 L 25 22.560547 A 1.0001 1.0001 0 0 0 26.798828 23.162109 C 26.798828 23.162109 28.369194 21 31.8125 21 C 33.565828 21 35.069366 21.582581 36.167969 22.742188 C 37.266572 23.901794 38 25.688257 38 28.261719 L 38 38 L 34 38 L 34 29 C 34 27.833333 33.720468 26.627107 32.990234 25.646484 C 32.260001 24.665862 31.031834 23.983076 29.517578 23.957031 C 27.995534 23.930001 26.747519 24.626988 26.015625 25.619141 C 25.283731 26.611293 25 27.829667 25 29 L 25 38 L 21 38 L 21 21 z"></path>
          </svg>
        ),
      },
      // Add more social links as needed
      {
        name: 'GitHub',
        href: 'https://github.com/caseyspaulding',
        icon: ( props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement> ) => (
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24" { ...props }>
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        ),
      },
    ],
  };

  // Added skills list for the skills section
  const skills = [
    { name: '.NET Core & Framework', level: 90 },
    { name: 'C#', level: 95 },
    { name: 'Azure Cloud Services', level: 85 },
    { name: 'SQL Server', level: 80 },
    { name: 'Angular', level: 75 },
    { name: 'RESTful APIs', level: 85 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-black text-gray-800 dark:text-gray-200">
      {/* Add the schema data */ }
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={ { __html: JSON.stringify( schemaData ) } }
        />
      </Head>

      {/* Navigation Bar - Uncomment if you want to include it */ }
      {/* <NavBar1 /> */ }

      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center">
          {/* Profile Section */ }
          <div className="w-full max-w-6xl mx-auto">
            <div className="relative mb-20">
              {/* Banner Background */ }
              <div className="h-64 w-full bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl shadow-lg"></div>

              {/* Profile picture overlapping the banner */ }
              <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-16">
                <img
                  src="/images/caseyProfilePic.jpg"
                  alt="Casey Spaulding"
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Name and title */ }
            <div className="text-center mt-6 mb-10">
              <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-400 dark:to-indigo-500">
                Casey Spaulding
              </h1>
              <p className="text-xl text-gray-700 dark:text-gray-300 mb-4">
                Full-Stack .NET Developer & Cloud Solutions Engineer
              </p>

              {/* Social links */ }
              <div className="flex justify-center space-x-6 mb-6">
                { navigation.social.map( ( item ) => (
                  <a
                    key={ item.name }
                    href={ item.href }
                    className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors duration-300"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="sr-only">{ item.name }</span>
                    <item.icon aria-hidden="true" className="h-6 w-6" />
                  </a>
                ) ) }
              </div>
            </div>

            {/* Main content grid */ }
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Left column - About & Skills */ }
              <div className="md:col-span-1">
                {/* About Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      About Me
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      Hi, I'm <span className="font-semibold">Casey Spaulding</span>, an experienced full-stack developer, software engineer, and AI enthusiast with a deep love for technology and problem-solving.
                    </p>
                  </div>
                </div>

                {/* Skills Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                      Skills
                    </h2>
                    <div className="space-y-4">
                      { skills.map( ( skill ) => (
                        <div key={ skill.name }>
                          <div className="flex justify-between mb-1">
                            <span className="text-gray-700 dark:text-gray-300">{ skill.name }</span>
                            <span className="text-gray-500 dark:text-gray-400">{ skill.level }%</span>
                          </div>
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-blue-600 to-indigo-700 h-2 rounded-full"
                              style={ { width: `${ skill.level }%` } }
                            ></div>
                          </div>
                        </div>
                      ) ) }
                    </div>
                  </div>
                </div>

                {/* Connect Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Let's Connect
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      I'm always open to discussing opportunities in enterprise software development and AI-driven solutions.
                    </p>
                    <a
                      href="mailto:casey@caseyspaulding.com"
                      className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                    >
                      Get In Touch
                    </a>
                  </div>
                </div>
              </div>

              {/* Right column - Experience & Articles */ }
              <div className="md:col-span-2">
                {/* Professional Background Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Professional Background
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      With over <span className="font-semibold">three years of experience</span> in software development, I specialize in:
                    </p>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      { [
                        '.NET Framework (4.0+) & .NET Core for enterprise applications',
                        'C# Development for APIs, batch jobs, and services',
                        'Azure Cloud Solutions: Azure SQL, Azure DevOps, and Azure App Services',
                        'SQL Server and relational database optimization',
                        'Frontend development with Angular',
                        'Agile & Scrum Development methodologies'
                      ].map( ( item, index ) => (
                        <li key={ index } className="flex items-start">
                          <svg className="h-5 w-5 text-blue-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          { item }
                        </li>
                      ) ) }
                    </ul>
                  </div>
                </div>

                {/* Technical Expertise Card */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      Technical Expertise
                    </h2>

                    {/* Backend */ }
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                        </svg>
                        Backend Development
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        { [
                          'Building RESTful APIs with .NET Core and C#',
                          'Implementing security best practices: JWT authentication and OAuth2',
                          'Database optimization using SQL Server indexing and query performance tuning'
                        ].map( ( item, index ) => (
                          <li key={ index } className="flex items-start">
                            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            { item }
                          </li>
                        ) ) }
                      </ul>
                    </div>

                    {/* Frontend */ }
                    <div className="mb-6">
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Frontend & Mobile Development
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        { [
                          'Developing responsive web applications with Angular',
                          'Mobile development with .NET MAUI, Xamarin, and Kotlin'
                        ].map( ( item, index ) => (
                          <li key={ index } className="flex items-start">
                            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            { item }
                          </li>
                        ) ) }
                      </ul>
                    </div>

                    {/* Cloud & DevOps */ }
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                        </svg>
                        Cloud & DevOps
                      </h3>
                      <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                        { [
                          'Deploying applications on Azure App Service',
                          'CI/CD pipelines with Azure DevOps and GitHub Actions',
                          'Monitoring with Application Insights & Serilog'
                        ].map( ( item, index ) => (
                          <li key={ index } className="flex items-start">
                            <svg className="h-5 w-5 text-indigo-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                            { item }
                          </li>
                        ) ) }
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Featured Blog Posts */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                      </svg>
                      Featured Blog Posts
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      { [
                        {
                          title: 'Building Secure .NET APIs with JWT and Azure AD',
                          excerpt: 'Learn how to implement secure authentication in your .NET Core APIs using JWT tokens and Azure Active Directory.',
                          link: '#'
                        },
                        {
                          title: 'Automating Deployments with Azure DevOps and CI/CD',
                          excerpt: 'Step-by-step guide to setting up automated deployment pipelines using Azure DevOps for .NET applications.',
                          link: '#'
                        },
                        {
                          title: 'Optimizing SQL Server Performance for .NET Applications',
                          excerpt: 'Practical techniques to improve database performance in your .NET applications through indexing and query optimization.',
                          link: '#'
                        },
                        {
                          title: 'Developing Cross-Platform Mobile Apps with .NET MAUI',
                          excerpt: 'Explore the capabilities of .NET MAUI for building cross-platform mobile applications that run on iOS, Android, and Windows.',
                          link: '#'
                        }
                      ].map( ( post, index ) => (
                        <div key={ index } className="bg-gray-50 dark:bg-gray-700 rounded-lg p-5 transform transition duration-300 hover:shadow-md hover:-translate-y-1">
                          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 line-clamp-2">
                            { post.title }
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-3">
                            { post.excerpt }
                          </p>
                          <a
                            href={ post.link }
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium text-sm inline-flex items-center"
                          >
                            Read Article
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M9 5l7 7-7 7" />
                            </svg>
                          </a>
                        </div>
                      ) ) }
                    </div>
                  </div>
                </div>

                {/* Blog & Portfolio */ }
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden transform transition duration-500 hover:shadow-lg">
                  <div className="px-6 py-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={ 2 } d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                      Blog & Portfolio
                    </h2>
                    <p className="text-gray-700 dark:text-gray-300 mb-4">
                      On my blog, I share insights on:
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                      { [
                        'Building scalable .NET APIs',
                        'Optimizing SQL Server performance',
                        'Cloud-native development with Azure',
                        'Developing cross-platform mobile apps',
                        'Implementing DevOps automation in .NET projects'
                      ].map( ( topic, index ) => (
                        <div key={ index } className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                          <span className="text-gray-800 dark:text-gray-200 text-sm font-medium">{ topic }</span>
                        </div>
                      ) ) }
                    </div>
                    <a
                      href="/blog"
                      className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300 text-center"
                    >
                      Visit My Blog
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Uncomment if you want to include it */ }
      {/* <FooterFull /> */ }
    </div>
  );
};

export default CaseyAuthorPage;