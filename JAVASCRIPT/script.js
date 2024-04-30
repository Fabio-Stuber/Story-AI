/* VARIABLEN */
/* Vordevinierte Variabeln & ändernde Variabeln */
let Title = "";
let Genre = "";
let Time = "";
let Language = "";


/* AUTHORIZATION */
/* Autorisiert CHAT-GPT & DALL-E */
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", GITHUB_AUTHORIZATION);
myHeaders.append("Cookie", GITHUB_COOKIE);

/* RUN */
/* Abfragen von Variabeln */
function run() {
    document.getElementById("Output-Image").src = "../DATA/Load.gif";
    document.getElementById("Output-Text").innerHTML = "Load Story...";
    Title = document.getElementById("form-title").value;
    Genre = document.getElementById("form-genre").value;
    Time = document.getElementById("form-times").value;
    Language = document.getElementById("form-language").value;


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
                "content": "Generate a story without a title and without a chapter in " + Language + "; " + Title + "; " + Genre + "; " + Time
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
        "prompt": "Generate a Story Image;" + Title + "; " + Genre,
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
