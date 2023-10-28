"use client";
import { useState } from "react";
import { register } from "@/app/api/auth.api";
import styles from "../app/signups.module.css";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("submitting form...");
    createNewUser();
  };

  const createNewUser = async () => {
    await register(username, email, password);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Signup to Highlights!</h1>
      <form className={styles.form}>
        <input
          className={styles.input}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          type="text"
          placeholder="Username"
        />
        <input
          className={styles.input}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email Address"
        />
        <input
          className={styles.input}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
      </form>
      <button className={styles.button} onClick={handleSubmit} type="submit">
        Create Account
      </button>
    </div>
  );
}
