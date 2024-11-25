let ChatList = [];
let dropDown = document.getElementById("Dropdown");
let input;

function Send() {
    input = document.getElementById("inputTxt").value;
    let User = dropDown.value;
    ChatList.push({ chat: input, User: User });
    console.log(ChatList);
    toprint();
    call();
}

function toprint() {
    let Body = "";
    ChatList.forEach(element => {
        if (element.User === "Me") {
            Body += `<p class="text-end">${"User: " + element.chat}</p>`;
        } else if (element.User === "Friend") {
            Body += `<p class="text-start">${"Ai ChatBot: " + element.chat}</p>`;
        } else if (element.User === "ai") {
            Body += `<p class="text-start text-muted">${"Ai ChatBot: " + element.chat}</p>`;
        }
    });

    let chat = document.getElementById("chatBody");
    chat.innerHTML = Body;
}

function call() {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "contents": [
            {
                "parts": [
                    {
                        "text": input
                    }
                ]
            }
        ]
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDfV5T1GfGSZ5cavgG2Di_gA6i2-saKOEo", requestOptions)
        .then(response => response.json())
        .then(result => {
            let aiResponse = result?.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No response from AI";
            console.log(aiResponse);
            
            ChatList.push({ chat: aiResponse, User: "ai" });
            toprint();
        })
        .catch(error => {
            console.error("Error:", error);
            ChatList.push({ chat: "Error: Unable to fetch AI response", User: "ai" });
            toprint();
        });
}
