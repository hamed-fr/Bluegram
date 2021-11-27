import {Route , Switch} from 'react-router-dom'
import Login from './components/Login';
import AuthContextProvider from './components/context/AuthContextProvider';
import Chats from './components/Chats';

function App() {
  return (
    <div>
      <AuthContextProvider>
      <Switch>
      <Route path="/chats" component={Chats}/>
      <Route path="/" component={Login}/>
      </Switch>
      </AuthContextProvider>
    </div>
  );
}


export default App;
