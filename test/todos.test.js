import assert from "node:assert/strict";
import { test } from "node:test";
import { TodoStore, validateTitle } from "../src/todos.js";

test("adds and lists todos", () => {
  const store = new TodoStore();
  const first = store.add("  Write tests  ");
  store.add("Ship it");
  assert.equal(first.title, "Write tests");
  assert.equal(store.list().length, 2);
});

test("filters by done", () => {
  const store = new TodoStore();
  const todo = store.add("Review PR");
  store.add("Merge PR");
  store.update(todo.id, { done: true });
  assert.deepEqual(store.list({ done: true }).map((t) => t.title), ["Review PR"]);
  assert.equal(store.list({ done: false }).length, 1);
});

test("removes todos", () => {
  const store = new TodoStore();
  const todo = store.add("Temporary");
  assert.equal(store.remove(todo.id), true);
  assert.equal(store.get(todo.id), undefined);
});

test("rejects empty or long titles", () => {
  assert.throws(() => validateTitle("   "), /empty/);
  assert.throws(() => validateTitle("x".repeat(201)), /200/);
  assert.throws(() => validateTitle(42), /string/);
});
