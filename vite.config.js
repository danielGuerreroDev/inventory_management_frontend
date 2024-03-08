import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const rewriteSlashToIndexHtml = () => {
  const urls = ['/pages/Insights', '/pages/Stock', '/pages/Sell'];

  return {
    name: 'rewrite-slash-to-index-html',
    apply: 'serve',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use('/index.html', (req, _, next) => {
        if (urls.some((v) => v === req.url)) {
          req.url = '/index.html'
        }
        next()
      })
    },
  }
}

export default defineConfig({
  appType: 'mpa',
  plugins: [react(), rewriteSlashToIndexHtml()],
})
