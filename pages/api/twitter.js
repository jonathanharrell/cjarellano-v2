import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

// Initialize the cors middleware
const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"]
  })
);

export default async function handler(req, res) {
  await cors(req, res);
  const response = await fetch(`https://publish.twitter.com/oembed?url=${req.query.url}&omit_script=true&theme=dark`);
  const json = await response.json();
  res.json(json);
}
