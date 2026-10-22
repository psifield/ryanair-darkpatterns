# Publication preflight - 23 October 2026

Asia/Singapore. The user authorized publishing the existing reviewed UI changes, evidence and root `AUDIT.md` to `psifield/ryanair-darkpatterns` after the final team-metadata edits. This is the preflight record included in the release; actual commit/push confirmation is reported in the chat after the remote ref is checked.

## Final requested edits

- `AUDIT.md` names four members: Aishan, Roy, Xianlong and Zinuo.
- Removed the private-rating date column and supplied one Pending score/driver row per member per finding: twelve rows total. Kept the private-before-discussion process and Pending agreed scores; no ratings or agreement were invented.
- Group number, original-publication page references, exact capture metadata and study preparation remain Pending. Existing-B chronology and the untested status of forecasts are unchanged.
- The audit is an ordinary root Markdown file included in the staged release, with no secret/ignore designation. GitHub reported that the configured repository was already public; its visibility/access settings were not changed.

## Review and checks

- Reviewed all tracked source changes against the initial commit and inventoried the untracked documents, screenshots, provenance and verification evidence. The evidence set is about 12 MiB for the complete candidate tree; no large binary/runtime payload is required.
- Source changes cover the inherited static audit markers, seven-group/eight-record navigation, annotation visibility and qualified explanatory copy. No additional app source was changed for the team-metadata request. Flight/fare data and the existing B match the initial Git commit after Git's normal CRLF/LF normalization.
- Fresh regression run: **4 tests passed, 0 failed**. TypeScript (`bun run lint`): **exit 0**. Production build: **exit 0**. Exact output: [checks.txt](checks.txt).
- Document checks confirm all four names, twelve distinct Pending rows, the removed date column, retained independent/agreed scoring and valid local audit/verification links. Application/current-document whitespace checks pass. The complete staged check flags two unchanged historical files: the source snapshot patch's eleven required single-space context lines and an older plan's extra blank line at EOF. Their hashes match the preserved baseline. Leave those originals intact; the staged check excludes exactly those two files and covers every other release file. No whitespace/security configuration is disabled or changed.
- Credential-pattern and forbidden-artifact scans cover the complete nonignored publication set. No credential findings, private keys, real environment files, databases, archives or lecture PDFs were found. `.env.example` contains inherited placeholders only. Dependencies, build output and local review caches remain ignored. No lecture PDFs or rendered lecture pages are published.
- The previously completed [30 browser checks](../chat-3-audit/browser-checks.json) and [annotation checks](../../2026-10-22/annotation-followup/verification.md) remain dated prior evidence; they are not represented as new browser runs during this documentation-only follow-up.
- Confirmed `origin` is `https://github.com/psifield/ryanair-darkpatterns.git`, default branch `main`, and write access is available. Before publication, remote `main` matched the local starting commit `5579bef45d918a5b1af75e91179736a582ea4f4f`. Use a normal push, preserving history; do not force-push.

## Release boundary and limits

Stage only the files in the reviewed hash manifest, recheck their hashes and the scoped staged-whitespace check described above, commit, push to `origin/main`, and verify remote/HEAD equality and a clean working tree. The root audit must be present in that exact remote tree and readable through GitHub's normal file view. Retain all inherited work; no reset, stash, clean or history rewrite is part of this release.

The inherited Vite warning about `__dirname` remains. This publication does not create missing study controls, collect participant data, make the existing B preregistered, or establish assignment compliance. A Git push alone is not evidence that Vercel has finished deploying; report deployment status only from a matching-commit check.
