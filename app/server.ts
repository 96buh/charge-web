import { createServer } from "http";
import { parse } from "url";
import next from "next";

// const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url || "", true);

    if (parsedUrl.pathname === "/api/sse") {
      res.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        connection: "keep-alive",
        "access-control-allow-origin": "*",
      });
      const intervalId = setInterval(() => {
        res.write(
          `data: ${JSON.stringify({
            message: "Hello from server",
          })}\n\n`,
        );
      }, 3000);

      req.on("close", () => {
        clearInterval(intervalId);
      });
    } else {
      handle(req, res, parsedUrl);
    }
  }).listen(3000, (err?: Error) => {
    if (err) throw err;
    console.log("Ready on https://localhost:3000");
  });
  process.on("SIGTERM", () => {
    process.exit(0);
  });
});
