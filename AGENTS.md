<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Landing page placeholders (GTM ID, WhatsApp number, Zoho Bookings link) live in src/lib/sps.ts; lead webhook URL is the ZOHO_WEBHOOK_URL server env var. Why: one place to swap real values.
