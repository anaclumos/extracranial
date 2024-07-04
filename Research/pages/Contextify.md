---
lang: 'en'
slug: '/E4EDA8'
---

Useful when providing context to LLMs.

````py
import os
import fnmatch
import io

def get_gitignore_patterns(directory):
    gitignore_path = os.path.join(directory, '.gitignore')
    if os.path.exists(gitignore_path):
        with open(gitignore_path, 'r') as f:
            return [line.strip() for line in f if line.strip() and not line.startswith('#')]
    return []

def should_ignore(path, ignore_patterns):
    for pattern in ignore_patterns:
        if fnmatch.fnmatch(path, pattern) or fnmatch.fnmatch(os.path.basename(path), pattern):
            return True
    return False

def process_files(directory):
    directories_to_ignore = [
        '.git',
        '__pycache__',
        'node_modules',
        'venv',
        'env',
        'migrations',
        'staticfiles',
        'static',
        'media',
        'dist',
        'build',
        'coverage',
        'client'
    ]
    files_to_ignore = [
        __file__,
        'contextify.py',
        '.gitignore',
        '.gitattributes',
        '.gitmodules',
        'requirements.txt',
        'yarn.lock',
        'package-lock.json',
        'pnpm-lock.yaml',
    ]
    extensions_to_include = [
        'ts',
        'tsx',
    ]

    ignore_patterns = get_gitignore_patterns(directory)
    output = io.StringIO()

    for root, dirs, files in os.walk(directory, topdown=True):
        files[:] = [f for f in files if f not in files_to_ignore]
        files[:] = [f for f in files if any(f.endswith(ext) for ext in extensions_to_include)]
        dirs[:] = [d for d in dirs if not should_ignore(os.path.join(root, d), ignore_patterns)]
        dirs[:] = [d for d in dirs if not any(fnmatch.fnmatch(d, pattern) for pattern in directories_to_ignore)]

        for file in files:
            file_path = os.path.join(root, file)

            if should_ignore(file_path, ignore_patterns):
                continue

            # get full path, relative to the directory
            output.write("```" + os.path.relpath(file_path, directory) + "\n")

            try:
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    output.write(content)
            except Exception as e:
                output.write(f"Error reading file: {e}\n")

            output.write("```\n\n")

    return output.getvalue()

# Usage
directory_path = "."  # Current directory, change this to the desired starting directory
result = process_files(directory_path)

# Print the result
print(result)


try:
    import pyperclip
    pyperclip.copy(result)
    print("Output has been copied to clipboard.")
except ModuleNotFoundError:
    print("module pyperclip not found")

try:
    with open("output.md", "w") as f:
        f.write(result)
    print("Output has been saved to output.md.")
except Exception as e:
    print(f"Error saving output: {e}")
````
