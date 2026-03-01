# Deploy to Vercel

## Project Structure

Your project should have this structure:

```
your-project/
├── api/
│   └── pokemap.js
├── package.json
└── vercel.json
```

## Deployment Steps

### Option 1: Deploy via Vercel CLI (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**
   ```bash
   vercel
   ```
   
   Follow the prompts. For first deployment, answer:
   - Set up and deploy? **Y**
   - Which scope? (select your account)
   - Link to existing project? **N**
   - What's your project's name? (enter a name)
   - In which directory is your code located? **./**

4. **Deploy to production**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via GitHub Integration

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Add Vercel deployment config"
   git push
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Import your GitHub repository
   - Click "Deploy"

## Usage

After deployment, your API will be available at:

```
https://your-project-name.vercel.app/api/pokemap?params=here
```

## Important Notes

- Vercel uses **serverless functions**, not Express servers
- No need for `express`, `cors`, or `node-fetch` dependencies (fetch is built-in in Node 18+)
- The endpoint will be `/api/pokemap` automatically based on the file location
- Free tier has limits: 100GB bandwidth/month, 100 hours function execution time/month

## Environment Variables (if needed)

If you need environment variables, add them in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

## Troubleshooting

- Check deployment logs in Vercel dashboard
- View function logs under "Deployments" → Select deployment → "Functions" tab
- Ensure Node version is 18.x or higher
