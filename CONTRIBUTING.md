# Contributing to Wildguard

Wildguard supports wildlife crime research and conservation workflows. Changes should improve the clarity, reliability, or usefulness of the platform for its users.

## Project team

- Siddhanth K Jain
- Kamma Rohan
- Adithya P
- Dinesh Kulkarni
- Rajath V Shanbhogue

## Development setup

Follow the [quick-start instructions](README.md#quick-start) to install dependencies, configure your local environment, and build the dashboard.

## Proposing a change

1. Describe the problem and expected behavior in an issue. Avoid including sensitive investigation details.
2. Create a focused branch from `main`.
3. Implement the change and update relevant documentation.
4. Run the checks below that apply to your changes.
5. Open a pull request explaining the user-facing result, verification performed, and any limitations.

## Checks

```bash
python -m pytest tests/ -q
npm run build --prefix frontend
npm run build:embed --prefix frontend
```

Documentation-only updates should be checked for accurate statements, working references, and readable formatting.

## Engineering guidelines

- Keep API behavior and data contracts explicit.
- Use React function components and accessible controls.
- Preserve responsive layouts and reduced-motion support.
- Distinguish source evidence from automated analysis and forecasts.
- Add regression coverage when fixing behavior that could recur.
- Keep credentials, local databases, backups, and private reports out of commits.

## Commit messages

Use a short, descriptive subject with a prefix such as `feat:`, `fix:`, `docs:`, or `chore:`. Explain substantial tradeoffs in the commit body or pull request.
