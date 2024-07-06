import os
import re

def check_markdown_file(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # Find all occurrences of $ followed by % without a newline
        problematic_patterns = re.findall(r'\$[^$\n]*%[^\n]*$', content, re.MULTILINE)
        
        if problematic_patterns and ('$' in content and '%' in content):
            return file_path, problematic_patterns
        
    except Exception as e:
        print(f"Error reading file {file_path}: {str(e)}")
    
    return None, None

def search_directory(directory):
    problematic_files = []
    ignored_dirs = {'node_modules', 'assets'}
    allowed_extensions = {'.md', '.mdx'}

    for root, dirs, files in os.walk(directory):
        # Remove ignored directories from dirs to prevent os.walk from traversing them
        dirs[:] = [d for d in dirs if d not in ignored_dirs]

        for file in files:
            if os.path.splitext(file)[1].lower() in allowed_extensions:
                file_path = os.path.join(root, file)
                result, patterns = check_markdown_file(file_path)
                if result:
                    problematic_files.append((result, patterns))

    return problematic_files

def main():
    target_directory = input("Enter the target directory path: ")
    
    if not os.path.isdir(target_directory):
        print("The provided path is not a valid directory.")
        return

    problematic_files = search_directory(target_directory)

    if problematic_files:
        print("\nMarkdown files with potential unterminated comment at end of math mode:")
        for file_path, patterns in problematic_files:
            print(f"\nFile: {file_path}")
            for pattern in patterns:
                print(f"  {pattern}")
    else:
        print("No markdown files with potential issues found.")

if __name__ == "__main__":
    main()
