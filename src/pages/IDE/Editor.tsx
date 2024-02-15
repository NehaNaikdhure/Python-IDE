// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react'
import AceEditor from "react-ace";
import "ace-builds/webpack-resolver";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-tomorrow";
import "ace-builds/src-noconflict/ext-language_tools";


import { toast } from 'react-toastify';
import { SettingContext } from '../../context/SettingsContext';
import { EditorConfigType } from '../../types/Editor';
import { Button, Stack, TextField, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HexagonIcon from '@mui/icons-material/Hexagon';
import RunUsingSkulpt from '../../services/Skulpt-Solution';
import Pydroid from '../../services/PyScript-Solution/Pydroid';
import SpinnerLoader from '../../components/loaders';
import { saveCodeToLocalStorage } from '../../services/LocalStorage/LocalCodeSaving';
const pyodide = new Pydroid()
type Props = {
    code: string,
    setCodeValue: (value: string) => void,
    editorConfigs: EditorConfigType,
    setIsIDELoaded: (value: boolean) => void
}



function Editor({ code, setCodeValue, editorConfigs, setIsIDELoaded }: Props) {
    const [isLoading, setIsLoading] = useState(false)
    const { settings } = useContext(SettingContext)
    async function usePyodide() {
        setIsLoading(true)
        try {
            await pyodide.RunUsingPyodide(code as string)
            pyodide.handlePlots(
                "plotting_output"
            )
            toast.success("Code executed successfully")
        } catch (error) {
            console.log(error);
            document.getElementById('outputContainer').innerText = error.message
        }
        setIsLoading(false)
    }
    function executeCode() {
        setIsLoading(true)
        saveCodeToLocalStorage(code as string)
        document.getElementById("plotting_output").innerHTML = ""
        RunUsingSkulpt(code as string, "outputContainer", "skulpt_canvas_output", "inputButton", "inputValue", "inputContainer", "inputMessage", "mainOutputContainer", usePyodide)
        setIsLoading(false)

    }
    useEffect(() => {
        setTimeout(() => {
            (async function () {
                setIsIDELoaded(false)
                await pyodide.initializePydroid(
                    "outputContainer",
                    "inputValue",
                    "inputButton",
                    "inputContainer",
                    "inputMessage",
                    "mainOutputContainer",
                )
                setIsIDELoaded(true)
            }
            )()
        }, 5000)
    }, [])
    return (
        <div
            style={{
                display: settings.screen === "mobile" ? 'flex' : 'grid',
                gridTemplateColumns: '1fr 1fr',
                flexDirection: "column"
            }}
        >
            <AceEditor
                placeholder=".....start coding here"
                mode={editorConfigs.mode}
                theme={editorConfigs.theme}
                name="PythonIDE"
                onChange={setCodeValue}
                fontSize={editorConfigs.font}
                highlightActiveLine={true}
                showPrintMargin={false}
                value={code}
                setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: editorConfigs.tab,
                }}
                style={{
                    width: '100%',
                    border: "1px solid gray",
                    height: settings.screen === "mobile" ? "70vh" : "auto"
                }}
            />
            <div style={{
                border: "1px solid gray",
                position: "relative",
                height: settings.screen === "mobile" ? "90vh" : "auto"
            }}>
                <Stack spacing={2} borderBottom={"1px solid gray"} direction={'row'}>
                    <Button onClick={() => {
                        !isLoading && executeCode()
                    }}>
                        {
                            isLoading ?
                                <SpinnerLoader /> :
                                <PlayArrowIcon sx={{
                                    fontSize: 40,
                                    color: "lime"
                                }} />
                        }
                    </Button>
                </Stack>
                <Typography component={'div'} id='mainOutputContainer' sx={{
                    display: "flex",
                    margin: "10px 0px",
                    flexDirection: "column",
                    position: "relative",
                    justifyContent: "space-between",
                    padding: "10px",
                    overflow: "auto",
                    maxHeight: "80vh",
                    width: "100%",
                    height: "100%",
                }}>
                    {
                        code.search("turtle") !== -1 && <div id="skulpt_canvas_output" ></div>
                    }
                    <pre id="outputContainer" style={{
                        height: "100%",
                        maxHeight: "100%",
                        whiteSpace: "pre-wrap",
                        fontSize: "0.8rem",
                    }}>
                    </pre>
                    <div id="plotting_output"> </div>
                    <div id='inputContainer' style={{ display: "none" }}>
                        <pre id='inputMessage' style={{
                            whiteSpace: "pre-wrap",
                            fontSize: "0.8rem",
                        }}>
                        </pre>
                        <form onSubmit={(event) => {
                            event.preventDefault()
                            document.getElementById('inputButton')?.click()
                        }}>
                            <TextField placeholder='Enter Input' id='inputValue' variant='standard' fullWidth sx={{
                                padding: "2px 10px"
                            }} />
                            <button type='submit' style={{ display: "none" }} id='inputButton'></button>
                        </form>
                    </div>
                </Typography>
                <Typography component={'div'}>

                </Typography>
            </div>
        </div>
    )
}

export default Editor