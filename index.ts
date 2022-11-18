import fastify from "fastify";
import distance from "./utils/distance";
const postcodes = require("./postcodes.json");
const port = process.env.PORT as any || 4000;

const server = fastify();

interface PostcodeData {
  lat: number;
  lng: number;
  postcode: string;
}

interface BodyData {
  latitude: number;
  longitude: number;
  radius: number;
}

server.get("/api/v1", async (req, res) => {
    res.send({ message: "Please use POST with 'latitude', 'longitude' and 'radius' in the body as numbers to return postcodes within radius" });
})

server.post("/api/v1", async (req, res) => {
  const { latitude, longitude, radius } = req.body as BodyData;
  const matchingPostcodes = postcodes
    .filter((postcode: PostcodeData) => {
      return distance(postcode.lat, postcode.lng, latitude, longitude) < radius ? true : false;
    })
    .map((postcode: PostcodeData) => postcode.postcode);
  res.send(matchingPostcodes);
});

server.listen({ port: port }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
