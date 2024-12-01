/** @type {import('next').NextConfig} */
const nextConfig = {
 
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
 

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'mphgaanpbwsetutodyvl.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**'
      }
    ]
  },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Exclude 'canvas' from client-side bundling
      config.externals.push('canvas')
    }

    return config
  },

  experimental: {
    optimizeCss: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js'
        }
      },
      resolveAlias: {
        underscore: 'lodash',
        mocha: { browser: 'mocha/browser-entry.js' }
      }
    }
  },

  modularizeImports: {
    lodash: {
      transform: 'lodash/{{member}}'
    }
  },

  reactStrictMode: true
}

module.exports = nextConfig
