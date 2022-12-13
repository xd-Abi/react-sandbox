const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN;
const backendPort = process.env.REACT_APP_BACKEND_PORT;
const reCaptchaSiteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;
const reCaptchaSecret = process.env.REACT_APP_RECAPTCHA_SECRET;

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

if (reCaptchaSiteKey === "" || reCaptchaSiteKey === undefined) {
  throw new Error(
    ".env is missing the definition of an REACT_APP_RECAPTCHA_SITE_KEY environmental variable"
  );
}

if (reCaptchaSecret === "" || reCaptchaSecret === undefined) {
  throw new Error(
    ".env is missing the definition of an REACT_APP_RECAPTCHA_SECRET environmental variable"
  );
}

export const BackendConfig = {
  domain: backendDomain,
  port: backendPort,
};

export const ReCaptchaConfig = {
  siteKey: reCaptchaSiteKey,
  secret: reCaptchaSecret,
};
