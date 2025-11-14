# Joey Schnepel - Software Engineer Portfolio

A modern, glassmorphic portfolio website featuring Unicorn Studio animated background.

## 🚀 Quick Start

1. Open `index.html` in your browser
2. The site should load with the Unicorn Studio background

## 📁 Project Structure

```
portfolio/
├── index.html          # Main HTML file
├── styles.css          # Glassmorphism styles
├── script.js           # Interactive JavaScript
├── assets/
│   ├── logos/          # Company logos (SAIC, TSMC, Intel, Infosys)
│   ├── certs/          # Certification logos
│   ├── skills/         # Tech stack logos (React, Python, etc.)
│   └── projects/       # Project screenshots/GIFs
└── README.md
```

## 🖼️ Images You Need to Add

### Company Logos (`assets/logos/`)
- `saic-logo.png` - SAIC logo
- `tsmc-logo.png` - TSMC logo
- `intel-logo.png` - Intel logo
- `infosys-logo.png` - Infosys logo

### Certifications (`assets/certs/`)
- `aws-ccp.png` - AWS Certified Cloud Practitioner
- `itil4.png` - ITIL 4 Foundation
- `google-analytics.png` - Google Data Analytics
- `csm.png` - Certified ScrumMaster
- `dod-clearance.png` - DoD Secret Clearance badge
- `dol-apprentice.png` - Dept of Labor Apprenticeship

### Tech Stack Logos (`assets/skills/`)

**Languages:**
- `python.svg`, `java.svg`, `javascript.svg`, `sql.svg`, `html.svg`, `css.svg`

**Web Frameworks:**
- `react.svg`, `vue.svg`, `angular.svg`, `nextjs.svg`

**Cloud & DevOps:**
- `aws.svg`, `docker.svg`, `kubernetes.svg`, `jenkins.svg`, `terraform.svg`, `git.svg`, `gcp.svg`

**Data & ML:**
- `pandas.svg`, `numpy.svg`, `tensorflow.svg`, `sklearn.svg`, `powerbi.svg`, `tableau.svg`

💡 **Tip:** You can find free tech logos at:
- [Simple Icons](https://simpleicons.org/)
- [DevIcon](https://devicon.dev/)
- [Skill Icons](https://github.com/tandpfun/skill-icons)

### Project Screenshots (`assets/projects/`)
- `project1.png` - Your real project screenshot/GIF
- `placeholder.png` - Placeholder for projects 2-5

## 📝 TODO Before Launch

1. **Add Resume PDF**
   - Place your resume at `assets/resume.pdf`
   - Update the download links in `script.js` (line 69)

2. **Add All Images**
   - See image list above
   - Recommended size: 512x512px for logos/certs

3. **Update Project 1 Details**
   - Edit `index.html` lines 222-235
   - Add real project title, description, tech stack
   - Add screenshot to `assets/projects/project1.png`

4. **Customize About Section**
   - Update the about text in `index.html` lines 56-59
   - Optionally add a photo

5. **Add Hover Effect Reference**
   - Once you find the project hover effect you like
   - Share it and we'll implement it

6. **Update Contact Links**
   - Update GitHub username in footer (line 415)
   - Verify all other contact info is correct

## 🎨 Customization

### Colors
Edit CSS variables in `styles.css` (lines 9-16):
```css
--text-primary: #f0f0f0;
--accent-color: #60a5fa;
```

### Unicorn Studio Background
The background is already integrated. If you need to change it:
- Update the project ID in `index.html` line 16

## 🌐 Deployment

### Option 1: GitHub Pages
1. Create a new GitHub repo
2. Push this folder
3. Enable GitHub Pages in Settings

### Option 2: Netlify
1. Drag and drop this folder to [Netlify](https://app.netlify.com/)
2. Done!

### Option 3: Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in this directory

## ✨ Features

- ✅ Glassmorphic design with blur effects
- ✅ Sticky navigation with active section highlighting
- ✅ Unicorn Studio animated background
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scroll animations
- ✅ Interactive hover effects
- ✅ Accessible (semantic HTML, ARIA labels)
- ⏳ Project hover effect (pending reference)

## 📱 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 641px - 968px
- Desktop: > 968px

## 🔧 Browser Support

- Chrome, Firefox, Safari, Edge (latest versions)
- Glassmorphism requires backdrop-filter support

---

**Built with vanilla HTML, CSS, and JavaScript**
