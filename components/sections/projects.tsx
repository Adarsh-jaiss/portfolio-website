import Link from 'next/link';

const PROJECTS: {
  name: string;
  description: string;
  link: string;
  label?: string;
}[] = [
  {
    name: 'Norton AI',
    description:
      'An ai-powered chrome extension that automates linkedin outreach — from search to connection and follow-ups.',
    link: 'https://norton-ext.vercel.app/',
  },
  {
    name: 'Mailify',
    description: 'A Go library & a CLI tool that let\'s you validate unlimited emails (in bulk via excel sheets) + allows you to do MX lookups..',
    link: 'https://pkg.go.dev/github.com/adarsh-jaiss/mailify',
  },
  {
    name: 'Hire Assistant - Linkedin',
    description: 'A chrome extension built for HR\'s to filter out the right fit candidates from linkedin job applications, and download thier resumes in a single click.',
    label: 'Linkedin',
    link: 'https://github.com/Adarsh-jaiss/linkedin-applicant-automation',
  },
  {
    name: 'Shipper',
    description:
      'A developer tool designed for building container images without the need for writing Dockerfiles.',
    link: 'https://shipper-ui-gamma.vercel.app/',
  },
  {
    name: 'Krishi Bazar',
    description: "A marketplace app for buying and selling agricultural products.",
    link: 'https://play.google.com/store/apps/details?id=com.krishibazar.app',
  },

];

export default function Projects() {
  return (
    <section className="projects space-y-3">
      <h2 className="text-sm font-semibold">Projects</h2>
      <ul className="project-list space-y-2">
        {PROJECTS.map((project, index) => {
          return (
            <li className="project-item" key={index}>
              <div className="project-item-content space-y-1">
                <div className="flex items-center gap-2">
                  {project.label && (
                    <p className="text-sm font-semibold">{project.label}/</p>
                  )}
                  <Link href={project.link} className="font-semibold text-sm">
                    {project.name}
                  </Link>
                </div>
                <p className="text-sm">{project.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
