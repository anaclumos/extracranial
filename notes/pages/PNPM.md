---
lang: 'en'
slug: '/8EA98F'
---

PNPM is a package manager for [[Node.js]] that aims to improve aspects of [[npm]] and [[Yarn]]. It was designed to speed up package installation and reduce the disk space needed for projects while ensuring that the dependencies are correctly managed. The primary difference between pnpm and [[npm]] or [[Yarn]] is how it handles packages. PNPM uses a unique approach of storing a single copy of a module version in a global store on a disk and then uses hard links or symbolic links to reference those modules from your node_modules directory. This helps to save a significant amount of disk space when you are working on many projects or if the package size is large.

Key Features of PNPM:

1. **Efficient Disk Space Usage**. PNPM stores package files in a single location on the disk. When a package is installed, it creates a hard link from the global store, thus avoiding the need for duplicate files on the disk.
2. **Fast**. Due to its linking [[strategy]], installations is faster and less taxing on your system's resources.
3. **Strict Package Linking**. PNPM creates a node_modules folder using symlinks, and it's structured so that packages don't have access to packages not declared in their dependencies. This helps catch missing dependencies before going into production.

Comparison between [[npm]], [[Yarn]], and ppm:

- **Disk Usage**. PNPM shines in the area of disk space usage. PNPM's approach of a global store save signifit disk space, whereas [[npm]] and [[Yarn]] would duplicate the dependencies for each project.
- **Speed**. While [[Yarn]] initially led in speed, [[npm]] caught up with the release of [[npm]] version 5. PNPM also performs well in this area due to the reduced need for copying package files.
- **Installation Structure**. PNPM uses a non-flat node_modules, which catches missing dependencies, compared to [[npm]] and [[Yarn]], which create a flat node_modules structure by default.
- **Popularity**. PNPM, although growing, is less widespread and has fewer resources and minor community support.
