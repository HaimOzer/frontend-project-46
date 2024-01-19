### Hexlet tests and linter status:

[![Actions Status](https://github.com/HaimOzer/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/HaimOzer/frontend-project-46/actions)
[![Node CI](https://github.com/HaimOzer/frontend-project-46/actions/workflows/main.yml/badge.svg)](https://github.com/HaimOzer/frontend-project-46/actions/workflows/main.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/6cccef303005f710685b/maintainability)](https://codeclimate.com/github/HaimOzer/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6cccef303005f710685b/test_coverage)](https://codeclimate.com/github/HaimOzer/frontend-project-46/test_coverage)

## Project Name: Difference Generator

> "File Harmony: Making Differences Visible with our CLI Tool"

<img src="src/img/gendiffLogo1.png" alt="project's logo" width=45% height=30%>

### Description

Difference Generator is a Command Line Interface (CLI) utility designed to generate and display differences between two files. This tool can be particularly useful for developers who want to compare configuration files, JSON files, or any other structured data.

Supported files and formats:

- Input formats: **.json**, **.yaml**, **.yml**;
- Output formats: **stylish**, **plain**, **JSON**.

## Installation

1. Clone the repository: `git clone git@github.com:HaimOzer/frontend-project-46.git`;
2. Install project dependencies: `make install`;
3. Install the package with the utility locally: `npm link`.

## Usage

After installation, you can learn how to use the utility using the **gendiff** command and the **-h** flag: `gendiff -h`.

```
$ gendiff -h
Usage: gendiff [options] <filepath1> <filepath2>

Compares two configuration files and shows a difference.

Options:
  -V, --version       output the version number
  -f --format <type>  output format
  -h, --help          display help for command
```

**_-f --format_**  
 Report format. Possible values:

- **_stylish_ (default option)**  
  Structured output. [example](#stylish-format-of-nested-objects)
- **_plain_**  
  Report in plain text. List includes only changed, added or deleted keys, unchanged keys are skipped. [example](#plain-format-of-nested-objects)
- **_json_**  
  Output in json format. [example](#json-format-of-nested-objects)

**_filepath1, filepath2_**  
 Path to files to compare. Both absolute and relative paths are acceptable.

Run the tests: `make test`.

Run the linter: `make lint`.

Put your files to **fixtures** directory and run - example `gendiff file1.json file2.yaml`

## Examples

### gendiff-info and compare flat objects

[![asciicast](https://asciinema.org/a/631850.svg)](https://asciinema.org/a/631850)

### stylish format of nested objects

[![asciicast](https://asciinema.org/a/631852.svg)](https://asciinema.org/a/631852)

### plain format of nested objects

[![asciicast](https://asciinema.org/a/631853.svg)](https://asciinema.org/a/631853)

### json format of nested objects

[![asciicast](https://asciinema.org/a/631854.svg)](https://asciinema.org/a/631854)

## License

This project is licensed under the ISC License.

Feel free to customize the content based on your project's specific details and requirements.
