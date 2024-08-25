let token = null;
let tokenExpiry = 0;
let refreshToken = "2c7ab880b5e74a7041fffb23eb07a15e7df79202";

const getToken = async () => {
  const response = await fetch("https://oauth2.cex.es.webuy.io/token", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "es-ES,es;q=0.9,ca;q=0.8,en;q=0.7",
    "content-type": "application/x-www-form-urlencoded",
    "priority": "u=1, i",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site"
  },
  "referrer": "https://es.webuy.com/user/account?tab=sales&page=1&slotName=activo",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": "client_id=cexweb&client_secret=18733fb8b6aa2bcbf17a2d0eba7483e6&grant_type=refresh_token&refresh_token=" + refreshToken,
  "method": "POST",
  "mode": "cors",
  "credentials": "omit"
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  const data = await response.json();
  token = data.access_token;
  console.log(token);
  refreshToken = data.refresh_token;
  tokenExpiry = Date.now() + 30000; // Token expiry set to 30 seconds from now
};

const getElements = async () => {
  if (!token || Date.now() >= tokenExpiry) {
    await getToken();
  }

  const response = await fetch("https://wss2.cex.es.webuy.io/v3/members/95982/favouriteboxes?accessToken=" + token.toString() + "&firstRecord=1&count=6&sortBy=favouriteBoxAddedTime&sortOrder=desc", {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "sec-ch-ua": "\"Chromium\";v=\"128\", \"Not;A=Brand\";v=\"24\", \"Google Chrome\";v=\"128\"",
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"Windows\""
  },
  "referrer": "https://es.webuy.com/user/account?tab=favourites&page=1&sortBy=most-recent",
  "referrerPolicy": "no-referrer-when-downgrade",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "omit"
  });
  
  console.log(response);
  const data = await response.json();
  console.log(data);

  if (!response.ok) {
    throw new Error("Failed to fetch elements");
  }

  /*const data = await response.json();
  console.log(data);*/
  return data;
};

// Usage
getElements().then(elements => {
  console.log(elements);
}).catch(error => {
  console.error(error);
});
