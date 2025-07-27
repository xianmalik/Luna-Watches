const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function shopifyFetch(query: string, variables = {}) {
  const endpoint = `https://${domain}/api/${new Date().getFullYear()}-${new Date().getMonth() + 1}/graphql.json`;

  const res = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();
  if (json.errors) {
    throw new Error(JSON.stringify(json.errors));
  }

  return json.data;
}