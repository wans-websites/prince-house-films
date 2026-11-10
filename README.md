# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify]

## Editing Content via Sanity

This site's content is managed in Sanity CMS. All text, images, links, and section content are editable without code changes.

### Accessing Sanity Studio

```bash
cd studio
npx sanity dev
```

Studio runs at `http://localhost:3333`.

### Page Sections (Singletons)

Edit once, appears once on the site. Available in the "Page Sections" list:

- **Site Settings** — Brand name, logo, contact email/phone/address, social links, site URL
- **Header** — Logo, navigation links, mobile menu ARIA labels
- **Preloader** — Logo, loading text, status labels, background video
- **Hero** — Headline, highlighted text, CTA label/link, background media
- **About** — Section title, body text, CTA label/link
- **Our Creative Process (Approach)** — Section title, process steps, showcase items, note quote
- **Our Vision & Mission (Objectives)** — Section title, intro, vision/mission cards, core values
- **Our Impact in Numbers (Counts)** — Section title, animated stats, achievement badges
- **Why Choose Us** — Section title, intro, reason cards, comparison columns, footer stats
- **Services Section** — Section heading (service cards are managed as collection items)
- **Portfolio Section** — Section title, filter categories
- **Gallery Section** — Section title, intro, filter categories, view-more link
- **Team Section** — Section title, intro, group photo
- **Partnership Section** — Badge label, section title, intro, partner logos, partnership types, action button
- **Get In Touch** — Section title, intro, contact details, social links, CTA buttons
- **Footer** — Logo, social links, privacy policy link, copyright text
- **Privacy Policy** — Page title, dates, full rich-text body
- **Error Boundary** — Media load fallback message

### Collections (Repeatable Items)

Add, remove, and reorder items. Available in the "Collections" list:

- **Services** — Service cards for the bento grid
- **Approach Steps** — Process step items
- **Portfolio Categories** — Filter labels
- **Portfolio Items** — Portfolio card entries with cover image, client, year, duration, awards
- **Gallery Categories** — Filter labels
- **Gallery Items** — Gallery card entries with cover image, date, location, media type
- **Partner Logos** — Partner logo images with names and URLs
- **Contact Details** — Contact card entries (Location, Email, Phone)

### Image Uploads & Hotspots

Upload images via Sanity's asset panel. Use the hotspot editor to set the focal point for cropped images.

### Ordering

Collection items have an `Order` field. Lower numbers appear first. Drag to reorder in Studio.

### Adding New Content

- **Portfolio Item:** Create a new "Portfolio Items" document, set cover image (Sanity upload or external URL), add alt text, client, year, duration, awards, and category.
- **Service:** Create a new "Services" document, set title, description, icon key, background media, and modal media items.
- **Partner:** Create a new "Partner Logos" document, upload logo image, set name and alt text.

### Content Reference

See `CONTENT_MAP.md` for a complete field-by-field mapping of site locations to Studio fields.

### Known Content Notes

- Header nav label "partnerships" is lowercase (pre-existing, preserved as-is)
- `hero-singleton` and the 4 original `service-*` docs are Studio-managed and not overwritten by the seed script
- ErrorBoundary fallback text is stored in CMS but not yet consumed (class component limitation)
- `public/index.html` SEO meta tags are static and not yet driven by Sanity(https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
