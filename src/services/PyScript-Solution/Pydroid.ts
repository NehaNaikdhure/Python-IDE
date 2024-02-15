//@ts-nocheck
import { toast } from "react-toastify";

class Pydroid {
    async initializePydroid(outputId: string, inputId: string, inputButtonId: string, inputContainerId: string, inputMessageId: string, mainOutputContainerId: string) {        
        let pyodide = await loadPyodide({
            stdout: (text: any) => {
                let outputContainer = document.getElementById(outputId) as HTMLElement;
                outputContainer.innerText = outputContainer.innerText + text + "\n";
            },
            stderr: (text: any) => {
                let outputContainer = document.getElementById(outputId) as HTMLElement;
                outputContainer.innerText = outputContainer.innerText + text + "\n";
                toast.error("Error occurred while execution of code")
            },
            stdin: function (prompt: any) {
                console.log(prompt);
                document.getElementById(inputContainerId).style.display = "block";
                document.getElementById(inputMessageId).innerText = prompt;
                document.getElementById(mainOutputContainerId).scrollTop = document.getElementById(mainOutputContainerId).scrollHeight;
                toast.warn("Please provide input"+prompt)
                return new Promise((resolve, reject) => {
                    document.getElementById(inputButtonId).onclick = function () {
                        const input = document.getElementById(inputId).value;
                        resolve(input);
                        document.getElementById(inputId).value = "";
                        document.getElementById(inputContainerId).style.display = "none";
                    };
                });
            },
        });
        await pyodide.loadPackage("requests");
        await pyodide.loadPackage("numpy");
        await pyodide.loadPackage("pandas");
        await pyodide.loadPackage("matplotlib");
        await pyodide.loadPackage("scipy");
        await pyodide.loadPackage("scikit-learn");
        await pyodide.loadPackage("statsmodels");
        this.pyodide = pyodide
        return pyodide
    }

    getPyodide() {
        return this.pyodide
    }
    async RunUsingPyodide(code: string, outputId: string) {
        let result = await this.pyodide.runPythonAsync(code);
        console.log(result);
        return result
    }
    handlePlots(plotting_outputId: string) {
        let matplotlibPlots = document.querySelectorAll("[id^=matplotlib_]");
        for (let i = 0; i < matplotlibPlots.length; i++) {
            const element = matplotlibPlots[i];
            if (element.id.endsWith("rubberband")) {
                element.classList.add("plot_canvas_handler")
            }
            if (
                !element.id.endsWith("top") ||
                !element.id.endsWith("canvas") ||
                !element.id.endsWith("rubberband") ||
                !element.id.endsWith("message")
            ) {
                document.getElementById(plotting_outputId).appendChild(element);
            }

        }
    }
}

export default Pydroid