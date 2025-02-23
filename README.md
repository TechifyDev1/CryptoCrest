# CryptoCrest

A comprehensive cryptocurrency portfolio tracking application built with React and TypeScript. CryptoCrest allows users to monitor their crypto investments, track transactions, and gain insights into their portfolio performance, all within a user-friendly interface.

## Description

CryptoCrest provides a centralized platform for managing your cryptocurrency holdings. Whether you're a seasoned trader or just starting out, CryptoCrest helps you stay informed and make data-driven decisions. Key features include:

- **Dashboard:** A high-level overview of your portfolio, including performance highlights, recent activity, and asset allocation.
- **Portfolio Tracking:** Detailed insights into individual asset performance, transaction history, and overall portfolio value.
- **Transaction Management:** Easily record and track all your cryptocurrency transactions.
- **Settings:** Customize your profile, manage email preferences, and configure application settings.
- **Landing Page:** A public-facing page that promotes the features and functionality of the CryptoCrest application.
- **Authentication:** Secure user authentication with login and signup capabilities.
- **Responsive Design:** A seamless user experience across desktop and mobile devices.
- **Theme Context:** Light & Dark mode.

## Installation

Follow these steps to get CryptoCrest up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd CryptoCrest
    ```

2.  **Install dependencies:**

    ```bash
    npm install # or yarn install or pnpm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add your Firebase configuration and any other necessary environment variables to the `.env` file. See `.env.example` for the required environment variables

    ```
    VITE_API_KEY=your_api_key
    VITE_AUTH_DOMAIN=your_auth_domain
    VITE_PROJECT_ID=your_project_id
    VITE_STORAGE_BUCKET=your_storage_bucket
    VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
    VITE_APP_ID=your_app_id
    ```

4.  **Firebase Setup:**

    - Create a new project on the Firebase console.
    - Enable authentication and create a database (if needed).
    - Follow the steps on the Firebase console to get your configuration.

## Usage

1.  **Start the development server:**

    ```bash
    npm run dev # or yarn dev or pnpm dev
    ```

2.  **Open your browser and navigate to** `http://localhost:5173` (or the port specified by Vite).

3.  **Explore the application:**

    - Create an account or log in.
    - Navigate to the dashboard to view your portfolio overview.
    - Add transactions to track your cryptocurrency investments.
    - Customize your settings as needed.

## Contribution

Contributions are welcome! Here's how you can contribute to CryptoCrest:

1.  **Fork the repository.**
2.  **Create a new branch** for your feature or bug fix:

    ```bash
    git checkout -b feature/your-feature-name
    ```

3.  **Make your changes and commit them:**

    ```bash
    git add .
    git commit -m "Add your descriptive commit message"
    ```

4.  **Push your changes to your forked repository:**

    ```bash
    git push origin feature/your-feature-name
    ```

5.  **Create a pull request** to the main branch of the CryptoCrest repository.

## License

This project is open source and available under the [MIT License](LICENSE).

## Badges

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
