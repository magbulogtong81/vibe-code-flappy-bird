# Flappy Funster

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/magbulogtong81/vibe-code-flappy-bird)

A vibrant and playful clone of the classic Flappy Bird game, built with React and styled with Tailwind CSS, featuring a delightful 'Kid Playful' art style.

Flappy Funster is a visually stunning and delightful clone of the classic 'Flappy Bird' game, reimagined with a playful and modern 'Kid Playful' art style. The application is a single-page experience built entirely within React, using Zustand for state management and Tailwind CSS for styling. The core game logic, including physics (gravity, flapping), pipe generation, collision detection, and scoring, is implemented using vanilla JavaScript principles within a custom Zustand store, ensuring clean separation of concerns.

## ✨ Key Features

- **Classic Gameplay:** Simple, addictive, one-touch controls just like the original.
- **Vibrant Art Style:** A cheerful and modern 'Kid Playful' aesthetic with smooth animations.
- **Performant Game Logic:** Core mechanics built with vanilla JavaScript principles for smooth 60fps gameplay.
- **Modern Tooling:** Built with React, Vite, and TypeScript for a great developer experience.
- **State Management:** Centralized and predictable state managed by Zustand.
- **Responsive Design:** Flawless experience on desktop, tablet, and mobile devices.
- **High Score Tracking:** Saves your best score in local storage to encourage replayability.

## 🚀 Technology Stack

- **Framework:** React (with Vite)
- **State Management:** Zustand
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Icons:** Lucide React
- **Deployment:** Cloudflare Pages & Workers

## 🏁 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Make sure you have [Bun](https://bun.sh/) installed on your system.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/flappy_funster.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd flappy_funster
    ```

3.  **Install dependencies:**
    ```sh
    bun install
    ```

## 🛠️ Development

To start the local development server, run the following command:

```sh
bun run dev
```

This will start the Vite development server, typically available at `http://localhost:3000`. The server supports Hot Module Replacement (HMR) for a fast and efficient development workflow.

## 🚀 Deployment

This project is configured for seamless deployment to Cloudflare Pages.

1.  **Build the project:**
    First, build the application for production. This command bundles the React app and prepares the Cloudflare Worker.
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    Run the deploy command using the Wrangler CLI. Make sure you have authenticated with Wrangler first (`wrangler login`).
    ```sh
    bun run deploy
    ```

Alternatively, you can connect your GitHub repository to Cloudflare Pages for automatic CI/CD deployments on every push to your main branch.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/magbulogtong81/vibe-code-flappy-bird)

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improving the game, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.