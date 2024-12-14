import { createRoot } from 'react-dom/client' 
import App from './App.tsx' 
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
     <GoogleOAuthProvider clientId="1082128291118-32scaqkih8iu24lt5om5m4jr9mphe6c2.apps.googleusercontent.com">
            <App /> 
     </GoogleOAuthProvider>
     
  )
