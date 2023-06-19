const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvents = async (message: string, logFileName: string) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req: any, res: any, next: any) => {
  const startTime = new Date().getTime();
  const logRequest = () => {
    const duration = new Date().getTime() - startTime;
    logEvents(
      `${req.method}\t${req.url}\t${req.headers.origin}\t${duration}ms`,
      "reqLog.log"
    );
    console.log(
      `${req.method} ${req.url} ${"\x1b[32m"}${duration}ms${"\x1b[0m"}`
    );
  };

  res.on("finish", logRequest);
  res.on("close", logRequest);

  next();
};

export { logEvents, logger };
