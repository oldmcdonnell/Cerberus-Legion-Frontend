import axios from 'axios';
import { AuthAction } from './reducer/reducer';  // Assuming AuthAction is defined with the necessary action types

const baseUrl = import.meta.env.VITE_BASE_URL;

// Define types for the function parameters
interface GetTokenParams {
  dispatch: React.Dispatch<AuthAction>;
  username: string;
  password: string;
}

export const getToken = async ({ dispatch, username, password }: GetTokenParams): Promise<string | null> => {
  try {
    const response = await axios.post(`${baseUrl}/token/`, {
      username: username,
      password: password,
    });

    console.log('Token Response: ', response);
    
    const accessToken = response.data.access;

    // Dispatch the token to the state
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: accessToken,
    });

    return accessToken;  // Return the token
  } catch (error) {
    console.log('Error with getToken API call: ', error);

    // Dispatch an empty token on error
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: '',  // Set to empty string or null, depending on your handling
    });

    return null;  // Return null when there's an error
  }
};

// Define types for the fetchUser function parameters
interface FetchUserParams {
  dispatch: React.Dispatch<AuthAction>;
  accessToken: string;
}

export const fetchUser = async ({ dispatch, accessToken }: FetchUserParams): Promise<any> => {
  try {
    const response = await axios({
      method: 'get',
      url: `${baseUrl}/profile/`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log('PROFILE: ', response);

    // Dispatch the profile data to the state
    dispatch({
      type: 'SET_PROFILE',
      payload: response.data,  // Use `payload` for consistency with other actions
    });

    return response.data;  // Return the profile data
  } catch (error) {
    console.log('Error with fetchUser API call: ', error);

    // Handle the error by removing the access token or other actions as needed
    dispatch({
      type: 'SET_ACCESS_TOKEN',
      payload: '',  // Clear the access token if there's an error
    });

    return null;  // Return null on error
  }
};
