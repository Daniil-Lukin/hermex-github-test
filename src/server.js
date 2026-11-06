import { TodoStore } from "./todos.js";

const store = new TodoStore();

function send(res, status, body) {
  res.writeHead(status, { "content-type": "application/json" });
  res.end(body === undefined ? "" : JSON.stringify(body));
}

async function readJson(req) {
  let raw = "";
  for await (const chunk of req) raw += chunk;
  return raw ? JSON.parse(raw) : {};
}

export function handle(req, res) {
  const url = new URL(req.url, "http://localhost");
  const match = url.pathname.match(/^\/todos(?:\/(\d+))?$/);
  if (!match) return send(res, 404, { error: "not found" });
  const id = match[1] ? Number(match[1]) : undefined;

  return (async () => {
    try {
      if (req.method === "GET" && id === undefined) {
        const done = url.searchParams.get("done");
        return send(res, 200, store.list(done === null ? {} : { done: done === "true" }));
      }
      if (req.method === "GET") {
        const todo = store.get(id);
        return todo ? send(res, 200, todo) : send(res, 404, { error: "not found" });
      }
      if (req.method === "POST" && id === undefined) {
        const { title } = await readJson(req);
        return send(res, 201, store.add(title));
      }
      if (req.method === "PATCH" && id !== undefined) {
        const todo = store.update(id, await readJson(req));
        return todo ? send(res, 200, todo) : send(res, 404, { error: "not found" });
      }
      if (req.method === "DELETE" && id !== undefined) {
        return store.remove(id) ? send(res, 204) : send(res, 404, { error: "not found" });
      }
      return send(res, 405, { error: "method not allowed" });
    } catch (error) {
      return send(res, 400, { error: error.message });
    }
  })();
}
