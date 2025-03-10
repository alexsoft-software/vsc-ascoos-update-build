# Ascoos Update Build Extension for VSCode

![Ascoos Logo](https://dl.ascoos.com/images/ascoos.png)

Automatically updates build number and date on save.

![Screenshot](https://dl.ascoos.com/vscode/images/vsc-ascoos-update-build-01.png)

## Features

- Automatically updates `@build` and `@updated` tags in your PHP files.
- Saves the build information in `builds.json` located in the `.versions` folder.
- Creates a backup of the saved file in the `.repos` folder with the updated build number and date.
- Allows setting an initial build number via configuration.
- Automatically creates and updates `.vscode/settings.json` to exclude the `.versions` and `.repos` folders from the file explorer.
- **Toggle auto update on save using the keybinding `Ctrl+Shift+F9`.**

## Installation

1. Download the `.vsix` file from the [VSIX Package](https://dl.ascoos.com/vscode/vsc-ascoos-update-build.vsix).
2. Open Visual Studio Code.
3. Go to the Extensions view (`Ctrl+Shift+X`).
4. Click on the three dots (...) in the top right corner and select `Install from VSIX`.
5. Select the downloaded `.vsix` file.

## Usage

- The extension automatically updates the build number and date whenever you save a PHP file.
- You can view the build history in the `builds.json` file located in the `.versions` folder.
- Backups of the saved files are created in the `.repos` folder with the updated build number and date.
- Set the initial build number via the configuration settings in the `settings.json` file located in the `.vscode` folder.
- **Use the keybinding `Ctrl+Shift+F9` to toggle the auto update feature on or off.**

## Configuration

You can set the initial build number by adding the following configuration to your `settings.json` file:

```json
{
    "ascoosUpdateBuild.startingBuild": 11200
}
```

## License

This project is licensed under the AGL-F (ASCOOS General License - Free). See the [LICENSE](https://docs.ascoos.com/lics/ascoos/AGL-F.html) file for details.

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. All contributions are welcome!

## Contact

For any questions or issues, please visit [Alexsoft Software Issues](https://issues.ascoos.com).
