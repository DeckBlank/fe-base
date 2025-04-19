import { CLIENT_ID, REDIRECT_URI } from '../../../config/environments';

export const msalConfig = {
  auth: {
    clientId: CLIENT_ID,
    authority: `https://login.microsoftonline.com/common`,//`https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/authorize`,
    redirectUri: REDIRECT_URI + '/',
  },
  cache: {
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};

export const graphConfig = {
  graphMeEndpoint: 'https://graph.microsoft.com/v1.0/me', //e.g. https://graph.microsoft.com/v1.0/me
  graphPhotoEndpoint: 'https://graph.microsoft.com/v1.0/me/photo/$value',
  graphMeEndpointProfile: 'https://graph.microsoft.com/beta/me/profile',
};

export const getAccessToken = async (instance: any, accounts: any) => {
  return await instance.acquireTokenSilent({
    ...loginRequest,
    account: accounts[0],
  });
};

export const fetchProfileImage = async (accessToken: string) => {
  try {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append('Authorization', bearer);

    const options = {
      method: 'GET',
      headers: headers,
      responseType: 'blob',
    };
    const response = await fetch(graphConfig.graphPhotoEndpoint, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const blob = await response.blob();
    const imageURL = URL.createObjectURL(blob);
    return imageURL;
  } catch (error: any) {
    console.error('Error obteniendo avatar: ', error.message);
  }

  return sessionStorage.getItem('userImage') || '';
};

export const handleLogout = (instance: any) => {
  localStorage.clear();
  sessionStorage.clear();
  instance.logoutPopup({
    postLogoutRedirectUri: '/',
    mainWindowRedirectUri: '/',
  });
  window.location.href= '/';
};