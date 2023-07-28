
/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate-plugin')

module.exports = nextTranslate({
  webpack: (config, { isServer, webpack }) => {
    return config;
  }
})