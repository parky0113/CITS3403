const msgerForm = get(".msger-inputarea");
const msgerInput = get(".msger-input");
const msgerChat = get(".msger-chat");

const person = [
    "Barack Obama", "Beyonce", "Elon Musk", "Oprah Winfrey", "Albert Einstein" ,
    "Cristiano Ronaldo",
    "BTS" ,
    "Zendaya",
    "William Shakespeare",
    "Kim Kardashian",
    "Billie Eilish"

]

const food = ["Pizza", "Sushi", "Taco", "Pad Thai", "Paella",
                "Hamburger", "Croissant", "Curry", "Ramen", "Pecking Duck"    
]

const movie = [
    "Iron Man", "Titanic", "Star Wars", "The Lord of thre Rings", "Parasite",
    "The Shawshank Redemption", "Forres Gump", "The Matrix", "Jaws", "Harry Potter",
    "Mean Girls"
]

const animal = [
    "Panda", "Tiger", "Eagle", "Bear", "Dog", "Koala", "Whale", "Elephant", "Chimpanzee","Zebra"
]
// Open AI API key
const apiKey = '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';
// OpenAI API end point
const apiEndpoint = 'https://api.openai.com/v1/chat/completions'

// Icons made by Freepik from www.flaticon.com
const BOT_NAME = "Ditto";
const PERSON_NAME = "User";
document.getElementById("dis_Button").style.visibility = "hidden";
let category = document.getElementById('category');
let topic = category.value;

if (topic == "Animal"){
    answer = animal[Math.floor(Math.random() * 10)];
}   
else if (topic == "Person"){
    answer = person[Math.floor(Math.random() * 10)];
}   
else if (topic == "Movie"){
    answer = movie[Math.floor(Math.random() * 10)];
}   
else {
    answer = food[Math.floor(Math.random() * 10)];
}

let count = 0;
let score = 5;
let chatting = [`Hi, welcome to Ditto! You have chosen ${topic} category. Ask me a question and guess the word! 😄*B`];
msgerForm.addEventListener("submit", event => {
event.preventDefault();

let original = msgerInput.value;
if (!original) return;

chatting.push(original+'*U');
appendMessage(PERSON_NAME, "right", original);

if (original.toLowerCase().includes(answer.toLowerCase())){
    score = score - count;
    let correct = `You are correct! The answer is ${answer}. You asked ${count} questions, you got ${score} points!`
    chatting.push(correct+'*B');
    appendMessage(BOT_NAME,'left',correct);
    sendData(chatting)
    document.getElementById("dis_Button").style.visibility = "visible";
}
else{
    let msgText = original.replace("it", answer);
    botResponse(msgText);
    count += 1;
}

msgerInput.value = "";
});

function appendMessage(name, side, text) {
//   Simple solution for small apps
const msgHTML = `
    <div class="msg ${side}-msg">

    <div class="msg-bubble">
        <div class="msg-info">
        <div class="msg-info-name">${name}</div>
        <div class="msg-info-time">${formatDate(new Date())}</div>
        </div>

        <div id="msg" class="msg-text">${text}</div>
    </div>
    </div>
`;

msgerChat.insertAdjacentHTML("beforeend", msgHTML);
msgerChat.scrollTop += 500;
}

async function botResponse(prompt) {
    const requestOptions = {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",  // AI Model
            messages: [{
                role: "user", // Sending messages
                content: prompt // The messages
            }, ],
            temperature: 0.8, // Model diversity
            max_tokens: 1024, // Maximum words count
            top_p: 1, // Sampling probability
            frequency_penalty: 0.5, // unique of word
            presence_penalty: 0.5, // repeatation limit
        }),
    };
    // Answer process
    try {
        const response = await fetch(apiEndpoint, requestOptions);
        const data = await response.json();
        let aiResponse = data.choices[0].message.content;
        const pattern = answer;
        const re = new RegExp(pattern, "gi");
        const replaced = aiResponse.replace(re, "it");
        console.log(replaced);
        chatting.push(replaced+'*B');
        appendMessage(BOT_NAME, "left", replaced);
    } catch (error) {
		console.error('Error occurred requesting OpenAI API:', error);
        return 'Error occurred requesting OpenAI API';
    }
}

function sendData(chatting) {
    fetch('/process-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: chatting})
      })
      .then(response => response.text())
      .then(result => {
        console.log(result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
}

// Utils
function get(selector, root = document) {
return root.querySelector(selector);
}

function formatDate(date) {
const h = "0" + date.getHours();
const m = "0" + date.getMinutes();

return `${h.slice(-2)}:${m.slice(-2)}`;
}
