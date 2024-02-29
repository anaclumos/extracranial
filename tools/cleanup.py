import os

# Define the paths
assets_path = '../Research/assets'
research_path = '../Research'

# Get a list of all files in the assets folder
assets_files = [f for f in os.listdir(assets_path) if os.path.isfile(os.path.join(assets_path, f))]
# Initialize a dictionary to keep track of file mentions
file_mentions = {file: False for file in assets_files}

# Look for mentions of these files in all text files within the Research folder
for root, dirs, files in os.walk(research_path):
    for file in files:
        if file.endswith('.md'):
            file_path = os.path.join(root, file)
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
                for asset_file in assets_files:
                    if asset_file in content:
                        file_mentions[asset_file] = True

# List all files that are never mentioned once in the text files
never_mentioned_files = [file for file, mentioned in file_mentions.items() if not mentioned]

print("Files never mentioned:")
for file in never_mentioned_files:
    print(file)


delete_files = input("Do you want to delete these files? (y/n): ")


if delete_files.lower() != 'y':
    for file in never_mentioned_files:
        os.remove(os.path.join(assets_path, file))
        print(f"Deleted: {file}")
