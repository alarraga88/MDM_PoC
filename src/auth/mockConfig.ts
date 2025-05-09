export const mockOktaConfig = {
    authority: 'https://mock-okta.dev/realms/test',
    client_id: 'mock-client-id',
    redirect_uri: 'http://localhost:5173/callback',
    post_logout_redirect_uri: 'http://localhost:5173/',
    response_type: 'code',
    scope: 'openid profile email',
  };