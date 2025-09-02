# Arcadia Shop — Minimal Storefront

A complete, polished, responsive e-commerce storefront built with plain HTML, CSS, and JavaScript. Features a modern dark theme, accessible design, and full cart functionality with localStorage persistence.

## 🚀 Features

### Core Functionality
- **Product Grid**: 8 realistic products with images, names, prices, and add-to-cart functionality
- **Shopping Cart**: Persistent cart with localStorage, quantity management, and real-time updates
- **Search & Filter**: Product search by name and price range filtering
- **Sorting**: Sort products by name or price (low to high, high to low)
- **Mock Checkout**: Accessible modal with order summary and demo order placement

### Design & UX
- **Dark Theme**: Modern dark color scheme with custom CSS variables
- **Responsive Design**: Mobile-first approach with fluid grid layout
- **Sticky Navigation**: Header with logo, search, filters, and cart button
- **Smooth Animations**: Cart drawer slide-in, modal transitions, and hover effects
- **Toast Notifications**: User feedback for cart actions

### Accessibility (A11y)
- **Semantic HTML**: Proper use of `<header>`, `<main>`, `<section>`, `<footer>`
- **Skip Links**: "Skip to content" link for keyboard navigation
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Visible focus indicators and focus trapping in modals
- **Keyboard Navigation**: Full keyboard support with Escape key handling
- **Screen Reader Support**: Proper roles and descriptions

### Performance
- **Optimized Images**: Lazy loading, proper dimensions, and fallback handling
- **Efficient CSS**: Lean stylesheet with no unused rules
- **Module Scripts**: ES6 modules for better performance
- **Local Storage**: Persistent cart state without server calls

### SEO & Social
- **Meta Tags**: Complete Open Graph and Twitter Card support
- **Structured Data**: Semantic HTML for better search engine understanding
- **Sitemap**: XML sitemap for search engine crawling
- **Robots.txt**: Proper crawling instructions

## 🛠️ Technology Stack

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Custom properties, Grid, Flexbox, and modern selectors
- **Vanilla JavaScript**: ES6+ features, modules, and modern APIs
- **Local Storage**: Client-side data persistence
- **Picsum Photos**: High-quality placeholder images

## 📁 Project Structure

```
arcadia-shop/
├── index.html          # Main HTML file
├── styles.css          # Complete CSS stylesheet
├── script.js           # JavaScript functionality
├── favicon.svg         # SVG favicon
├── favicon.ico         # ICO favicon fallback
├── og-image.jpg        # Open Graph image
├── robots.txt          # Search engine instructions
├── sitemap.xml         # Site structure for SEO
├── netlify.toml        # Netlify deployment config
├── vercel.json         # Vercel deployment config
└── README.md           # This documentation
```

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required!

### Local Development

1. **Clone or download** the project files
2. **Open `index.html`** in your web browser
3. **That's it!** The site runs entirely client-side

```bash
# If using a local server (optional)
python -m http.server 8000
# or
npx serve .
# or
php -S localhost:8000
```

### File Structure
- `index.html` - Main application file
- `styles.css` - All styling and responsive design
- `script.js` - Cart logic, search, filters, and interactions

## 🎨 Customization

### Theme Colors
Modify the CSS custom properties in `styles.css`:

```css
:root {
    --bg: #0b0f14;        /* Background color */
    --text: #e6f0ff;      /* Text color */
    --border: #1e2a3b;    /* Border color */
    --muted: #9fb3d1;     /* Muted text */
    --accent: #7cc3ff;    /* Accent color */
}
```

### Adding Products
Edit the `products` array in `script.js`:

```javascript
const products = [
    {
        id: 1,
        name: "Product Name",
        price: 29.99,
        img: "https://picsum.photos/seed/product/400/300",
        category: "category"
    },
    // Add more products...
];
```

### Styling
- All styles are in `styles.css`
- Mobile-first responsive design
- CSS Grid for product layout
- Flexbox for component layouts

## 📱 Responsive Design

- **Mobile**: 320px+ (single column layout)
- **Tablet**: 768px+ (two column grid)
- **Desktop**: 1100px+ (three+ column grid)
- **Max Width**: 1100px container with auto margins

### Breakpoints
- `480px`: Small mobile adjustments
- `768px`: Tablet layout changes
- `1100px`: Desktop optimizations

## ♿ Accessibility Features

### Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals and cart
- Arrow keys for dropdown navigation

### Screen Reader Support
- Semantic HTML structure
- ARIA labels and descriptions
- Proper heading hierarchy
- Alt text for all images

### Focus Management
- Visible focus indicators
- Focus trapping in modals
- Logical tab order
- Skip links for main content

## 🚀 Deployment

### Netlify (Recommended)

1. **Connect Repository**: Link your Git repository to Netlify
2. **Build Settings**: 
   - Build command: `echo 'Static site - no build required'`
   - Publish directory: `.` (root)
3. **Deploy**: Netlify will automatically deploy on every push

**Manual Deploy:**
1. Drag and drop the project folder to Netlify
2. Your site will be live instantly!

### Vercel

1. **Install Vercel CLI**: `npm i -g vercel`
2. **Deploy**: Run `vercel` in the project directory
3. **Follow prompts** for configuration

**Manual Deploy:**
1. Import project in Vercel dashboard
2. Configure as static site
3. Deploy automatically

### GitHub Pages

1. **Push to GitHub**: Upload files to a repository
2. **Enable Pages**: Go to Settings > Pages
3. **Select Source**: Choose main branch
4. **Access**: Your site will be at `username.github.io/repository-name`

### Other Platforms
- **Firebase Hosting**: `firebase deploy`
- **AWS S3**: Upload files to S3 bucket with static hosting
- **Surge.sh**: `surge . your-domain.com`

## 📊 Performance Targets

### Lighthouse Scores (Target)
- **Performance**: ≥ 90
- **Accessibility**: ≥ 95
- **Best Practices**: ≥ 90
- **SEO**: ≥ 90

### Optimization Features
- Lazy loading images
- Efficient CSS (no unused rules)
- Minimal JavaScript footprint
- Optimized images with proper dimensions
- Local storage for cart persistence

## 🔧 Browser Support

- **Chrome**: 60+
- **Firefox**: 55+
- **Safari**: 12+
- **Edge**: 79+
- **Mobile**: iOS Safari 12+, Chrome Mobile 60+

### Fallbacks
- CSS Grid fallback for older browsers
- Local storage fallback for cart persistence
- Image fallbacks for failed loads

## 🐛 Troubleshooting

### Common Issues

**Cart not persisting:**
- Check if localStorage is enabled
- Clear browser cache and try again

**Images not loading:**
- Check internet connection
- Images use Picsum Photos service
- Fallback images are provided

**Layout issues:**
- Ensure CSS is loading properly
- Check for JavaScript errors in console
- Verify viewport meta tag is present

### Debug Mode
Open browser developer tools and check:
- Console for JavaScript errors
- Network tab for failed requests
- Application tab for localStorage data

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Development Guidelines
- Follow existing code style
- Test on multiple browsers
- Ensure accessibility compliance
- Update documentation as needed

## 📞 Support

For questions or issues:
- Check the troubleshooting section
- Review browser console for errors
- Test in different browsers
- Verify all files are present

## 🎯 Future Enhancements

Potential improvements for future versions:
- User authentication
- Product reviews and ratings
- Wishlist functionality
- Payment integration
- Admin dashboard
- Product categories
- Advanced filtering
- Product variants
- Order history
- Email notifications

---

**Built with ❤️ using vanilla HTML, CSS, and JavaScript**


## Lighthouse targets
- Performance ≥ 90
- Accessibility ≥ 95
- Best Practices ≥ 90
- SEO ≥ 90
