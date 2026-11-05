# Solomon People Solutions: corporate training landing page

Landing page for Solomon People Solutions Google Ads campaigns (corporate training, Dubai).

## Run locally

```sh
npm install
npm run dev
```

## Settings to fill in

Edit `src/lib/sps.ts`:

- `GTM_ID`: Google Tag Manager container ID
- `WHATSAPP_NUMBER`: SPS WhatsApp mobile number
- `ZOHO_BOOKINGS_URL`: Zoho Bookings link for the discovery call page

Set the `ZOHO_WEBHOOK_URL` environment variable in Vercel so form submissions reach Zoho CRM.

Client logos and case studies are hidden until real ones are added: set `SHOW_PROOF` to `true` in `src/routes/index.tsx`.
