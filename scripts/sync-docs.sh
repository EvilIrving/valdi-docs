#!/bin/bash
# Sync docs from Snapchat/Valdi repository

set -e

echo "Fetching latest from Snapchat/Valdi..."
git fetch valdi

echo "Syncing docs directory..."
# Remove and recreate content directory
rm -rf src/content
mkdir -p src/content

# Extract only the docs directory from Valdi
git read-tree --prefix=src/content -u valdi/main:docs

# Commit changes
git add -A
git commit -m "Sync docs from Snapchat/Valdi $(date '+%Y-%m-%d %H:%M')" || echo "No changes to commit"

echo "Done! Run 'git push' to publish."
