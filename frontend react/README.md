# MANVUE React Frontend

A modern React conversion of the MANVUE e-commerce website, built with React 18, React Router, and Context API for state management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Navigate to the React project directory**
   ```bash
   cd "frontend react"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Shared components (Header, Footer, etc.)
│   ├── layout/         # Layout components
│   ├── home/           # Homepage-specific components
│   ├── products/       # Product-related components
│   ├── cart/           # Shopping cart components
│   ├── wishlist/       # Wishlist components
│   └── modals/         # Modal components
├── pages/              # Page components
│   └── CategoryPages/  # Category-specific pages
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── services/           # API and external services
├── utils/              # Utility functions
└── styles/             # CSS files
```

## 🎯 Key Features

### ✅ Implemented
- **React 18** with modern hooks and features
- **React Router v6** for client-side routing
- **Context API** for state management
- **Responsive design** with CSS Grid and Flexbox
- **Component-based architecture**
- **Lazy loading** for better performance
- **SEO optimization** with meta tags
- **Accessibility** features (ARIA labels, keyboard navigation)

### 🚧 In Progress
- **Product filtering and search**
- **Shopping cart functionality**
- **Wishlist management**
- **User authentication**
- **Payment integration**

### 📋 Planned
- **Redux Toolkit** for advanced state management
- **TypeScript** integration
- **Unit and integration tests**
- **PWA features** (offline support, push notifications)
- **Performance optimization** (code splitting, image optimization)

## 🛠️ Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier

## 🎨 Styling

The project uses CSS custom properties (variables) for consistent theming:

- **Dark theme** (default) - Modern, sleek design
- **Light theme** - Clean, minimal design
- **Responsive breakpoints** - Mobile-first approach
- **CSS Grid & Flexbox** - Modern layout techniques

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your_api_url_here
REACT_APP_STRIPE_PUBLIC_KEY=your_stripe_key_here
```

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 SEO & Performance

- **Meta tags** for social sharing
- **Structured data** (JSON-LD)
- **Lazy loading** for images and components
- **Code splitting** for better performance
- **Service Worker** for caching (planned)

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in watch mode
npm test -- --watch
```

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Deploy to Netlify
npm run build
# Then drag the build folder to Netlify

# Deploy to Vercel
npm run build
# Then push to GitHub and connect to Vercel
```

## 🔄 Migration from HTML/CSS/JS

This React application is a complete conversion of the original HTML/CSS/JS website. Key improvements:

1. **Component Reusability** - DRY principle with reusable components
2. **State Management** - Centralized state with Context API
3. **Routing** - Client-side routing with React Router
4. **Performance** - Lazy loading and code splitting
5. **Developer Experience** - Hot reloading and modern tooling

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For support, email support@manvue.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Complete all page components
- [ ] Add product detail pages
- [ ] Implement shopping cart
- [ ] Add user authentication
- [ ] Integrate payment system
- [ ] Add PWA features
- [ ] Implement search functionality
- [ ] Add filtering and sorting
- [ ] Create admin dashboard
- [ ] Add analytics tracking 