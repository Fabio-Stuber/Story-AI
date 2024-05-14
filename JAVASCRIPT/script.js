/* VARIABLEN */
/* Vordefinierte Variabeln & ändernde Variabeln */
let Title = "";
let Genre = "";
let Time = "";
let Language = "";
let Style = "";
let emotions = "";

/* AUTHORIZATION */
/* Autorisiert CHAT-GPT & DALL-E */
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

/* RUN */
/* Ausführung von Generieren */
function run() {
    document.getElementById('Output-Text').style.display = 'none';
    document.getElementById('Output-Title').style.display = 'none';
    document.getElementById('Output-Image').style.display = 'none';
    document.getElementById("Image_Button").style.display = 'none';
    document.getElementById('Print_Button').style.display = 'none';

    document.getElementById("Output-Image").src = "";
    document.getElementById("Output-Text").innerHTML = "Load Story...";
    Title = document.getElementById("form-title").value;
    Genre = document.getElementById("form-genre").value;
    Time = document.getElementById("form-times").value;
    Language = document.getElementById("form-language").value;
    Style = document.getElementById("form-style").value;
    emotions = document.getElementById("form-emotions").value;

    console.log("");
    console.log("GENERATION");
    console.log("TEXT: " + "Generate a story without a title and without a chapter in " + Language + "; " + Title + "; " + Genre + "; " + emotions + "; " + Time) + ";";
    console.log("IMAGE: " + "Generate a " + Style + " Image wit thename: " + Title + "; In Genre: " + Genre + "; With Emotion: " + emotions + ";");
    console.log("");

    document.getElementById('loader').style.display = 'inline-block';
    document.getElementById('loader2').style.display = 'inline-block';
    document.getElementById('Output-Title').style.display = 'block';

    text();
    images();

    document.getElementById("Output-Title").innerHTML = Title;
}

/* CHAT-GPT */
/* Generiert die Geschichte */
function text() {

    const raw = JSON.stringify({
        "model": "gpt-4o",
        "messages": [
            {
                "role": "user",
                "content": "Generate a story without a title and without a chapter in " + Language + "; " + Title + "; " + Genre + "; " + emotions + "; " + Time + ";"
            }
        ],
        "temperature": 1
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://story-ai.fabio-stuber.workers.dev/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById('Output-Text').style.display = 'block';
            document.getElementById("Output-Text").innerHTML = result.choices[0].message.content.replaceAll("\n", "<br>").replaceAll("ß", "ss");
            document.getElementById('loader2').style.display = 'none';
            document.getElementById('Print_Button').style.display = 'block';

        })
        .catch((error) => console.error(error));
}

/* DALL-E */
/* Generiert die Bilder zur Geschichte */
function images() {

    const raw = JSON.stringify({
        "model": "dall-e-3",
        "prompt": "Generate a " + Style + " Image; " + Title + "; Genre: " + Genre + "; Emotion: " + emotions + ";",
        "n": 1,
        "size": "1024x1024",
        "quality": "standard"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://story-ai.fabio-stuber.workers.dev/v1/images/generations", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("Output-Image").src = result.data[0].url;
            document.getElementById("Image_Button").href = result.data[0].url;
            document.getElementById("Image_Button").style.display = "block";
            document.getElementById('loader').style.display = 'none';
            document.getElementById('Output-Image').style.display = "block";


        })
        .catch((error) => console.error(error));
}

function Print() {
    window.print();
}