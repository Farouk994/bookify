import { Account, Avatars, Client, OAuthProvider } from 'react-native-appwrite';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { URL } from 'react-native-url-polyfill';

export const config = {
  platform: 'com.app.bookify',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const account = new Account(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Create OAuth2 token failed");
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    console.log('Browser Result URL:', browserResult);

    if (browserResult.type !== 'success') throw new Error('Failed to login');
    const url = new URL(browserResult.url);
    // console.log(url, '=========> url'); // pass
    const secret = url.searchParams.get('secret')?.toString();
    console.log('Secret:', secret);
    // console.log(secret, '=========> secret')
    const userId = url.searchParams.get('userId')?.toString();
    console.log('User ID:', userId);
    if (!secret || !userId) throw new Error('Failed to login, missing data');
    const session = await account.createSession(userId, secret);
    if (!session) throw new Error('Failed to login, session not created');

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function logout() {
  try {
    await account.deleteSession('current');
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      const userAvatar = await avatar.getInitials(response.$id);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
