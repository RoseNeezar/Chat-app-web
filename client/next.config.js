module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:any*",
        destination: "/api/:any*",
      },
      // Rewrite everything else to use `pages/app`
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },
};
