import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET", "POST", "OPTIONS"]
  })
);

export default async function handler(req, res) {
  const accessToken = `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_CLIENT_TOKEN}`;
console.log(accessToken);
  await cors(req, res);
  const response = await fetch(`https://graph.facebook.com/v10.0/oembed_post?url=${req.query.url}&omitscript=true&access_token=${accessToken}`);
  const json = await response.json();
  res.json(json);
}
