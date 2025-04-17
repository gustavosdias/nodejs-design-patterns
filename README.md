# Nodejs Design Patterns with Graph Traversal Algorithm

A backend system using **TypeScript**, **Express**, and design patterns to manage user roles and permissions. Includes Swagger API docs, testing with Vitest. A CRUD implementation for Topics and a graph traversal algorithm are also featured.

---

## 🔧 Patterns Used

### Strategy Pattern

Encapsulates role behavior in separate classes:

| Role    | `canRead()` | `canWrite()` | `canDelete()` |
|---------|-------------|--------------|----------------|
| Admin   | ✅           | ✅            | ✅              |
| Editor  | ✅           | ✅            | ❌              |
| Viewer  | ✅           | ❌            | ❌              |

```ts
const user = new User('Alice', new EditorPermissions());
user.canDelete(); // false
```

### Factory Pattern

Centralizes topic creation between ParentTopic and ChildTopic

---

## 🗂️ CRUD Implementation for Topics

A basic CRUD system is implemented for Topics, allowing users to **create**, **read**, **update**, and **delete** topics. The data is stored in memory for simplicity and is manipulated via the following endpoints:

- `GET /topics/:id` — Get a topic by id (The response should include a tree structure representing the hierarchy of topics)
- `POST /topics` — Create a new topic
- `PUT /topics/:id` — Update an existing topic
- `DELETE /topics/:id` — Delete a topic

---

## 🔍 Graph Traversal Algorithm

The algorithm for graph traversal can be executed within `topic.spec.ts`. This feature enables traversing topic relationships, providing insights into hierarchical structures or dependencies between topics.

---

## 📘 API Docs

Swagger UI available at:

```
http://localhost:3000/api-docs
```

Generated via `swagger-jsdoc` and served with `swagger-ui-express`.

---

## 🧪 Tests

Run with:

```bash
npm run test
```

Covers:

- Role behavior
- Runtime strategy switching
- RoleFactory logic
- CRUD operations for Topics
- Graph traversal algorithm in `topic.spec.ts`

---

## ▶️ Run Locally

```bash
npm install
npm run dev
```

---

## 🛠️ Author

Gustavo dos Santos Dias  
[projectmark](https://github.com/gustavosdias/projectmark)
