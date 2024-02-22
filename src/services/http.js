export {
  signUpSupabase,
  supaRequest,
  loginSupabase,
  getData,
  getFileRequest,
  fileRequest,
  updateData,
  createData
};

const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRidm9hbW10Zmdscm5yaWJwYnFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg0MjYwNjksImV4cCI6MjAyNDAwMjA2OX0.q3yDUnrKZH2LsgLMpWK8P9o41cULxgNM56xROwRf_GY';
const urlBase = 'https://dbvoammtfglrnribpbqp.supabase.co';
const headers = {
  apikey: SUPABASE_KEY,
  'Content-Type': 'application/json',
};

async function supaRequest(url, method, headers, body) {
  const response = await fetch(url, {
      method,
      headers,
      body: JSON.stringify(body),
  });

  if (response.status >= 200 && response.status <= 300) {
      if (response.headers.get('content-type')) {
          console.log("Conexión correcta");
          return await response.json();
      }
      console.log("Objeto vacio");
      return {};
  }

  console.log("Problemas con la conexión");
  return Promise.reject(await response.json());
}

async function signUpSupabase(email, password) {
  const url = `${urlBase}/auth/v1/signup`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function loginSupabase(email, password) {
  const url = `${urlBase}/auth/v1/token?grant_type=password`;
  const data = await supaRequest(url, 'post', headers, { email, password });
  return data;
}

async function getData(URI, token) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = { ...headers, Authorization: `Bearer ${token}` };
  const data = await supaRequest(url, 'get', headersAux);
  return data;
}

async function updateData(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
      ...headers,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'PATCH', headersAux, data);
  return response;
}

async function createData(URI, token, data) {
  const url = `${urlBase}/rest/v1/${URI}`;
  const headersAux = {
      ...headers,
      Authorization: `Bearer ${token}`,
      Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'post', headersAux, data);
  return response;
}

async function fileRequest(url, body, token) {
  const headersFile = {
      apiKey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "x-upsert": true,
  };
  const response = await fetch(`${urlBase}${url}`, {
      method: "POST",
      headers: headersFile,
      body,
  });

  if (response.status >= 200 && response.status <= 300) {
      if (response.headers.get("content-type")) {
          const datos = await response.json();
          datos.urlAvatar = `${urlBase}${url}`;
          return datos;
      }
      return {};
  }

  return Promise.reject(await response.json());
}

async function getFileRequest(url, token) {
  const headersFile = {
      apiKey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
  };
  const response = await fetch(`${url}`, {
      method: 'GET',
      headers: headersFile,
  });

  if (response.status >= 200 && response.status <= 300) {
      if (response.headers.get('content-type')) {
          const datos = await response.blob();
          return datos;
      }
      return {};
  }

  return Promise.reject(await response.json());
}
