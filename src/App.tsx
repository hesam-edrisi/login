import React from "react";
import Login from "./components/Login";
import UserProvider from "./providers/UserProvider";

const App: React.FC = () => {
  return (
    <UserProvider>
      <div>
        <Login />
      </div>
    </UserProvider>
  );
};

export default App;
