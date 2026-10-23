// Pin the timezone so date formatting assertions are deterministic.
module.exports = () => {
  process.env.TZ = "UTC";
};
