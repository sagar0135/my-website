# MANVUE React Starter Kit

A modern React conversion of the MANVUE e-commerce website, built with React 18, React Router, and Context API for state management.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or download the starter kit**
   ```bash
   # If you have the files locally, navigate to the React-Starter-Kit directory
   cd React-Starter-Kit
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

```bash
# Development
npm start          # Start development server
npm run build      # Build for production
npm run test       # Run tests
npm run eject      # Eject from Create React App

# Code quality
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format code with Prettier
```

## 🎨 Styling

The project uses a combination of:
- **CSS Modules** for component-specific styles
- **CSS Variables** for theming and consistency
- **Responsive design** with mobile-first approach
- **Dark theme** support

### CSS Structure
```
styles/
├── globals.css        # Global styles and utilities
├── variables.css      # CSS custom properties
├── components/        # Component-specific styles
└── pages/            # Page-specific styles
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```bash
REACT_APP_API_URL=https://api.manvue.com
REACT_APP_GA_ID=GA_MEASUREMENT_ID
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...
```

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 992px
- **Desktop**: 992px+

## 🔍 SEO Features

- **Meta tags** for each page
- **Open Graph** tags for social sharing
- **Twitter Cards** support
- **Structured data** (JSON-LD)
- **Semantic HTML** markup
- **Accessibility** compliance

## 🚀 Performance

- **Code splitting** with React.lazy()
- **Lazy loading** for images
- **Bundle optimization**
- **Service Worker** for caching
- **Performance monitoring**

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Generate coverage report
npm test -- --coverage
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

### Deploy to Vercel
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

## 🔄 Migration from HTML

### Completed Conversions
- ✅ Project structure setup
- ✅ Core components (Header, ProductCard)
- ✅ Routing configuration
- ✅ State management setup
- ✅ Global styles

### Next Steps
1. **Convert remaining HTML pages** to React components
2. **Implement search functionality**
3. **Add product filtering**
4. **Complete cart and wishlist features**
5. **Add user authentication**
6. **Integrate payment system**

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [React documentation](https://react.dev/)
2. Review the [React Router docs](https://reactrouter.com/)
3. Search existing issues
4. Create a new issue with detailed information

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Project setup and structure
- [x] Basic routing
- [x] Component architecture
- [x] State management setup

### Phase 2: E-commerce Features 🚧
- [ ] Product catalog
- [ ] Shopping cart
- [ ] Wishlist
- [ ] Search and filtering
- [ ] Product details

### Phase 3: Advanced Features 📋
- [ ] User authentication
- [ ] Payment integration
- [ ] Order management
- [ ] Reviews and ratings
- [ ] Admin dashboard

### Phase 4: Optimization 📋
- [ ] Performance optimization
- [ ] PWA features
- [ ] Advanced SEO
- [ ] Analytics integration
- [ ] A/B testing

---

**Happy coding! 🚀** 