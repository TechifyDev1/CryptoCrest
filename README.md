# CryptoCrest: Your Ultimate Crypto Management Tool 💎

Manage your cryptocurrency portfolio with ease and precision using CryptoCrest! This modern, intuitive React/Typescript application built with Vite helps you track expenses, monitor transactions, and gain powerful insights into your crypto holdings. Whether you're a seasoned investor or just starting, CryptoCrest provides the tools you need to make informed decisions.

## 🌟 Key Features

*   **Dashboard**: Get an overview of your portfolio, recent transactions, and market trends.
*   **Portfolio Tracking**: Monitor your crypto assets, view performance charts, and analyze your portfolio breakdown.
*   **Transaction Management**: Easily add, edit, and categorize transactions to keep your records accurate.
*   **Settings**: Customize your profile, update your email, change your password, and more.
*   **Authentication**: Secure user authentication with Firebase, including email/password and Google sign-in.
*   **Theming**: Choose between light and dark themes for a comfortable viewing experience.
*   **Mobile-Friendly**: A fully responsive design ensures a seamless experience on any device.

## 💻 Installation

Follow these steps to get CryptoCrest up and running on your local machine:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd CryptoCrest
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up Firebase:**

    *   Create a Firebase project on the [Firebase Console](https://console.firebase.google.com/).
    *   Enable Authentication (Email/Password and Google Sign-in).
    *   Create a Firestore database.
    *   Add your Firebase configuration to `src/Firebase/firebase-config.ts`:

        ```typescript
        interface firebaseConfig {
          apiKey: string;
          authDomain: string;
          projectId: string;
          storageBucket: string;
          messagingSenderId: string;
          appId: string;
        }

        export const firebaseConfig: firebaseConfig = {
          apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
          authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
          projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
          storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
          appId: import.meta.env.VITE_FIREBASE_APP_ID,
        };
        ```

4.  **Configure Environment Variables:**

    *   Create `.env` file in the root directory.
    *   Add your Firebase API keys and Cloudinary credentials:

        ```
        VITE_FIREBASE_API_KEY=<your_api_key>
        VITE_FIREBASE_AUTH_DOMAIN=<your_auth_domain>
        VITE_FIREBASE_PROJECT_ID=<your_project_id>
        VITE_FIREBASE_STORAGE_BUCKET=<your_storage_bucket>
        VITE_FIREBASE_MESSAGING_SENDER_ID=<your_messaging_sender_id>
        VITE_FIREBASE_APP_ID=<your_app_id>
        VITE_CLOUDINARY_UPLOAD_PRESET=<your_cloudinary_upload_preset>
        VITE_CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
        ```

5.  **Start the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

    Open your browser and navigate to `http://localhost:5173` (or the URL provided by Vite).

## 🚀 Usage

Once you have CryptoCrest running, here’s how to use it:

1.  **Sign Up or Log In**: Create a new account or log in with your existing credentials. You can also sign in with Google.
2.  **Explore the Dashboard**: Get an overview of your portfolio, market trends, and recent activities.
3.  **Add Transactions**: Click the "+" button to add new transactions. Enter the transaction type, asset, amount, date, and other details.
4.  **View Portfolio**: See your crypto assets, performance charts, and portfolio breakdown.
5.  **Manage Transactions**: Filter, search, and analyze your transactions to gain insights into your spending habits.
6.  **Customize Settings**: Update your profile, change your password, and adjust other settings to personalize your experience.

## 🛠️ Technologies Used

| Technology       | Description                                                                      |
| :--------------- | :------------------------------------------------------------------------------- |
| React            | JavaScript library for building user interfaces                                  |
| TypeScript       | Superset of JavaScript that adds static typing                                  |
| Vite             | Build tool that provides a fast and optimized development experience            |
| Firebase         | Backend-as-a-service (BaaS) for authentication and database                   |
| React Router DOM | Standard library for routing in React                                            |
| ECharts          | Powerful charting and visualization library                                      |
| Axios            | Promise based HTTP client for the browser and node.js                            |
| Sonner           |  A cool toast library                                                     |
| ESLint           |  For linting                                                        |
| Prettier           | For code formating                                                           |

## 🤝 Contributing

We welcome contributions to CryptoCrest! Follow these steps to get started:

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

5.  **Submit a pull request** to the main repository.

## 📜 License

This project is open-source and available under the [MIT License](LICENSE).

[![Built with Dokugen](https://img.shields.io/badge/Built%20with-Dokugen-brightgreen)](https://github.com/samueltuoyo15/Dokugen)
