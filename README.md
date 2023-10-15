[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT HEADER -->
<br />
<p align="center">
  <!-- https://github.com/stefanjudis/github-light-dark-image-example -->
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://raw.github.com/Good-Games-Munich/assets/main/logos/GGM_logo_white.png">
    <img alt="Logo" src="https://raw.github.com/Good-Games-Munich/assets/main/logos/GGM_logo_black.png" height="150">
  </picture>

  <h3 align="center">🤖 Water-Heater</h3>

  <p align="center">
    ·
    <a href="https://github.com/Good-Games-Munich/water-heater/issues">Report Bug</a>
    ·
    <a href="https://github.com/Good-Games-Munich/water-heater/issues">Request Feature</a>
    ·
  </p>
</p>

<!-- ABOUT THE PROJECT -->

## About The Project

A api and discord bot for Good Games Munich.

## Non technical documentation

See [docs](docs/).

## Setup

### Production

1. Follow [Discord app getting started](https://discord.com/developers/docs/getting-started) and retrieve a bot token
2. Follow [Creating a release](https://github.com/Good-Games-Munich/.github/wiki/workflows#creating-a-release).

### Development

1. Follow [Discord app getting started](https://discord.com/developers/docs/getting-started) and retrieve a bot token
2. Create a Testing Server in Discord and get the guild id. Follow [Guild id location](https://www.reddit.com/r/Discord_Bots/comments/iw05gs/guild_id_location/) to get the guild id.
3. Follow [local setup](https://github.com/Good-Games-Munich/.github/wiki/workflows#local-setup).
4. Follow the [Customization](#customization) section and set all variables with `Required in dev` `true`.
5. Invite your Bot to your Discord server.

### Customization

Create a environment file `touch .env`. Override variables in the `{variable name}={variable value}` format. All required variables need to be overridden for the respected environment.

| Variable                       | Description                             | Required in dev | Required in prod | Default value |
| ------------------------------ | --------------------------------------- | --------------- | ---------------- | ------------- |
| `POSTGRES_PASSWORD`            | Postgres password. Choose a secure one. | `true`          | `true`           | none          |
| `DISCORD_DEVELOPMENT_GUILD_ID` | Guild id of a server to test on.        | `true`          | `false`          | none          |

<!-- CONTRIBUTING -->

## Contributing

Follow [contributing](https://github.com/Good-Games-Munich/.github/wiki/workflows#contributing).

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/Good-Games-Munich/water-heater.svg?style=flat-square
[contributors-url]: https://github.com/Good-Games-Munich/water-heater/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Good-Games-Munich/water-heater.svg?style=flat-square
[forks-url]: https://github.com/Good-Games-Munich/water-heater/network/members
[stars-shield]: https://img.shields.io/github/stars/Good-Games-Munich/water-heater.svg?style=flat-square
[stars-url]: https://github.com/Good-Games-Munich/water-heater/stargazers
[issues-shield]: https://img.shields.io/github/issues/Good-Games-Munich/water-heater.svg?style=flat-square
[issues-url]: https://github.com/Good-Games-Munich/water-heater/issues
