"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const distance_1 = __importDefault(require("./utils/distance"));
const postcodes = require("./postcodes.json");
const port = process.env.PORT || 4000;
const server = (0, fastify_1.default)();
server.get("/api/v1", async (req, res) => {
    res.send({ message: "Please use POST with 'latitude', 'longitude' and 'radius' in the body as numbers to return postcodes within radius" });
});
server.post("/api/v1", async (req, res) => {
    const { latitude, longitude, radius } = req.body;
    const matchingPostcodes = postcodes
        .filter((postcode) => {
        return (0, distance_1.default)(postcode.lat, postcode.lng, latitude, longitude) < radius ? true : false;
    })
        .map((postcode) => postcode.postcode);
    res.send(matchingPostcodes);
});
server.listen({ port: port }, (err, address) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
