import express, { Request, Response } from "express";


const app = express();

app.get("/api/");

app.post("/api/", (req: Request, res: Response) => {
    if (!req.headers.authorization) res.status(401);
});

app.listen(process.env.PORT || 3000, () => {
    console.log(
        `Server active on http://localhost:${process.env.PORT || 3000}`
    );
});
export {};
