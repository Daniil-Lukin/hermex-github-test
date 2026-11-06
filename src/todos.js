/** In-memory todo list. Each todo: { id, title, done, createdAt }. */
export class TodoStore {
  #todos = new Map();
  #nextId = 1;

  list({ done } = {}) {
    const todos = [...this.#todos.values()];
    return done === undefined ? todos : todos.filter((t) => t.done === done);
  }

  get(id) {
    return this.#todos.get(id);
  }

  add(title) {
    const clean = validateTitle(title);
    const todo = {
      id: this.#nextId++,
      title: clean,
      done: false,
      createdAt: new Date().toISOString(),
    };
    this.#todos.set(todo.id, todo);
    return todo;
  }

  update(id, changes) {
    const todo = this.#todos.get(id);
    if (!todo) return undefined;
    if (changes.title !== undefined) todo.title = validateTitle(changes.title);
    if (changes.done !== undefined) todo.done = Boolean(changes.done);
    return todo;
  }

  remove(id) {
    return this.#todos.delete(id);
  }
}

export function validateTitle(title) {
  if (typeof title !== "string") throw new Error("title must be a string");
  const clean = title.trim();
  if (!clean) throw new Error("title must not be empty");
  if (clean.length > 200) throw new Error("title must be at most 200 characters");
  return clean;
}
