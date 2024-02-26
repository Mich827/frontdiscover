import { useState, useEffect } from "react";
//import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
//import jwtDecode from "jwt-decode";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";

//const clientId =
//"492308766796-4rukpcc44v9mhjrtk98ibj9eoan212qa.apps.googleusercontent.com";

function Home() {
  const User = useSelector((state) => state.user.value);
  //const [user, setUser] = useState(null);
  const router = useRouter();
  //const handleLogin = (credentialResponse) => {
  //setUser(jwtDecode(credentialResponse.credential));
  // };

  useEffect(() => {
    if (User.token) {
      router.replace("/profile");
    }
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Welcome</h1>
        <p>Last cinema movies ,</p>
        <p>Lastest tech articles,</p>
        <p>Instant Weather,</p>
        <p>If You Want To Know More </p>
        <p>register or connect....</p>
        <FontAwesomeIcon className={styles.userSection} icon={faUser} />
      </div>
    </div>

    /*<GoogleOAuthProvider clientId={clientId}>
      <div className={styles.container}>
        {user ? (
          <div className={styles.content}>
            <h1>Welcome {user.name}!</h1>
            <div className={styles.divider}></div>
            <p>Email: {user.email}</p>

            <Link style={styles.link} href="/profile">
              <a style={{ textDecoration: "none", color: "green" }}>
                Go to discover
              </a>
            </Link>
          </div>
        ) : (
          <div className={styles.content}>
            <h1>Welcome</h1>
            <p>If You Want To Know More </p>
            <p>register or connect....</p>
            <FontAwesomeIcon className={styles.userSection} icon={faUser} />

            <div className={styles.divider}></div>
            <GoogleLogin
              onSuccess={(credentialResponse) =>
                handleLogin(credentialResponse)
              }
              onError={(error) => console.error(error)}
            />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>*/
  );
}

export default Home;
