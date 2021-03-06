## Test results

### Unit tests

![Alt text](./docs/testresults.png?raw=true 'Jest test results')

### End2End tests

![Alt text](./docs/e2e-results.gif?raw=true 'End2End results')

## Which tools I chose to use

The first thing I do is remove Karma, install Jest and Cypress.

Why Jest? Jest is faster & well-known.

Why Cypress? Very visual, highly debuggable (runs in the app itself) And cool JQuery-like approach to testing.

With this challenge you don't need much, basic Angular or even vanilla JS would solve this problem. However, I feel like this challenge is about testing my (RxJS) skills and knowledge.

So I went ahead and overengineered it. I included:

- NPM commands (Angular CLI, E2E)
- RxJS
- material design & flex layout
- Cypress.io
- A couple unit tests (mostly validations)
- A couple E2E tests (mostly visuals & main functionality)

## Cool things to add

**Note:** These totally wouldn't be necessary but cool to showcase knowledge and skill. It's not intended to be overengineering it but to showcase skill.

If this one day becomes giphy v2 I would add:

- A CI/CD pipeline
  - Feature / fix branches would have live review (shareable url for product owner / other stakeholders)
- Monitoring, metrics & logging
- A great system architecture (Load balancer, reverse proxy, caching, sharding, CDN, read replicas etc)
- A git branching strategy like gitFlow or trunk based development
- Linting
- Me

Skill & knowledge wise you could also give me a hackerrank challenge ask about binary search, bit manipulation, sorting algorithms, prefix sum algorithm etc. I'd be happy to solve these.

## Regarding bad words / profanity filter

I could create a list of bad words and simply search for those in the query.

However, what if they purposefully make typos? I could implement levenshtein's algorithm to fix it.

However, what if they encrypted it like n00b? I could account for that in the levenshtein's algorithm and make the distance between 'o' and '0' zero

However, what if they didn't mean to type in a bad word? Like `go to hell`?
For this you really need to be context-aware, you could do it with AI to learn context, but even that is limited to the amount of context information you get.

So I took the simple approach and integrated npm `bad-words` package :)
