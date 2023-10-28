const nextConfig = {
  // TODO: if process is not production, use dotenv config ...
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
