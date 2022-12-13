const backendDomain = process.env.REACT_APP_BACKEND_PORT;
const backendPort = process.env.REACT_APP_BACKEND_PORT;

if (backendDomain === "" || backendDomain === undefined) {
  throw new Error(
    ".env is missing the definition of an REACT_APP_BACKEND_DOMAIN environmental variable"
  );
}

if (backendPort === "" || backendPort === undefined) {
  throw new Error(
    ".env is missing the definition of an REACT_APP_BACKEND_PORT environmental variable"
  );
}

export const BackendConfig = {
  domain: backendDomain,
  port: backendPort,
};
