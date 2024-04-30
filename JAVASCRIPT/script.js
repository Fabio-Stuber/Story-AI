/* VARIABLEN */
/* Vordevinierte Variabeln & ändernde Variabeln */
let Title = "";
let Genre = "";
let Time = "";
let Language = "";
let Style = "";
let happiness = "";


/* AUTHORIZATION */
/* Autorisiert CHAT-GPT & DALL-E */
const myHeaders = new Headers();
myHeaders.append("Authorization", GITHUB_AUTHORIZATION);
myHeaders.append("Cookie", GITHUB_COOKIE);

/* RUN */
/* Ausführung von Generieren */
function run() {
    document.getElementById("Output-Image").src = "../DATA/Load.gif";
    document.getElementById("Output-Text").innerHTML = "Load Story...";
    Title = document.getElementById("form-title").value;
    Genre = document.getElementById("form-genre").value;
    Time = document.getElementById("form-times").value;
    Language = document.getElementById("form-language").value;
    Style = document.getElementById("form-style").value;
    happiness = document.getElementById("form-happiness").value;

    console.log("");
    console.log("GENERATION");
    console.log("TEXT: " + "Generate a story without a title and without a chapter in " + Language + "; " + Title + "; " + Genre + "; " + happiness + "; " + Time) + ";";
    console.log("IMAGE: " + "Generate a " + Style + " Image; " + Title + "; " + Genre + "; " + happiness + ";");
    console.log("");

    text();
    images();

    document.getElementById("Output-Title").innerHTML = Title;
    document.getElementById("Output-Text").innerHTML.replaceAll("ß", "ss")

}


/* CHAT-GPT */
/* Generiert die Geschichte */
function text() {

    const raw = JSON.stringify({
        "model": "gpt-4-turbo",
        "messages": [
            {
                "role": "user",
                "content": "Generate a story without a title and without a chapter in " + Language + "; " + Title + "; " + Genre + "; " + happiness + "; " + Time + ";"
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

    fetch("https://api.openai.com/v1/chat/completions", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("Output-Text").innerHTML = result.choices[0].message.content.replaceAll("\n", "<br>");
        })
        .catch((error) => console.error(error));
}

/* DALL-E */
/* Generiert die Bilder zur Geschichte */
function images() {

    const raw = JSON.stringify({
        "model": "dall-e-3",
        "prompt": "Generate a " + Style + " Image; " + Title + "; " + Genre + "; " + happiness + "; ",
        "n": 1,
        "size": "1792x1024"
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://api.openai.com/v1/images/generations", requestOptions)
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            document.getElementById("Output-Image").src = result.data[0].url;
        })
        .catch((error) => console.error(error));
}
