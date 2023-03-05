import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './global.css'
import styles from './App.module.css';
import { Header } from './components/Header'
import { Todo } from './components/Todo';

export function App() {
  return (
    <>
      <Header />
      <div className={styles.wrapper}>
        <Todo />
      </div>
    </>
      
  )
}

