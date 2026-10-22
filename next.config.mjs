/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // As imagens de notícias, eventos e galerias são cadastradas por URL no
    // painel, então qualquer host HTTPS precisa ser aceito.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
