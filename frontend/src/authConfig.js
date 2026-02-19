export const msalConfig = {
    auth: {
        clientId: "cd476c66-194e-4240-a7c9-9099b9bae5b9",
        authority: "https://login.microsoftonline.com/09bd1956-edda-4e9a-9543-7c7aa2cf4e81",
        redirectUri: window.location.origin, // Auto-detects: localhost:5173 or scraper-project-nu.vercel.app
    },
    cache: {
        cacheLocation: "sessionStorage", // This configures where your cache will be stored
        storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
};

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
export const loginRequest = {
    scopes: ["User.Read"],
};

// Add the endpoints here for Microsoft Graph API services you'd like to use.
export const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};
