// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import IDEHeader from './IDEHeader'
import Editor from './Editor'
import IDEFooter from './IDEFooter'
import { Helmet } from 'react-helmet-async'
import { EditorConfigType } from '../../types/Editor'
import { SettingContext } from '../../context/SettingsContext'
import { Author } from '../../components/templates/Footer'
import { KungFuPandaSymbolLoader } from '../../components/loaders/SiteLoader'
import { LineWaveLoader } from '../../components/loaders/ContainerLoaders'
import { getCodeFromLocalStorage } from '../../services/LocalStorage/LocalCodeSaving'

type Props = {}

function IDE({ }: Props) {
    const { settings } = useContext(SettingContext)
    const [code, setCode] = useState<string>(getCodeFromLocalStorage() || "")
    const [isIDELoaded, setIsIDELoaded] = useState(false)
    const [editorConfigs, setEditorConfigs] = useState<EditorConfigType>({
        mode: "python",
        font: 18,
        theme: "monokai",
        tab: 4,
    })
    function setCodeValue(value: string) {
        setCode(value)
    }

    function handleThemeChangeInEditor() {
        setEditorConfigs((preValue) => {
            return {
                ...preValue,
                theme: settings.themeMode === "dark" ? "monokai" : "tomorrow"
            }
        })
    }
    useEffect(() => {
        handleThemeChangeInEditor()
    }, [settings])
    return (
        <>
            <Helmet>
                <title>Python Coding</title>
                <meta property="og:title" content="Python Coding" />
                <meta property="og:description" content="Python Data Science web based code editor for learning and practicing Python coding" />
                <meta property="og:image" content="https://e1.pxfuel.com/desktop-wallpaper/514/124/desktop-wallpaper-2048x2048-python-logo-ipad-air-backgrounds-and-python-code.jpg" />
                <meta property="og:url" content="" />
                <meta property="og:type" content="website" />
                <script defer src="https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js"></script>
            </Helmet>
            <div style={{
                maxHeight: '100vh',
                display: "grid",
                gridTemplateRows: "1fr 20fr 1fr",
                gridAutoFlow: "column",
            }}>
                <IDEHeader />
                <Editor
                    code={code}
                    setCodeValue={setCodeValue}
                    editorConfigs={editorConfigs}
                    setIsIDELoaded={setIsIDELoaded}
                />
                <IDEFooter />
            </div>
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
            <Author />
        </>
    )
}

export default IDE