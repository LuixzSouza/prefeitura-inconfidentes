/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // ou 'http' se necessário
        hostname: 'inconfidentes.mg.gov.br',
        port: '',
        pathname: '/**', // Permite qualquer imagem desse domínio
      },
    ],
  },
};

export default nextConfig;