const { CosmosClient } = require("@azure/cosmos");

const endpoint = "https://visitor-count-azure-resume.documents.azure.com:443/";
const key = "9kQmgGOyKOUF7Mcdy964ZV0BTVN3IPTVmVrxc91eqBNgqyvk2pLz1M45pyYAlnfLQZMv0P2D6VhcACDbx7pnJA==";
const databaseId = "VisitorCount";
const containerId = "VisitorCount";

const client = new CosmosClient({ endpoint, key });
const container = client.database(databaseId).container(containerId);

module.exports = async function (context, req) {
  try {
    context.log("Function is running...");

    const { resource: document } = await container.item("VisitorCount").read();
    const currentCount = document.count || 0;

    // Increment the visitor count
    document.count = currentCount + 1;
    await container.item("VisitorCount").replace(document);

    context.log("Visitor count updated:", document.count);

    context.res = {
      status: 200,
      body: { count: document.count },
    };
  } catch (error) {
    context.log.error("Error:", error);
    context.res = {
      status: 500,
      body: "Internal server error",
    };
  }
};
