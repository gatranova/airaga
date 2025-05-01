<h1 align="center">🤝 Contributing</h1>

Thanks for your interest in contributing! Airaga is an open-source framework, and we welcome contributions from everyone.

## 📌 Before You Get Started

Make sure you have:

- Read the project documentation in `README.md`
- Install dependencies with `bun install`
- Run `bun run build` to build the project
- Run `bun run test` to make sure everything remains stable

## 🧭 How to Contribute

### 1. Fork the Repository

Click the **Fork** button at the top right of this repo, then clone your fork locally:

```bash
git clone https://github.com/your-username/airaga.git
cd airaga
```

### 2. Create a Feature Branch

Use a descriptive name for your feature or fix:

```bash
git checkout -b feature/scene-parser
```

### 3. Install Dependencies

Make sure you have all dev dependencies installed:

```bash
bun install
```

### 4. Make Your Changes

Make your changes, and commit them:

```bash
git add .
git commit -m "feat: Add scene parser utility."
```

### 5. Run Tests

Use `vitest` to ensure your changes don’t break anything:

```bash
bun run test
```

### 6. Push Your Branch

Push your branch to your fork:

```bash
git push origin feature/scene-parser
```

### 7. Create a Pull Request

Go to https://github.com/airaga/airaga/pulls and create a new pull request.

## 📋 Tips

- Always run npm run lint and npm run test before push.
- Use English for variable naming, commits, and PR descriptions.
- For big features, open an issue first for discussion.
- Stick to the codebase style (Prettier + ESLint).

---

That's it! Your changes will be reviewed and merged into the main branch as soon as possible. Thanks for your contribution!