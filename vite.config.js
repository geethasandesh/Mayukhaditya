import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

function contactApiDevPlugin() {
  return {
    name: 'contact-api-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/contact', async (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify({ error: 'Method not allowed. Only POST is accepted.' }))
          return
        }

        let body = ''
        req.on('data', (chunk) => {
          body += chunk
        })
        req.on('end', async () => {
          try {
            // Dynamically import the handler so it picks up env changes
            const mod = await import('./api/contact.js')
            const handler = mod.default

            // Build a minimal req/res shim compatible with the Vercel handler
            let parsedBody = body
            try {
              parsedBody = JSON.parse(body || '{}')
            } catch {
              // raw string passed to handler
            }

            const fakeReq = {
              method: 'POST',
              body: parsedBody,
              headers: {
                ...req.headers,
                'x-forwarded-for': req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1',
              },
            }

            const fakeRes = {
              _statusCode: 200,
              _headers: {},
              _body: null,
              setHeader(name, value) {
                this._headers[name] = value
              },
              status(code) {
                this._statusCode = code
                return this
              },
              json(data) {
                this._body = data
                res.statusCode = this._statusCode
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
              },
              end() {
                res.statusCode = this._statusCode
                res.end()
              },
            }

            await handler(fakeReq, fakeRes)
          } catch (err) {
            console.error('Contact API Error:', err.message)
            res.statusCode = err.statusCode || 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: err.message || 'Failed to send message.' }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [tailwindcss(), react(), contactApiDevPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) {
              return 'vendor-motion'
            }
            if (
              id.includes('react') ||
              id.includes('react-dom') ||
              id.includes('react-router-dom') ||
              id.includes('react-helmet-async')
            ) {
              return 'vendor-react'
            }
          }
        },
      },
    },
  },
})

