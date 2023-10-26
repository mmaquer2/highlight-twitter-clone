'use client'
import styles from './page.module.css'
import axios from 'axios'
import { useState } from 'react'
import { login } from './api/auth.api'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Footer from './components/footer'



export default function Home() {
  axios.defaults.baseURL = "http://localhost:3001"

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const router = useRouter();

  const handleLogin = async (event:any) => {
    event.preventDefault();
    
    console.log("login button pressed!");
    console.log(username);
    console.log(password);


   if(username === '' || password === ''){
    
    //const resp = await login(username, password);
    
    //if(resp.status === 200){
      //  console.log("login successful");
      router.push('/dashboard');
    // }
   }
  }
  
  return (
    <main className={styles.main}>
        <p className={styles.text}>
            Welcome to Highlights! A Twitter Clone.
        </p>

        <form>
            <input className={styles.input} type='text' onChange={(e) => setUsername(e.target.value)} placeholder='username' />
            <input className={styles.input} type='password' onChange={(e)=>setPassword(e.target.value)} placeholder='password' />
        </form>

        <button className={styles.button} type="submit" onClick={handleLogin}>Login</button>

        <p className={styles.text}>Need an account? <Link href="/signup">Signup Here.</Link> </p>

        <Footer/>
    </main>
  )

}
