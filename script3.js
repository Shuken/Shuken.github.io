let token = null;
let tokenExpiry = 0;

const getToken = async () => {
  const response = await fetch("https://oauth2.cex.es.webuy.io/token", {
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "es-ES,es;q=0.9,ca;q=0.8,en;q=0.7",
      "content-type": "application/x-www-form-urlencoded",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
	  "access-control-allow-origin" : "*"
    },
    referrer: "https://es.webuy.com/user/account?tab=sales&page=1&slotName=activo",
    referrerPolicy: "no-referrer-when-downgrade",
    body: "client_id=cexweb&client_secret=18733fb8b6aa2bcbf17a2d0eba7483e6&grant_type=refresh_token&refresh_token=96b99c25f7a9335df001281a41866e85fef151bb",
    method: "POST",
    mode: "cors",
    credentials: "omit"
  });
  
  if (!response.ok) {
    throw new Error("Failed to fetch token");
  }

  const data = await response.json();
  token = data.access_token;
  tokenExpiry = Date.now() + 30000; // Token expiry set to 30 seconds from now
};

const getElements = async () => {
  /*if (!token || Date.now() >= tokenExpiry) {
    await getToken();
  }*/
  
  token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpZCI6IjQ1YmUzZDc4OGU2OTgyNzUzYjU0MWQ5Y2IyYjVhZWI3NTA5MzFlMjQiLCJqdGkiOiI0NWJlM2Q3ODhlNjk4Mjc1M2I1NDFkOWNiMmI1YWViNzUwOTMxZTI0IiwiaXNzIjoiIiwiYXVkIjoiY2V4d2ViIiwic3ViIjoiY2V4LWVzLTk1OTgyIiwiZXhwIjoxNzI0NDE1MzgwLCJpYXQiOjE3MjQ0MTUzNTAsInRva2VuX3R5cGUiOiJiZWFyZXIiLCJzY29wZSI6bnVsbH0.IDLT2PcmQUmKY4Bswq_T60XX0L1xulvybtqb1vDkYzjzsGdhja895Lo7krciwWWPJAOBuAX4gzQDHLats0PzuYurdKYKzbQ4iryfjIArd6XUEG6qkfDXpqBMPUiV5EvBJobh2KllCBpYeoI2ijtqcXPaRz_Wy1A_3ivWJVTlVdz4YlNy9cWfNROZBE1jOJWtYodmfQfiW8CQ0nNRo9GuGGs509B9T6J_BiMM_d6Qz3hryo439pzhW0uOT8ZiN4uQT5YCkcVhMkLjl_ggaXnYgQJ_vMiKoH8fKhKtLjMGnHauk3Zu8DFVkDV9sVpYwGdKTMDaJjetKc1hrKjx3_7MlA"

  const response = await fetch("https://wss2.cex.es.webuy.io/v3/members/408026/favouriteboxes?accessToken=${token}&firstRecord=1&count=6&sortBy=favouriteBoxAddedTime&sortOrder=desc", {
    headers: {
      "accept": "application/json, text/plain, */*",
      "accept-language": "es-ES,es;q=0.9,ca;q=0.8,en;q=0.7",
      "priority": "u=1, i",
      "sec-ch-ua": "\"Not/A)Brand\";v=\"8\", \"Chromium\";v=\"126\", \"Google Chrome\";v=\"126\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
	  "access-control-allow-origin" : "*"
    },
    referrer: "https://es.webuy.com/user/account?tab=favourites&page=1&sortBy=most-recent",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "GET",
    mode: "cors",
    credentials: "omit"
  });

  if (!response.ok) {
    throw new Error("Failed to fetch elements");
  }

  const data = await response.json();
  return data;
};

// Usage
getElements().then(elements => {
  console.log(elements);
}).catch(error => {
  console.error(error);
});
