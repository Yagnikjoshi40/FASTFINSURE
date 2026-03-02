# FASTFINSURE Corporate Intelligence Platform

Production-ready SaaS platform for Indian corporate intelligence with ingestion, scraping, normalization, risk scoring, and report generation.

## Modules
- Next.js frontend with Tailwind UI (`/frontend`)
- Express microservice backend (`/backend`)
- BullMQ scraping worker
- PostgreSQL + Redis + MinIO
- Nginx reverse proxy

## Quick start
```bash
docker-compose up --build
```

## API Highlights
- `POST /api/company/ingest` -> fetch + normalize + compute ratios + risk
- `GET /api/company/:cin` -> dashboard payload
- `POST /api/company/:cin/report` -> downloadable PDF
- `GET /api/admin/scraping-logs` -> admin logs (JWT admin role)
- `PATCH /api/admin/risk/:companyId` -> override risk score

## Deployment guide (AWS/GCP)
1. Provision managed PostgreSQL + Redis.
2. Store backend `.env` in secrets manager.
3. Build and push Docker images (`backend`, `frontend`, `worker`).
4. Deploy with ECS/Fargate or GKE using same service topology.
5. Put managed LB in front of Nginx and attach TLS cert.
6. Configure GitHub Actions to push image tags on main.

## Security controls
- JWT auth + RBAC
- Express rate limiting
- BullMQ queued scraping
- Retry + delay in scraping worker
- Audit trail in `scraping_logs`

## Notes
- Scraping is designed for legally accessible pages only; integrate robots.txt checks per target domain policy.
- Stripe endpoint is scaffolded and should be wired with live products and webhooks before go-live.
