export async function register() {
  if (
    false &&
    process.env.NEXT_RUNTIME == "nodejs" &&
    process.env.NODE_ENV == "development"
  ) {
    const { server } = await import("@/mocks/node");
    server.listen({
      onUnhandledRequest: "bypass",
    });
  }
}
