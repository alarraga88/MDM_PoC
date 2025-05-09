# MDM POC — React App

This is a **proof of concept (POC)** React application for Master Data Management (MDM).  
It demonstrates a modular front-end with **mocked APIs**, **mock login**, and **unit tests**, simulating a production-ready setup.


## 🚀 Features

- **React + TypeScript**
- **Mock APIs** for:
  - Currencies
  - Locations
  - Languages
- 📄 Based on provided `openapi.yml` structure
- **Mock login** simulates Okta using the same config format
- **Unit testing** with [Vitest](https://vitest.dev/)


## 🔐 Authentication

This app simulates authentication with **mock users** based on a real-world OIDC/OAuth setup:

- Uses `oidc-client-ts`
- Username `admin` is given `admin` role
- Other usernames default to `viewer`
- No real network calls are made — the flow and behavior mimic Okta using local mocks


## How to Start
```bash
npm install
npm run dev

```

## Testing

Tests are written using:

- [`Vitest`](https://vitest.dev/)

To run tests:

```bash
npm vitest

```
