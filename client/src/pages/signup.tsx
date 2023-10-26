'use client'
import styles from '../app/signups.module.css';

export default function Signup() {
    
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Signup to Highlights!</h1>
            <form className={styles.form}>
                <input className={styles.input} type='text' placeholder='Username' />
                <input className={styles.input} type='email' placeholder='Email Address' />
                <input className={styles.input} type='password' placeholder='Password' />
            </form>
            <button className={styles.button} type="submit">Create Account</button>
        </div>
    )
}