'use client';
import { GlobalContext } from '@/context/global-context';
import Link from 'next/link';
import React, { useContext } from 'react';

const SOCIALS: { name: string; link: string }[] = [
  { name: 'GitHub', link: 'https://github.com/adarsh-jaiss' },
  { name: 'X', link: 'https://x.com/twtadarsh' },
  { name: 'LinkedIn', link: 'https://linkedin.com/in/adarsh-jaiss' },
  { name: 'Substack', link: 'https://adarshjaiss.substack.com/' },
  { name: 'Mail', link: 'mailto:its.adarshjaiss@gmail.com' },
  { name: 'Resume', link: 'https://drive.google.com/file/d/1enxvr2xEOCOcnoBhaPuX9OWKB2LQMbGT/view?usp=sharing' },
  { name: 'Discussions', link: '/discussions' },
];

export default function Header() {
  return (
    <header className="page-header space-y-1">
      <h1 className="text-xl font-medium tracking-tight">Adarsh Jaiswal</h1>
      <p className="text-sm text-gray-500 tracking-tight">Software Engineer</p>
      <SocialsWrapper />
      <div className="!mt-8 text-sm">
        Currently working as a Software engineering intern at{' '}
        <Link href="https://zocket.ai" target="_blank">
          Zocket AI
        </Link>
      
        , Building AI Agents for automating marketing and campagin creation.{' '}
        Also, worked with{' '}
        <Link href="https://withcardlift.com/" target="_blank">
         CardLift (YC S24)
        </Link>{' '}
        as an software engineering intern. Worked on creating automation recipes for 50+ platforms for automating the credit card migration in a single click.
      </div>
    </header>
  );
}

function SocialsWrapper() {
  const { discussionCount } = useContext(GlobalContext);
  return (
    <div className="flex gap-2 items-center my-2">
      {SOCIALS.map((social, index) => {
        return (
          <React.Fragment key={index}>
            <Link
              href={social.link}
              target={social.name === 'Discussions' ? '_self' : '_blank'}
              className="text-sm">
              {social.name}
            </Link>
            {!!discussionCount &&
              social.name.toLowerCase() === 'discussions' && (
                <p className="discussionCount-badge text-xs font-medium px-1.5 py-0.5 rounded bg-gray-200">
                  {discussionCount}
                </p>
              )}
            {index !== SOCIALS.length - 1 && (
              <span className="font-medium text-sm text-gray-300">/</span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}
