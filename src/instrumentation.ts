export async function register() {
  if (
    process.env.NEXT_RUNTIME == "nodejs" &&
    process.env.NODE_ENV == "development" &&
    process.env.ENABLE_API_MOCKS === "true"
  ) {
    const { server } = await import("@/mocks/node");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  }
}
