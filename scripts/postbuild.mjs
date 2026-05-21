import { copyFileSync } from "fs"

// SPA fallback: Vercel serves 404.html for unknown routes
copyFileSync("dist/index.html", "dist/404.html")
console.log("Created dist/404.html for SPA routing")
