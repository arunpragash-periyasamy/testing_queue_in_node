const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

class Queue {
  constructor() {
    this.queue = [];
  }
  enqueue(item) {
    this.queue.push(item);
  }
  async dequeue() {
      return new Promise((resolve, reject) => {
          const id = this.queue.shift();
          const timer = (id % 2 === 0) ? 6001 : 6000;
      setTimeout(() => {
        resolve(id);
      }, timer);
    });
  }
  isEmpty() {
    return this.queue.length === 0;
  }
}

const queue = new Queue();
const order = new Queue();

const processData = async () => {
    const id = await queue.dequeue();
    order.dequeue(id);
    return;
};

const delay = async (id) => {
  if (!queue.isEmpty()) {
    queue.enqueue(id);
      await processData();
  } else {
    queue.enqueue(id);
  }
};

app.post("/", async (req, res) => {
  const { uname, id } = req.body;
    await delay(id);
    console.log(`${id} processed`);
    return res.status(200).json({
      status: 200,
      message: "Success",
      data: {
        uname: uname,
        id: id,
      },
    });
});

app.listen(3000, () => console.log("Example app listening on port 3000!"));

