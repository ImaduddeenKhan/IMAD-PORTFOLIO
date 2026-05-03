# Contributing

Thanks for improving this portfolio repo.

## Local setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Use Supabase for both the database and storage. Run the SQL in `supabase/schema.sql` before testing form saves or admin persistence.

## Expectations

1. Keep it JavaScript-first.
2. Keep the admin editor fully functional.
3. Add tests when changing validation or core helpers.
4. Keep the dependency footprint lean.
5. Update `README.md` when setup or behavior changes.

## License

By contributing, you agree that your contributions are released under the MIT License.
