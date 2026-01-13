import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { persistor, store} from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ClerkProvider } from '@clerk/clerk-react';
import { ThemeProvider } from './components/theme-provider.jsx';
import { shadesOfPurple } from '@clerk/themes';
import { useUser } from '@clerk/clerk-react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { signInSuccess, signInFailure } from './redux/user/userSlice.js';

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

// UserSync Component - synchronisiert Clerk mit Redux
function UserSync({ children }) {
  const { user, isLoaded } = useUser();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (isLoaded) {
      if (user) {
        dispatch(signInSuccess({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          firstName: user.firstName,
          lastName: user.lastName,
          imageUrl: user.imageUrl
        }));
      } else {
        dispatch(signInFailure(null));
      }
    }
  }, [user, isLoaded, dispatch]);
  
  return children;
}

createRoot(document.getElementById('root')).render(
    <ClerkProvider 
        appearance={{
        baseTheme: shadesOfPurple,
        }}
        publishableKey={PUBLISHABLE_KEY}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <UserSync>
            <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
              <App />
            </ThemeProvider>
          </UserSync>
        </PersistGate>    
      </Provider>
    </ClerkProvider>,
)
