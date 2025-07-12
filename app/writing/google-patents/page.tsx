'use client';
import { WritingContainer } from '../_components/writing-container';
import { WritingContent } from '../_components/writing-content';
import {
  WritingDetails,
  WritingHeader,
  WritingHeadline,
} from '../_components/writing-header';

export default function PostGooglePatents() {
  return (
    <>
      <WritingContainer id="post__google-patents">
        <WritingHeader>
          <WritingHeadline>
            scraping google patents — the smart(er) way
          </WritingHeadline>
          <WritingDetails>friday, 12th july, 2025</WritingDetails>
        </WritingHeader>
        <WritingContent>
          <p>
            recently, i was helping a friend search for technical patterns on
            google patents — and wow, was it tedious. every search gave us a
            wall of results, and each abstract had to be opened manually to even
            check if it was remotely relevant. after hours of scrolling and
            clicking, we had maybe 2 or 3 useful patents. not great.
          </p>
          <p>
            so i started looking into ways to automate the process. my first
            attempt was with firecrawl — decent results, but it turned out to be
            too expensive for the volume i needed.
          </p>
          <p>
            that’s when i got curious about how google patents actually fetches
            its data. after a bit of network inspection, i realized: when you
            search, the results are fetched via a `xhr/query` endpoint. and when
            you click on a result, the abstract is buried in raw html, not in
            any clean API format.
          </p>
          <p>
            so, i wrote a scraper that:
            <ul className="list-disc ml-6">
              <li>hits the query endpoint with custom search params</li>
              <li>uses the publication id to fetch each result’s HTML</li>
              <li>extracts just the title, abstract, and URL</li>
            </ul>
            the result? clean data.
          </p>
          <p>
            i then passed these abstracts into openai’s api with a focused
            prompt that analyzed the relevance. this made the search smarter and
            faster — but of course, there was pagination to deal with.
          </p>
          <p>
            the query api only returns 10 results per page, so i wrote a loop
            that auto-increments the page number and pulls abstracts until all
            results are collected. then, to avoid token limits, i chunked the
            abstracts into smaller batches before sending them to the model.
          </p>
          <p>
            finally, i wrapped all of it into a simple internal API: you give it
            a query and a custom prompt, it returns the top recommended patents
            — filtered and summarized. it now takes seconds to get relevant
            insights that used to take hours.
          </p>
          <p>
            sometimes, all it takes is a bit of digging to turn a painful
            workflow into something smooth and powerful. i’ll probably open
            source this soon — let me know if you’d be interested!
          </p>
        </WritingContent>
      </WritingContainer>
    </>
  );
}
