# Size Chart Design WEB

This project is a modern, interactive web application designed to provide detailed size guides for various fashion brands. It features a responsive design and supports multiple categories including Women, Men, Kids, and Shoes.

## 🚀 Technology Stack

- **Framework:** [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/) (via `shadcn/ui` pattern)
- **Deployment:** GitHub Pages

## 📂 Project Structure

```
src/
├── components/
│   ├── ui/               # Reusable UI components (Buttons, Dialogs, Tabs, etc.)
│   ├── SizeGuide.tsx     # Main application component handling the size chart logic
│   └── figma/            # Design assets imported from Figma
├── data/
│   ├── brandSizeData.ts  # Centralized data file for Adult (Women/Men) and General size charts
│   └── kidsBrandsData.ts # Dedicated data file for Kids and Baby size charts
├── App.tsx               # Root application component
├── main.tsx              # Application entry point
└── index.css             # Global styles and Tailwind directives
```

## ✨ Key Features

- **Multi-Brand Support:** Includes size data for major brands like H&M, Zara, Mango, COS, Arket, etc.
- **Categorized Data:** Separate tabs for Women, Men, Shoes, and Kids.
- **Responsive Tables:** Optimized for viewing on both desktop and mobile devices.
- **Interactive UI:** Smooth transitions and tab switching using Radix UI primitives.

## 🛠️ Installation & Local Development

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Sizechartdesignweb
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Start the development server**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:3000` (or similar).

## 🌍 Deployment

This project is configured to deploy to **GitHub Pages** using the `main` branch.

### Deployment Workflow

To deploy the latest changes, simply run:

```bash
npm run deploy
```

**What this command does:**
1.  Builds the project for production (outputting to the `docs/` folder).
2.  Adds the `docs/` folder to Git.
3.  Commits the changes with a message "Deploy: update docs".
4.  Pushes the changes to the `main` branch.

### GitHub Pages Configuration

Ensure your GitHub repository settings are configured as follows:
1.  Go to **Settings** > **Pages**.
2.  Under **Build and deployment**, select **Source** as **Deploy from a branch**.
3.  Select **Branch** as `main` and folder as `/docs`.
4.  Click **Save**.

## 📐 Architecture & Data Flow

- **Data Separation:** Size data is decoupled from the UI. All measurements and size tables are defined in `src/data/`. This makes it easy to add new brands or update existing measurements without touching the UI code.
- **Component Design:** `SizeGuide.tsx` acts as the smart container that fetches data from the `data/` directory based on the selected brand and category, rendering the appropriate tables dynamically.
- **Styling System:** Tailwind CSS is used for utility-first styling, ensuring consistency and rapid development. Global theme variables are defined in `index.css`.

## 📝 License

This project is for internal development and design reference.