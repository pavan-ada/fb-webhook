import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
router.get("/", (req, res) => res.send("Reached webhook endpoint!"));
router.get("/hello", (req, res) => res.send("Hello World!"));
router.get('/webhook', function(req, res) {
    if (
        req.query['hub.mode'] == 'subscribe') {
        res.send(req.query['hub.challenge']);
    } else {
        res.sendStatus(400);
    }
});

router.post("/webhook", function(req, res) {
    console.log('Incoming webhook: ' + JSON.stringify(req.body));
    res.sendStatus(200);
});

api.use("/api/", router);

export const handler = serverless(api);