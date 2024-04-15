// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
export default async function handler(req, res) {
  try {
    // setLoading(true);
    const response = await axios.get(
      `${process.env.COIN_MARKET_CAP}?symbol=` + req.query.symbols,
      {
        headers: {
          "X-CMC_PRO_API_KEY": "c2565382-a85c-413d-bea1-8d08b9f9292d",
        },
      }
    );
    res.status(200).json(response.data.data);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
