import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Images from './component/Images'
import Header from './component/header'
import Card from './component/Card'
import Paragraph from './component/Paragraph'

function App() {
    const [count, setCount] = useState(0);

  return (
    <>
      <Images />
      <Header />
     <Card count={count} setCount={setCount} />
      <Paragraph/>
    </>
  )
}

export default App
