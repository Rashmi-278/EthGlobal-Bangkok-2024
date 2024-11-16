# Pyth-in-Galaxy

**"Discover dynamic gradient galaxies with Pyth, the Baby Snake's Spaceship powered by Pyth-Entropy, traveling through the universe of randomness."**

---

## Overview

Pyth-in-Galaxy is a whimsical Next.js + Chakra UI project inspired by the Pyth-Entropy service, which provides verifiable random numbers. It brings the story of Pyth, a baby snake exploring the universe in his spaceship powered by Pyth-Entropy. When the API provides data, Pyth successfully reaches a galaxy, represented as a stunning gradient. If the spaceship fails to find the map to a galaxy (API returns a `403`), Pyth continues undeterred, with his resolve symbolized by a friendly snake icon.

---

## Features

- **Dynamic Gradients**: Generate mesmerizing gradients based on verifiable random numbers retrieved from the Pyth-Entropy-powered Fortuna Revelations API.
- **Error Handling**: Gracefully handles API errors by showing a snake icon, symbolizing Pyth's determination despite obstacles.
- **Clean UI**: Features a responsive Chakra UI interface, complete with a navigation bar and a shadowed gradient card in the center.
- **Pyth's Story**: A subtle reminder that, like Pyth, we must keep exploring, no matter the challenges.

---

## Tech Stack

- **[Next.js](https://nextjs.org/)** – Framework for building fast, modern React applications with server-side rendering and static site generation.
- **[Chakra UI](https://chakra-ui.com/)** – A modern, responsive UI component library.
- **[TypeScript](https://www.typescriptlang.org/)** – Enhances development with type safety and better tooling.
- **[Pyth-Entropy](https://pyth.network/)** – Verifiable randomness generator

---

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js (>=16)
- `pnpm` (preferred) or `npm`

### Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Rashmi-278/EthGlobal-Bangkok-2024
   cd pyth-in-galaxy
   ```

2. **Install dependencies**:
   Using `pnpm`:
   ```bash
   pnpm install
   ```

   Or using `npm`:
   ```bash
   pnpm install
   ```

3. **Start the development server**:
   ```bash
   pnpm run dev
   ```

   The app will run at `http://localhost:3000`.

---

## API Endpoint

The app interacts with the Fortuna Revelations API:

```bash
GET https://fortuna.dourolabs.app/v1/chains/base/revelations/<random_number>
```

### Responses

1. **200 (Success)**:  
   Pyth reaches a galaxy! The app visualizes this as a gradient.  
   Example response:
   ```json
   {
     "value": {
       "encoding": "hex",
       "data": "aeeaa45fc8ae4dfc2b1ddfae5151d75082ac8be824b5365726d399ba59ac7fd7"
     }
   }
   ```

2. **403 (Error)**:  
   Pyth's spaceship can't find the map to the galaxy. A snake icon is displayed.  
   Example response:
   ```
   Random value cannot currently be retrieved
   ```

---

## How It Works

1. **Random Number Generation**: The app periodically generates a random number every 3 seconds and queries the API to fetch galaxy data.
2. **Gradient Generation**: If the API returns a `200` response, the `data` field (hex-encoded) is used to create a linear gradient representing a galaxy.
3. **Error Handling**: If the API returns a `403` response, the snake icon (`VscSnake`) is displayed to symbolize Pyth’s resilience.
4. **UI Presentation**: A centralized card displays the gradient or the snake icon, while the navigation bar features Pyth's logo.

```

## Extending the Project

- **Add New Galaxy Styles**: Create custom visuals based on `data` beyond gradients.
- **Pyth's Journey Log**: Keep track of successful and failed galaxy visits.
- **Animations**: Animate Pyth's spaceship as he travels between galaxies.

---

## License

This project is licensed under the MIT License.

---
