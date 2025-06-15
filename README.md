<h2>🎨 DevLink Frontend</h2>
<p>DevLink is a freelance job marketplace built with the MERN stack. This repository contains the frontend of the application built using React.js with Vite, featuring real-time chat, dashboard analytics, Stripe integration, and responsive design.</p>

<h2>🔧 Tech Stack</h2>
<ul>
  <li>React.js (with TypeScript)</li>
  <li>Vite (React build tool)</li>
  <li>Redux Toolkit for global state management</li>
  <li>Axios for HTTP requests</li>
  <li>Tailwind CSS + Flowbite for UI</li>
  <li>shadcn/ui (Headless component library built on Radix UI)</li>
  <li>HeroUI (previously NextUI) for advanced UI design</li>
  <li>Framer Motion (UI animation)</li>
  <li>Socket.IO Client (for real-time chat)</li>
  <li>Stripe.js (for payment gateway)</li>
  <li>Cloudinary (for file uploads)</li>
  <li>Lucide React & React Icons (for icon sets)</li>
  <li>Chart.js + ApexCharts (for admin analytics)</li>
</ul>

<h2>📁 Folder Structure</h2>

<pre>
/devlink-frontend
│
├── <b>public/</b>               # Static files
├── <b>src/</b>
│   ├── <b>api/</b>              # Axios instances for API communication
│   ├── <b>components/</b>       # Reusable UI components
│   ├── <b>config/</b>           # App-wide configuration
│   ├── <b>hooks/</b>            # Custom React hooks (e.g., useDebounce)
│   ├── <b>lib/</b>              # Shared logic or modules
│   ├── <b>pages/</b>            # Page-level components (routes)
│   ├── <b>redux/</b>            # Redux slices and store
│   ├── <b>routes/</b>           # Application routing logic
│   ├── <b>utils/</b>            # Utility functions (e.g., token helpers)
│   ├── <b>App.tsx</b>           # App root component
│   ├── <b>main.tsx</b>          # React app entry point
│   └── <b>index.css</b>         # Tailwind + global styles
├── <b>vite.config.ts</b>        # Vite configuration
├── <b>.env</b>                  # Environment variables
├── <b>package.json</b>
├── <b>tsconfig.json</b>
└── <b>README.md</b>
</pre>

<h2>🔑 Features</h2>
<ul>
  <li>🔐 Role-based auth system (User, Client, Admin)</li>
  <li>📤 Job posting & bidding interface</li>
  <li>🧑‍💼 Profile creation with verification badges</li>
  <li>📩 Real-time messaging using Socket.IO</li>
  <li>📊 Interactive Admin Dashboard (charts & reports)</li>
  <li>💳 Stripe integration for client payments</li>
  <li>📷 Cloudinary file/image uploads</li>
  <li>💬 AI chatbot (Gemini integration)</li>
  <li>⚡ Fast Vite-based build & hot reload</li>
</ul>

<hr />

<h2>🚀 Getting Started</h2>

<h3>📋 Prerequisites</h3>
<ul>
  <li>Node.js (v18+)</li>
  <li>Cloudinary account</li>
  <li>Stripe account (for payments)</li>
</ul>

<h3>📥 1. Clone the Repository</h3>
<pre><code>git clone https://github.com/yourusername/devlink-frontend.git
cd devlink-frontend
</code></pre>

<h3>📦 2. Install Dependencies</h3>
<pre><code>yarn install
# or
npm install
</code></pre>

<h3>⚙️ 3. Create .env File</h3>
<pre><code>touch .env
</code></pre>
<p>Add the following variables:</p>
<pre><code>
VITE_REACT_APP=VITE_LATEST_TS
VITE_ADMIN_PROFILE_PICTURE=https://your-admin-image-url.com
VITE_STRIPE_PUBLISABLE_KEY=your_stripe_public_key
VITE_GEMINI_CHATBOT_API_KEY=your_google_gemini_api_key
VITE_BASE_URL=https://your-frontend-url.com
VITE_SERVER_URL=https://your-backend-url.com
VITE_CLOUDINARY_URL=https://api.cloudinary.com/v1_1/your-cloud-name/image/upload
</code></pre>

<h3>▶️ 4. Start the Development Server</h3>
<pre><code>yarn dev
# or
npm run dev
</code></pre>

<p>The app will be available at <code>http://localhost:5173</code> by default.</p>

<hr />

<h2>📚 Important Libraries</h2>
<ul>
  <li>axios, redux, @reduxjs/toolkit</li>
  <li>socket.io-client</li>
  <li>tailwindcss, flowbite, shadcn</li>
  <li>framer-motion, vaul</li>
  <li>chart.js, apexcharts, react-chartjs-2</li>
  <li>stripe-js, react-stripe-js</li>
  <li>yup, jwt-decode, clsx</li>
  <li>lucide-react, react-icons, html2canvas, jspdf</li>
</ul>
