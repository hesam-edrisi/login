import { ReactNode, useEffect } from "react";
import { Getuser } from "../services/auth/user";

const UserProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    if (localStorage.getItem("token")) {
      Getuser()
        .then((res) => {
          // etelaat user ke az response migiram ba estefade az state management save konam ke behesh acces dashte basham va azash estefade konam
          console.log(res.data);
        })
        .catch((e) => {
          // to do if i get get 403 or 401 delete the local storage and the key that contains token!
        })
        .finally(() => {
          // here i shoud disable the loader for getting the user
        });
    } else {
      // send user to login
      // disable the loading
      // delete the data of user
    }
  }, []);

  return <>{children}</>;
};

export default UserProvider;
