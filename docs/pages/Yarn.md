---
lang: 'en'
slug: '/C9816C'
---

Yarn is another package manager for JavaScript that [Facebook](./../.././docs/pages/Facebook.md) developed as a more efficient and reliable [alternative](./../.././docs/pages/Alternative.md) to [npm](./../.././docs/pages/NPM.md). It was released in 2016, several years after [npm](./../.././docs/pages/NPM.md).

Here are a few features of Yarn:

1. **Speed and Efficiency**. Yarn is known for its speed and efficiency. It uses a deterministic installation algorithm that ensures the exact dependencies are installed in the same structure every time.
2. **Offline Mode**. Yarn has a feature where it can install packages from a local cache if they have been downloaded before, making it possible to work offline.
3. **Security**. When installing packages, Yarn first suggestions their checksums for integrity before actual code execution takes place.
4. **Workspaces**. Yarn has a native feature called "workspaces" to manage mono repo (mono repository) architectures, which can make it easier to manage projects with multiple sub-packages more accessible.
5. **Compatibility**. Yarn supports the [npm](./../.././docs/pages/NPM.md) registry, so you can access the many libraries that [npm](./../.././docs/pages/NPM.md) hosts.

## Comparison between [npm](./../.././docs/pages/NPM.md) and Yarn

- **Performance**. When Yarn was first released, one of its main advantages over [npm](./../.././docs/pages/NPM.md) was its performance. Yarn offered faster package installation. However, since [npm](./../.././docs/pages/NPM.md) version 5, the performance gap has significantly reduced.
- **Security**. Yarn has the edge over [npm](./../.././docs/pages/NPM.md) because it uses checksums for every package before they are installed, ensuring its integrity.
- **Offline mode**. Yarn can reuse previously downloaded, making it possible to install packages without an internet connection, which [npm](./../.././docs/pages/NPM.md) can't do.
- **Workspaces**. While both package managers support managing multiple packages within the same top-level root package, Yarn's workspace feature is more advanced and configurable.
- **Lockfile**. Both [npm](./../.././docs/pages/NPM.md) and Yarn generate a lock file (package-lock.json for [npm](./../.././docs/pages/NPM.md), yarn. lock for Yarn), which helps lock dependencies down to a specific version, making installations more reliable between different systems.
- **Documentation**. [npm](./../.././docs/pages/NPM.md) tends to have better and more comprehensive documentation than Yarn.
