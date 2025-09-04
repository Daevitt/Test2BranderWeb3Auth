/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        crypto: false,
        stream: false,
        url: false,
        zlib: false,
        http: false,
        https: false,
        assert: false,
        os: false,
        path: false,
      };
    }
    
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    return config;
  },
  transpilePackages: [
    '@web3auth/no-modal',
    '@web3auth/openlogin-adapter', 
    '@web3auth/ethereum-provider',
    '@web3auth/base'
  ]
};

module.exports = nextConfig;
