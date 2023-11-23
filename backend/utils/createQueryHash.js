const crypto = require("crypto");

const createQueryHash = (queryObj) => {
  const sortedEntries = Object.entries(queryObj)
    .filter(([, value]) => value != null) // Remove any null/undefined entries
    .map(([key, value]) => {
      // Ensure array values are sorted
      const val = Array.isArray(value) ? value.sort().join(",") : value;
      return `${key}=${val}`;
    })
    .sort(); // Sort alphabetically

  const queryString = sortedEntries.join("&");

  return crypto.createHash("md5").update(queryString).digest("hex");
};

module.exports = createQueryHash;
