//@ts-nocheck
import React from 'react'
import { getCodeFromLocalStorage } from '../../services/LocalStorage/LocalCodeSaving'
type Props = {
    isIDELoaded: boolean
}

function JupyterNotebook({ isIDELoaded }: Props) {
    return (
        <>
            <div style={{
                width: '100%',
            }}>
                {
                    isIDELoaded && <div style={{ margin: "0.5rem", marginTop: "20px" }}>
                        <py-repl id="my-repl" auto-generate="true">{
                            getCodeFromLocalStorage() || ""
                        } </py-repl>

                    </div>
                }
            </div>
        </>
    )
}

export default JupyterNotebook