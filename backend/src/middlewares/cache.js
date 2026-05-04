const { client } = require("../config/redis");

const cacheMiddleware = async (req, res, next) => {
  try {
    if (!client.isOpen) {
      return next();
    }

    const key = req.originalUrl;

    const cachedData = await client.get(key);

    if (cachedData) {
      return res.status(200).json(JSON.parse(cachedData));
    }

    const originalJson = res.json.bind(res);

    res.json = (body) => {
      client.setEx(key, 60, JSON.stringify(body)).catch(() => {});
      return originalJson(body);
    };

    next();
  } catch (error) {
    next();
  }
};

module.exports = cacheMiddleware;