"use client"
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Header.module.css";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUserToStore,
  removeUserToStore,
  removeWeatherToStore,
} from "../reducers/user";
import Moment from "react-moment";
import { removeAllBookmark } from "../reducers/bookmarks";
import { removeAllMovies } from "../reducers/likedMovies";
import { Modal } from "antd";
import { faUser, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
export default function Header() {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user.value);
  const [date, setDate] = useState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [pwRegister, setPwRegister] = useState("");
  const [usernameConnect, setUsernameConnect] = useState("");
  const [pwConnect, setPwConnect] = useState("");
  //date
  useEffect(() => {
    setDate(new Date());
  }, []);

  //fetch for register
  const handleRegister = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!usernameRegister || !emailRegister || !pwRegister) {
      return alert("champs vides");
    }
    if (!emailRegex.test(emailRegister)) {
      return alert("email non conforme");
    }
    console.log(usernameRegister, emailRegister, pwRegister);
    fetch("https://backend-discover.vercel.app/users/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        username: usernameRegister,
        email: emailRegister,
        password: pwRegister,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        dispatch(
          addUserToStore({
            username: usernameRegister,
            email: emailRegister,
            token: data.token,
          })
        );
        setUsernameRegister("");
        setEmailRegister("");
        setPwRegister("");
        setIsModalVisible(false);
      });
  };
  //fetch for connect
  const handleConnect = async () => {
    if (!usernameConnect || !pwConnect) {
        return alert("champs vides");
    }
    
    try {
        const response = await fetch("https://backend-discover.vercel.app/users/connect", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: usernameConnect, password: pwConnect }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la requête");
        }

        const data = await response.json();

        dispatch(
            addUserToStore({
                username: usernameConnect,
                token: data.token,
            })
        );

        setUsernameConnect("");
        setPwConnect("");
        setIsModalVisible(false);
    } catch(error) {
        console.log(error);
    }
};


    
  
  const handleLogout = () => {
    dispatch(removeUserToStore());
    dispatch(removeWeatherToStore());
    dispatch(removeAllBookmark());
    dispatch(removeAllMovies());
  };
  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  let modalContent;
  if (!User.token) {
    modalContent = (
      <div className={styles.registerContainer}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => setIsModalVisible()}
          className={styles.unhideIcon}
        />
        <div className={styles.registerSection}>
          <p>Sign-up</p>
          <input
            type="text"
            placeholder="Username"
            id="signUpUsername"
            onChange={(e) => setUsernameRegister(e.target.value)}
            value={usernameRegister}
          />
          <input
            placeholder="write your email"
            onChange={(e) => setEmailRegister(e.target.value)}
            value={emailRegister}
          />
          <input
            type="password"
            placeholder="Password"
            id="signUpPassword"
            onChange={(e) => setPwRegister(e.target.value)}
            value={pwRegister}
          />
          <button id="register" onClick={() => handleRegister()}>
            {/*connect and go to discover page*/}
            <Link href="/profile">Register</Link>
          </button>
        </div>
        <div className={styles.registerSection}>
          <p>Sign-in</p>
          <input
            type="text"
            placeholder="Username"
            id="signInUsername"
            onChange={(e) => setUsernameConnect(e.target.value)}
            value={usernameConnect}
          />
          <input
            type="password"
            placeholder="Password"
            id="signInPassword"
            onChange={(e) => setPwConnect(e.target.value)}
            value={pwConnect}
          />
          <button id="connection" onClick={() => handleConnect()}>
            {/*connect and go to discover page*/}
            <Link href="/profile">Connect</Link>
          </button>
        </div>
      </div>
    );
  }

  let userSection;
  if (User.token) {
    userSection = (
      <div className={styles.logoutSection}>
        <p>Welcome {User.username} / </p>
        <button
          onClick={() => handleLogout()}
          style={{
            padding: "10px 15px",
            backgroundColor: "#086b57",
            
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          <Link href="/"><p style={{ color: "white" }}>Logout</p></Link>
        </button>
      </div>
    );
  } else {
    if (isModalVisible) {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faXmark}
          />
        </div>
      );
    } else {
      userSection = (
        <div className={styles.headerIcons}>
          <FontAwesomeIcon
            onClick={showModal}
            className={styles.userSection}
            icon={faUser}
          />
        </div>
      );
    }
  }

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Moment className={styles.date} date={date} format=" Do MMM  YYYY" />
        <h1 className={styles.title}>Discover</h1>
        {userSection}
      </div>
      {isModalVisible && (
        <div id="react-modals">
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            visible={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
    </header>
  );
}
