import fastify from "fastify";
import cors from "@fastify/cors";
import distance from "./utils/distance";
const postcodes = require("./postcodes.json");
const port = (process.env.PORT as any) || 4000;

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

server.register(cors);

server.get("/", async (req, res) => {
  res.send({
    message: "Please use GET to /api/v1/postcodes/{latitude}/{longitude}/{radius} to return postcodes within radius",
  });
});

server.get("/api/v1/postcodes/:latitude/:longitude/:radius", async (req, res) => {
  const { latitude, longitude, radius } = req.params as BodyData;
  const matchingPostcodes = postcodes
    .filter((postcode: PostcodeData) => {
      return distance(postcode.lat, postcode.lng, latitude, longitude) < radius ? true : false;
    })
    .map((postcode: PostcodeData) => postcode.postcode);
  res.send(matchingPostcodes);
});

server.listen({ port: port, host: "0.0.0.0" }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
