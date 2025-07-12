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
            recently, i was helping a friend look for relevant patent data on
            google patents — and i quickly realized just how slow and repetitive
            the process really was. for every keyword search, we had to manually
            open each result and scan the abstract just to figure out if it was
            even worth saving. after hours of digging, we walked away with maybe
            two or three useful ones.
          </p>

          <p>
            i figured there had to be a better way. so i first tried using
            <strong> firecrawl </strong> to scrape patent pages — and while it
            technically worked, it wasn’t sustainable cost-wise, especially with
            the number of pages i needed to process.
          </p>

          <p>
            so i decided to take a closer look at how google patents actually
            loads its data. i opened devtools and noticed something interesting:
            instead of server-rendering results, google uses an <code>xhr/query</code>{' '}
            endpoint behind the scenes. that endpoint takes a structured query
            and returns paginated patent result metadata in a JSON-like format.
          </p>

          <p>
            for example, it builds a URL like:
            <pre className="bg-muted p-2 my-2 rounded text-sm overflow-x-auto">
              https://patents.google.com/xhr/query?url=q%3D%28CD47%29%26oq%3DCD47&amp;exp=&amp;peid=...
            </pre>
            each response includes around 10 items per page, and each item
            contains a unique patent ID (like <code>patent/US11723348B2/en</code>) that you
            can use to fetch the full detail page.
          </p>

          <p>
            here's the tricky part: clicking a result doesn’t return a clean
            JSON object — it serves a full HTML document. so to extract the
            abstract, i had to write a scraper that:
          </p>

          <ul className="list-disc ml-6">
            <li>
              hits the <code>/xhr/query</code> endpoint with a given search
              query
            </li>
            <li>
              parses the response to extract patent publication IDs and their
              respective detail URLs
            </li>
            <li>
              fetches the full HTML for each patent page and scrapes the
              <code>abstract</code>, <code>title</code>, and original URL using
              selector logic
            </li>
          </ul>

          <p>
            once i had a collection of titles and abstracts, i passed them into
            the <strong>OpenAI API</strong> with a carefully written custom
            prompt. the prompt helped evaluate whether the abstract was
            topically relevant, and gave each one a score or summary.
          </p>

          <p>
            of course, there was another obstacle: <strong>pagination</strong>.
            the query API only returns 10 results per page, and doesn’t give you
            a direct “next” link — but it does return the total count of results
            on the first page. i used that to calculate how many pages i needed,
            and wrote a loop that updated the <code>page</code> parameter to
            scrape all results.
          </p>

          <p>
            with dozens (sometimes hundreds) of abstracts collected, i started
            hitting token limits on OpenAI. so, i batched the abstracts into
            smaller chunks before sending them to the model.
          </p>

          <p>
            in the end, i wrapped the whole flow in a simple internal API that
            takes:
          </p>

          <ul className="list-disc ml-6">
            <li>a search query (e.g., "CD47")</li>
            <li>a custom relevance prompt</li>
          </ul>

          <p>
            and returns a cleaned list of patent entries — each with title,
            abstract, and URL — filtered by relevance. now, instead of manually
            reviewing 50 tabs, i get distilled insights in seconds.
          </p>

          <p>
            this project went from a frustrating search problem to an enjoyable
            automation exercise. it’s still internal right now, but i’m planning
            to open source it soon. if you’d like to try it or contribute, let
            me know!
          </p>
        </WritingContent>
      </WritingContainer>
    </>
  );
}
