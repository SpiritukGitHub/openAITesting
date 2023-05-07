const express = require("express");
const http = require("http");
const { Configuration, OpenAIApi } = require("openai");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var bodyParser = require('body-parser')

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }))
require('dotenv').config()
 let answer;
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (promptText) {
const completion = await openai.createCompletion({
  //model: "gpt-3.5-turbo",
  model: "text-davinci-003",
  //model: "text-ada-001",
  prompt: promptText,
  stop: ["\"\"\""],
  temperature: 0,
  max_tokens: 200,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0,
});
console.log(completion.data.choices[0].text);
let answer = completion.data.choices[0].text;
return answer;
}

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);4
});

app.post("/", (req, res) => {

  const chatQ = req.body.question;
  runCompletion(chatQ).then(x => { 


res.send('<html lang = "en"><head><meta charset = "UTF-8"><link rel = "stylesheet" href="styles.css"><title>Cht GPT Question</title></head><body><div class="chat-container"><header><h1>James Cooks</h1><h1>Chat GPT Interface</h1></header><form action="/" method="POST"class="message-form">'+ x + '<h3>Ask a question</h3><label>Your Question</label><input type ="text" name="question" required><br><br><button type ="submit" class="Button">Submit</button></form></div></body></html>');
//res.send(x); 
});
 
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
