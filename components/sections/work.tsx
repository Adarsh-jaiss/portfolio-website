'use client';
import { IconBriefcase2 } from '@tabler/icons-react';
import Link from 'next/link';
import { useState } from 'react';

const WORK_EXPERIENCE: {
  name: string;
  description: string;
  link: string;
  status: string;
}[] = [
  {
    name: 'Zocket AI',
    description: 'Software Engineering Intern',
    link: 'https://zocket.ai',
    status: 'present',
  },
  {
    name: 'CardLift (YC S24)',
    description: 'Software Engineering Intern',
    link: 'https://withcardlift.com/',
    status: '2024, 2 months',
  },
  {
    name: 'The Saas Company',
    description: 'Software Engineering Intern',
    link: 'https://thesaascompany.com/',
    status: '2024, 3 months',
  },
  {
    name: 'Shipwright-io(CNCF Sandbox Project)',
    description: 'Open Source Contributor (org member)',
    link: 'https://shipwright.io/',
    status: '2024, 9 months',
  },
];

export default function Work() {
  return (
    <section className="work space-y-3">
      <h2 className="text-sm font-semibold">Work</h2>
      <ul className="work-list space-y-2">
        {WORK_EXPERIENCE.map((experience, index) => {
          return <Experience {...experience} key={index} />;
        })}
      </ul>
    </section>
  );
}

function Experience(experience: {
  name: string;
  description: string;
  link: string;
  status: string;
}) {
  const [showStatus, setShowStatus] = useState<boolean>(false);
  return (
    <li
      className="work-item"
      onMouseEnter={() => setShowStatus(true)}
      onMouseLeave={() => setShowStatus(false)}>
      <div className="work-item-content space-y-1">
        <div className="flex items-center gap-2">
          <Link href={experience.link} className="font-semibold text-sm">
            {experience.name}
          </Link>
          {showStatus && (
            <p className="text-xs text-gray-500">- {experience.status}</p>
          )}
        </div>
        <p className="text-sm flex items-center gap-1">
          <IconBriefcase2 size={14} strokeWidth={2} />
          <span>{experience.description}</span>
        </p>
      </div>
    </li>
  );
}
