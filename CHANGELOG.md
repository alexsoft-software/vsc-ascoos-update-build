# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2025-03-10

### Added

- Initial release of Ascoos Update Build Extension.
- Automatically updates `@build` and `@updated` tags in PHP files.
- Saves build information in `builds.json` located in the `.versions` folder.
- Creates backups of saved files in the `.repos` folder with updated build number and date.
- Allows setting an initial build number via configuration.
- Automatically creates and updates `.vscode/settings.json` to exclude the `.versions` and `.repos` folders from the file explorer.
- License: This project is licensed under the [AGL-F (ASCOOS General License - Free)](https://docs.ascoos.com/lics/ascoos/AGL-F.html).
