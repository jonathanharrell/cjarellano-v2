export default async function handler(req, res) {
  const response = await fetch(`https://publish.twitter.com/oembed?url=${req.query.url}&omit_script=true&theme=dark`);
  const json = await response.json();

  res.json(json);
}
