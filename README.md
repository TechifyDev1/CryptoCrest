# CryptoCrest

A React-based web application to manage your cryptocurrency assets and track transactions. Built with TypeScript, Firebase, and a suite of modern frontend tools.

## Description

CryptoCrest provides a user-friendly interface to monitor your cryptocurrency portfolio, track transactions, and gain insights into your spending habits. It features:

*   **Dashboard:** An overview of your portfolio with key metrics and visualizations.
*   **Portfolio:** Detailed breakdown of your assets and performance.
*   **Transactions:** Comprehensive transaction history with filtering and analytics.
*   **Settings:** Options to manage your profile, security, and preferences.
*   **Authentication:** Secure user authentication and authorization with Firebase.
*   **Landing Page:** Informative landing page to attract new users.

## Installation

Follow these steps to get CryptoCrest up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd CryptoCrest
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Firebase:**

    *   Create a Firebase project in the [Firebase Console](https://console.firebase.google.com/).
    *   Enable Email/Password authentication and Google Authentication.
    *   Obtain your Firebase configuration from the Firebase Console.
    *   Create a `.env` file in the root directory of the project.
    *   Add your Firebase configuration to the `.env` file:

    ```
    VITE_FIREBASE_API_KEY="YOUR_API_KEY"
    VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
    VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    VITE_FIREBASE_APP_ID="YOUR_APP_ID"
    ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    This will start the application at `http://localhost:5173` (or a similar address).

## Usage

1.  **Sign Up/Log In:**  Create a new account or log in with your existing credentials.  You can also use Google Authentication.

2.  **Navigate the App:** Use the sidebar or mobile navigation to access the Dashboard, Portfolio, Transactions, and Settings pages.

3.  **Add Transactions:** Track your crypto buys and sells by adding them via the "+" button.

4.  **Monitor Your Portfolio:** View your asset allocation and performance on the Portfolio page.

5.  **Analyze Transactions:** Filter and analyze your transaction history on the Transactions page.

6.  **Customize Settings:** Manage your profile, security settings, and theme preferences on the Settings page.

## Contributing

Contributions are welcome! Here's how you can contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Test your changes thoroughly.
5.  Submit a pull request.

Please adhere to the project's coding style and conventions.  Consider creating an issue first to discuss significant changes or new features.

## License

This project is currently not licensed. All rights are reserved.

[![Built with Dokugen](https://img.shields.io/badge/Built%20with-Dokugen-brightgreen)](https://github.com/samueltuoyo15/Dokugen)
