
# Project Documentation

## Project Overview

This is a VSCode documentation preview extension, focused on providing developers with a convenient document browsing experience.

## Features

* 📁 Automatically parse Markdown documents in projects
* 📑 Generate clear document directory structure
* 🔍 Quickly locate and browse document content
* 🎯 Support multiple document format recognition

## Technical Architecture

* **Development Language**: TypeScript
* **Runtime Environment**: VSCode Extension
* **Core Functionality**: Document parsing and directory generation

## Why Markdown Preview is Not Implemented?

### Technical Considerations

1. **Complexity Issues**: The Markdown ecosystem contains numerous special tags and extended syntax (such as GitHub Flavored Markdown, various plugin syntaxes, etc.), and full compatibility would require significant development effort
2. **Focus on Core Value**: The core value of this project lies in providing efficient document directory navigation, not content rendering

### Design Philosophy

* **Do One Thing Well**: Focus on parsing and displaying document directories, making this functionality perfect
* **Coexist with Ecosystem**: Fully leverage excellent tools already available in the VSCode ecosystem, rather than trying to replace them
* **Rapid Iteration**: Focusing on core functionality allows the project to iterate and optimize more quickly

### Recommended Solutions

If you need Markdown preview functionality, we recommend:

* Use VSCode's built-in Markdown preview (Shortcut: `Ctrl/Cmd + Shift + V`)
* Install professional Markdown preview plugins, such as Markdown Preview Enhanced

## Contributing

Contributions are welcome! If you're interested in Markdown parsing, feel free to submit PRs to enhance the preview functionality.
