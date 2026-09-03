import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Da Vinci chapters used to be client-side state on ?chapter=. They are real
      // routes now, so links shared before the change keep working instead of
      // silently landing on chapter 00.
      {
        source: "/projects/davinci",
        has: [
          {
            type: "query",
            key: "chapter",
            value: "(?<chapter>mind|face|bridge|body)",
          },
        ],
        destination: "/projects/davinci/:chapter",
        permanent: true,
      },
      // No rule for ?chapter=vision: chapter 00 already renders at this exact URL,
      // and redirecting it here would match its own destination and loop forever
      // (Next carries the query string through to the destination).
    ];
  },
};

export default nextConfig;
