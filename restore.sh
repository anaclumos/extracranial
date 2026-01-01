#!/bin/bash
#
# Git Empty File Recovery Tool
#
# This script helps recover Git-tracked files that have been accidentally
# overwritten with empty (zero-byte) content. It finds the last non-empty
# version of each file in the Git history and can restore them.
#
# It addresses the specific scenario where:
# - Files still exist in the repository but have zero bytes
# - You want to restore them to their state right before they were emptied
# - You don't want to restore files that were purposefully deleted
#
# It offers two modes:
# 1. Diagnostic mode (default): Find empty files and show restore commands
# 2. Restore mode: Automatically restore all empty files to their last non-empty version
#
# Usage:
#   ./recover-empty-files.sh [--auto-restore]
#
# Options:
#   --auto-restore: Automatically restore all empty files without prompting

# Check if auto-restore flag is provided
AUTO_RESTORE=0
if [ "$1" == "--auto-restore" ]; then
  AUTO_RESTORE=1
  echo "Auto-restore mode enabled. All empty files will be restored."
  echo
fi

echo "Finding zero-byte files tracked by Git and their last non-empty versions..."
echo

# Create a temporary directory to store restore commands
RESTORE_DIR=$(mktemp -d)
RESTORE_SCRIPT="$RESTORE_DIR/restore_commands.sh"
RESTORE_LOG="$RESTORE_DIR/restore_log.txt"

echo "#!/bin/bash" > "$RESTORE_SCRIPT"
echo "# Commands to restore zero-byte files" >> "$RESTORE_SCRIPT"
echo "echo 'Starting file restoration...'" >> "$RESTORE_SCRIPT"
echo "" >> "$RESTORE_SCRIPT"

# Create a file to store the list of empty files
EMPTY_FILES=$(mktemp)

# Find all zero-byte files tracked by git
git ls-files | while read -r file; do
  if [ -f "$file" ] && [ ! -s "$file" ]; then
    echo "$file" >> "$EMPTY_FILES"
  fi
done

# Count files found
FILES_FOUND=$(wc -l < "$EMPTY_FILES")
FILES_RECOVERABLE=0
FILES_RESTORED=0

if [ "$FILES_FOUND" -eq 0 ]; then
  echo "No zero-byte files tracked by Git were found."
  rm -f "$EMPTY_FILES"
  exit 0
fi

# Process each empty file
while read -r file; do
  echo "File: $file"
  
  # Find the last commit where this file had content
  last_non_empty_commit=""
  while read -r commit; do
    content_size=$(git show "$commit:$file" 2>/dev/null | wc -c)
    if [ "$content_size" -gt 0 ]; then
      last_non_empty_commit="$commit"
      break
    fi
  done < <(git log --pretty=format:"%H" -- "$file")
  
  if [ -n "$last_non_empty_commit" ]; then
    FILES_RECOVERABLE=$((FILES_RECOVERABLE + 1))
    
    commit_date=$(git show -s --format="%ci" "$last_non_empty_commit")
    commit_msg=$(git show -s --format="%s" "$last_non_empty_commit")
    echo "  Last non-empty version: $commit_date"
    echo "  Commit: $last_non_empty_commit"
    echo "  Message: $commit_msg"
    
    # Add restore command to the script
    echo "echo 'Restoring $file from commit $last_non_empty_commit...'" >> "$RESTORE_SCRIPT"
    echo "cp \"$file\" \"${file}.empty.bak\" 2>/dev/null" >> "$RESTORE_SCRIPT"
    echo "git show $last_non_empty_commit:\"$file\" > \"$file\"" >> "$RESTORE_SCRIPT"
    echo "echo '  ✓ Done'" >> "$RESTORE_SCRIPT"
    echo "" >> "$RESTORE_SCRIPT"
    
    # Also log the file for reference
    echo "$file" >> "$RESTORE_LOG"
    
    # If auto-restore is enabled, restore the file immediately
    if [ "$AUTO_RESTORE" -eq 1 ]; then
      echo "  Automatically restoring file..."
      cp "$file" "${file}.empty.bak" 2>/dev/null
      git show "$last_non_empty_commit:$file" > "$file"
      echo "  ✓ File restored (backup saved as ${file}.empty.bak)"
      FILES_RESTORED=$((FILES_RESTORED + 1))
    else
      echo "  To restore this file, run:"
      echo "  git show $last_non_empty_commit:\"$file\" > \"$file\""
    fi
  else
    echo "  No non-empty version found in git history"
  fi
  echo
done < "$EMPTY_FILES"

echo "echo 'Restoration complete!'" >> "$RESTORE_SCRIPT"
chmod +x "$RESTORE_SCRIPT"

echo "Summary:"
echo "  - Found $FILES_FOUND zero-byte files tracked by Git"
echo "  - $FILES_RECOVERABLE files have recoverable non-empty versions"

if [ "$AUTO_RESTORE" -eq 1 ]; then
  echo "  - $FILES_RESTORED files were automatically restored"
else
  if [ "$FILES_RECOVERABLE" -gt 0 ]; then
    echo
    echo "To restore all recoverable files at once, run the generated script:"
    echo "$RESTORE_SCRIPT"
    echo
    echo "The restore script has been created with commands to restore all files."
    echo "Review the script contents before running if you want to restore selectively."
  fi
fi

echo
echo "Temporary files created:"
echo "  - Restore script: $RESTORE_SCRIPT"
echo "  - List of files: $RESTORE_LOG"

# Clean up
rm -f "$EMPTY_FILES"
