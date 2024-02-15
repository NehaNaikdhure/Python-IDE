// @ts-nocheck
import { toast } from "react-toastify";
function displayOutput(text: string, outputId: string) {
    let outputContainer = document.getElementById(outputId) as HTMLElement;
    outputContainer.innerText = outputContainer.innerText + text;
}
function builtinRead(x: any) {
    if ((Sk as any).builtinFiles === undefined || (Sk as any).builtinFiles["files"][x] === undefined)
        throw "File not found: '" + x + "'";
    return (Sk as any).builtinFiles["files"][x];
}

function RunUsingSkulpt(code: string, outputId: string, canvasId: string, inputButtonId: string, inputId: string, inputContainerId: string, inputMessageId: string, mainOutputContainerId: string, moduleResolver) {
    let outputContainer = document.getElementById(outputId) as HTMLElement;
    outputContainer.innerHTML = '';
    (Sk as any).pre = outputId;
    (Sk as any).configure({
        inputfun: function (prompt: any) {
            document.getElementById(inputMessageId).innerText = prompt;
            document.getElementById(inputContainerId).style.display = "block";
            document.getElementById(mainOutputContainerId).scrollTop = document.getElementById(mainOutputContainerId).scrollHeight;
            return new Promise((resolve, reject) => {
                document.getElementById(inputButtonId).onclick = function () {
                    const input = document.getElementById(inputId).value;
                    resolve(input);
                    document.getElementById(inputId).value = "";
                    document.getElementById(inputContainerId).style.display = "none";
                };
            });
        },
        inputfunTakesPrompt: true,
        output: (text) => {
            displayOutput(text, outputId)
            document.getElementById(mainOutputContainerId).scrollTop = document.getElementById(mainOutputContainerId).scrollHeight;
        },
        read: builtinRead
    });
    ((Sk as any).TurtleGraphics || ((Sk as any).TurtleGraphics = {})).target = canvasId;
    let myPromise = (Sk as any).misceval.asyncToPromise(function () {
        (Sk as any).TurtleGraphics.width = 800;
        (Sk as any).TurtleGraphics.height = 1000;
        return (Sk as any).importMainWithBody("<stdin>", false, code, true);
    });
    myPromise.then(
        function (mod: any) {
            console.log(mod);
            toast.success("Code executed successfully")
        },
        function (err: any) {
            const errorMessage= err.toString();
            if (errorMessage.search("ImportError: No module named") !== -1) {
                moduleResolver();
            }else{
                outputContainer.innerHTML = err.toString();
                toast.error("Some Error occurred while executing code")
            }
        }
    );
}

export default RunUsingSkulpt;