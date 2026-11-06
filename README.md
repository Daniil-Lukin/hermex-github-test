# hermex-github-test

A small todo API (Node 18+, no dependencies) for testing the Hermex GitHub
integration: connect, works, agent changes, Create PR / Update PR.

```sh
npm start      # http://localhost:3000/todos
npm test
```

## Endpoints

| Method | Path | Body |
|---|---|---|
| GET | `/todos?done=true\|false` | |
| GET | `/todos/:id` | |
| POST | `/todos` | `{ "title": "..." }` |
| PATCH | `/todos/:id` | `{ "title"?: "...", "done"?: true }` |
| DELETE | `/todos/:id` | |

## Things to ask the agent

- Add an optional `dueDate` to todos, with validation and tests.
- Add `GET /todos?search=...` to filter by title.
- Persist todos to a JSON file instead of memory.
- Add a `priority` field (low, normal, high) and sort by it.
