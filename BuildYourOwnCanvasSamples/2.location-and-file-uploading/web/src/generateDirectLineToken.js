const fetch = require("node-fetch");

// Generates a new Direct Line token given the secret.
module.exports = async function generateDirectLineToken(botId, botTenantId) {
  // You should consider using Enhanced Direct Line Authentication to protect the user ID.
  // https://blog.botframework.com/2018/09/25/enhanced-direct-line-authentication-features/
  
  // The URL host in which to generate the Direct Line token is subject to change based off of environment.
  // The host should be consistent to the host that you are building your Power VA.
  const response = await fetch(' https://a5693f94fce2e951b6b8257b9c1e97.4a.environment.api.powerplatform.com/powervirtualagents/botsbyschema/new_helper/directline/token?api-version=2022-03-01-preview' + botId + '&tenantId=' + botTenantId, {method: "GET"});
  
  const { token } = await response.json();

  return token;
};
