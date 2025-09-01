# Buildnote Test Reporter GitHub Action

This action collects tests results in your build and reports them as step summary.

[![GitHub Marketplace](https://img.shields.io/badge/Marketplace-Buildnote%20Test%20Reporter%20Action-blue.svg?colorA=24292e&colorB=0366d6&style=flat&longCache=true&logo=github)](https://github.com/marketplace/actions/buildnote-test-reporter-action)
[![Release Buildnote Test Reporter Action](https://github.com/buildnote/action/actions/workflows/release.yml/badge.svg)](https://github.com/buildnote/test-reporter/actions/workflows/release.yml)

## What does this action do?

The Buildnote Test Reporter GitHub Action provides a wrapper around the [Buildnote CLI](https://buildnote.io/docs/cli/), allowing you
to:

- Collect test results in various formats
- Report them to step summary

## Usage

### Example

```yaml
name: Example workflow using Buildnote
on:
  push:
    branches:
      - main
jobs:
  example:
    name: Example
    runs-on: ubuntu-latest
    steps:
      # Your other steps here

      - name: Collect tests 
        uses: buildnote/test-reporter@main        
        if: always()
```

> **Note**: The `if: always()` ensures Buildnote can collect data even if previous steps fail.

## Configuration

### Inputs

| Input         | Description                               | Required | Default |
|---------------|-------------------------------------------|----------|---------|
| `version`     | Version of Buildnote CLI to use           | No       | latest  |
| `args`        | Additional command arguments              | No       |         |
| `verbose`     | Runs Buildnote CLI in verbose mode        | No       | false   |

## License

[Apache License 2.0](./LICENSE)