# Azure App Service deployment

Use Linux App Service, Python 3.11, one B2 instance, and `deployment/azure/startup.sh` as the startup command. Confirm regional B2 pricing before creating a plan; the approved hosting budget is USD 30/month.

Build the browser application with `npm ci --prefix frontend` and `npm run build:embed --prefix frontend`. The embedded build is served by FastAPI, so no second frontend host is required.

Required App Service settings:

- `SCM_DO_BUILD_DURING_DEPLOYMENT=true`
- `ADMIN_USERNAME` and a strong `ADMIN_PASSWORD` or `ADMIN_PASSWORD_HASH`
- `JWT_SECRET`: a randomly generated secret
- `DATABASE_URL=sqlite:////home/wildguard/data/news.db`
- `LOG_DIR=/home/wildguard/logs`
- `BACKUPS_DIR=/home/wildguard/backups`
- `EXCEL_PATH=/home/wildguard/data/wildlife-news.xlsx`
- `FRONTEND_ORIGIN=https://www.wildlifenews.me`

Keep secrets in Azure application settings, never in Git. Persistent data belongs under `/home`, outside the deployment directory. Enable Always On, WebSockets, and HTTPS Only. Run one worker and one instance while using SQLite and the in-process scheduler. Local transformer models may require more memory than B2; configure a supported external inference service when needed.

For the custom domain, add the Azure-provided `asuid.www` TXT verification record and point the `www` CNAME to the app's default Azure hostname. Add the hostname binding, issue a free App Service managed certificate, and bind it using SNI. Verify HTTPS before announcing the URL. Do not alter mail or unrelated DNS records.

## Release package

After building the frontend, run `python3 deployment/azure/package.py /tmp/wildguard-deployment.zip`. The package contains tracked backend source and the embedded browser build, without `.env`, local databases, or private reports. Publish with Azure CLI ZIP deployment and `SCM_DO_BUILD_DURING_DEPLOYMENT=true`.

The production target uses India South Central. The Microsoft Retail Prices API returned Linux B2 at USD 0.036/hour (USD 26.28 for 730 hours) on 21 September 2026. Taxes and optional services are additional; verify pricing before provisioning.
