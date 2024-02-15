//@ts-nocheck
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import NotebookHeader from './NotebookHeader'
import { Author } from '../../components/templates/Footer'
import JupyterNotebook from './JupyterNotebook'
import { KungFuPandaSymbolLoader } from '../../components/loaders/SiteLoader'
import { LineWaveLoader } from '../../components/loaders/ContainerLoaders'

type Props = {}

function Notebook({ }: Props) {
  const [isIDELoaded, setIsIDELoaded] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsIDELoaded(true)
    }, 8000)
    window.onload = () => {
      console.log("window loaded");
    }
  }, [])

  return (
    <>
      <Helmet>
        <title>Python Coding</title>
        <meta property="og:title" content="Python Coding" />
        <meta property="og:description" content="Python Data Science web based code editor for learning and practicing Python coding" />
        <meta property="og:image" content="https://blog.logrocket.com/wp-content/uploads/2021/12/python-datetime-module.png" />
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <script defer src="https://pyscript.net/latest/pyscript.js" type='text/javascript'></script>
      </Helmet>
      <div style={{
        maxHeight: '100vh',
        display: "grid",
        gridTemplateRows: "1fr 20fr 1fr",
        gridAutoFlow: "column",
      }}>
        <NotebookHeader />
        <JupyterNotebook 
          isIDELoaded={isIDELoaded}
        />
      </div>
      <Author />
      {
        !isIDELoaded &&
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          width: "100%"
        }}>
          <KungFuPandaSymbolLoader />
          <LineWaveLoader />
          <div>Loading python....</div>
        </div>

      }


    </>
  )
}

export default Notebook