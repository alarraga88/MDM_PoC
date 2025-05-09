// auth/AuthService.ts
import { User, UserManager, WebStorageStateStore } from 'oidc-client-ts';
import { mockOktaConfig } from './mockConfig';

const userManager = new UserManager({
  ...mockOktaConfig,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
});

//helper to simulate login
export const createMockUser = async (username: string, role: 'admin' | 'viewer') => {
  const now = Math.floor(Date.now() / 1000);
  const expiresIn = 3600;

  const mockUser = new User({
    id_token: 'mock-id-token',
    access_token: 'mock-access-token',
    token_type: 'Bearer',
    scope: 'openid profile email',
    expires_at: now + expiresIn,
    profile: {
      name: username,
      email: `${username}@mock.com`,
      sub: `mock-${username}`,
      role, // permission checks future
      iss: mockOktaConfig.authority,
      aud: mockOktaConfig.client_id,
      exp: now + expiresIn,
      iat: now,
    },
  });

  await userManager.storeUser(mockUser);
};

export const logoutUser = async () => {
  await userManager.removeUser();
};

export default userManager;
