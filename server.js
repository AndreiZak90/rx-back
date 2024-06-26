import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { faker } from "@faker-js/faker";
const app = express();
const port = 9000;

let folder = {
  status: "ok",
  timestamp: 1553400000,
  messages: [],
};

function addNewData() {
  const Data = new Date();
  const Year = Data.getFullYear();
  const Month = Data.getMonth();
  const Day = Data.getDate();
  const Hour = Data.getHours();
  const Minutes = Data.getMinutes();

  return ` ${Hour}:${Minutes} ${Day}-${Month + 1}-${Year}`;
}

app.use(cors());
app.use(
  bodyParser.json({
    type(req) {
      return true;
    },
  })
);
app.use((req, res, next) => {
  res.setHeader("Content-Type", "application/json");
  next();
});

app.get("/messages/unread", (req, res) => {
  const date = addNewData();
  const fakeMessage = {
    id: faker.string.uuid(),
    from: faker.internet.email(),
    subject: `Hello from ${faker.internet.userName()}`,
    body: faker.lorem.paragraphs(3),
    received: date,
  };
  folder.messages.push(fakeMessage);
  folder.timestamp = date;
  res.send(JSON.stringify(fakeMessage));
});

// GET /messages
app.get("/messages", (req, res) => {
  const date = new Date().getTime() / 1000;
  folder.timestamp = date;
  res.send(JSON.stringify(folder));
});

app.listen(port, () => {
  console.log(`Сервер запущен, порт: ${port}`);
});
