**This project is a fork from dcscan/gitterbot, with changes made for GitHub Teacher**. You can see a more fully implemented bot in [CamperBot, freeCodeCamp's chatbot based on this same code](https://github.com/freecodecamp/camperbot)!

# Build a Bot Workshop

## What to Expect

In this 40 minute session, you'll fork an existing chatbot and get it up and running within minutes. But, this is more than just a glorified demo.

In addition to **a functional chat bot**, you'll walk away with detailed playbooks of **advanced chatops functionality** so you can implement the chat bot in **your own chat environment**.

If you don't get to every activity today in the workshop, that's fine! You will take all of the playbooks home with you.

![bearbot](http://www.robotshop.com/blog/en/files/teddy-bear-robot-300x180.jpg)

Times:
- 9:30-10:30
- 10:45-11:45
- 13:00-14:00
- 14:15-15:15

Planner: @migarjo & @brianamarie

Facilitator: @mimgarjo & @brianamarie

## Prerequisites

### Tools

Tool | Used for
--- | ---
[GitHub](https://github.com) (Please log in now) | To grab the code
[Glitch](https://glitch.com) (Please login with GitHub now) | A temporary server for your chat bot
[Gitter room](https://gitter.im/githubteachergitterbot/Lobby) (Please join room now, authenticate with GitHub) | To interact with your chatbot
[One shared bot user account](https://github.com/billyyumyum2x2) | The account logged in to Gitter, authenticated via Glitch app, responding to messages :robot:

## Part 1: Steps for Getting Started
1. Fork the [satelliteworkshops/gitterbot repository](https://github.com/satelliteworkshops/gitterbot)
2. In [Glitch](https://glitch.com), import your fork of the githubteacher/gitterbot repository
  - Click 'Edit Code'
  - Click the title of the app on the top left
  - Select 'Advanced Options'
  - By 'Import from GitHub', click 'Grant Access' and allow the app the proper permissions
  - Select 'Import from GitHub' and type the name of your fork, `USERNAME/gitterbot`
  - **Note: Any changes made in Glitch will not automatically be made in your fork. The steps are similar to importing, but instead select 'Export to GitHub'.**
3. In Glitch, replace the contents of the `.env` file with:
  ```
  SERVER_ENV=demobot
  GITTER_USER_TOKEN=92123753cc1ec6e60bd0ca3e7b87b35bc38ca4d3
  FCC_API_KEY=TESTAPIKEY
  GITTER_APP_KEY=63ece8ac0eeed9b17b1cc9867f65d4857ec6e5fc
  GITTER_APP_SECRET=9026e3b3a74357035ee15a9591f31b2de5cfd3a6
  GITTER_APP_REDIRECT_URL=http://localhost:7891/login/callback
  LOG_LEVEL=10
  PORT=7891
  ```
4. Join [the shared gitter chat room](https://gitter.im/githubteachergitterbot/Lobby). (You will need a Gitter account, which you can create with your GitHub account). You can test this by saying something that the bot is already looking for, like "satellite".

## Part 2: Pick Your Own Adventure
Mix and match from the following activities. It doesn't matter if you do none of them or all of them, or what order you do them in. Each activity is independant of the others and is a way to fill out functionality of the bot for your specific use. If you don't have time to get to everything today, don't worry! You still have all of the instructions on your fork.

### Add new bot messages
- **PROTIP/Disclaimer:** _**Do not include the phrase that triggers a message in the response message.** You will find unfortunate behaviors, which may include some accidental looping that may get the bot account banned. I may or may not know from experience._
1. **Find the existing message code**
  - The basic room messages are stored in `data/rooms/RoomMessages.js`.
  - So far, our bot is best at watching for incoming chat messages, and uses regex to know when to respond.
  - Test out the current messages (and your regex knowledge) to see what our Bot can say:
    - `/satellite/gim`
    - `/githubteacher/gim`
    - `/botx/i`
    - `/\btroll\b/i`
    - `/allyourbase/`
  - It's easy to add simple, static messages here. This is the point of contact for more interactive messages, too.
2. **Add a new message and trigger that will be unique to your bot.**
  - If we all write a message for the same trigger, and try that trigger in the chat room, every bot will respond.
  - Change line 23, replacing `USERNAME` with your own username.
  - Change the response to be whatever you'd like, maybe something like "I heard they're the best tennis player in the country."...or something more true, perhaps.
3. **Test this out in the [shared chat room](https://gitter.im/githubteachergitterbot/Lobby).**

### Get your own bot instead of our default bot
- Create a GitHub account for the new bot.
- Sign that account into Gitter and join whichever chat rooms you'd like it to be active in.
- Go to `https://developer.gitter.im/docs/welcome` and click "Sign in". You'll be given a new API token.
- Replace the GITTER_USER_TOKEN of the `.env` file with this new token.

### Change the chatroom for the bot
_Note: This will only work if you've created your own bot account._
- Change code in `data/RoomData.js`
- The code that tells the bot to join [our chat room](https://gitter.im/githubteachergitterbot/Lobby?source=orgpage) is on line 39.
```
    demobot: [{
        title: "githubteacher's GitterBot room",
        name: "githubteachergitterbot/lobby",
        icon: "star",
        topics: ["getting started"]
    }],
```
- Change the code there, or add your code to the block in lines 24-32.
- Join the new room manually while logged in as your bot account.

### Use JavaScript in more advanced messages
- This bot is written in JavaScript. Use JavaScript to add a more advanced functionality, like telling the date or the time.
- In `data/rooms/RoomMessages.js`, add some javascript to grab the date and time and assign it to a variable as a string. You'll want to add this code before the text calls are made, around like 13.
    ```
    var date = new Date();
    var dateAsString = date.toString();
    ```
- Later in the code, access it as a message response.
    ```
    {
        regex: /Please +tell +me +the +time/gim,
        text: dateAsString,
    },
    ```
- This concept will work for anything in JavaScript. Check out [JavaScript methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Methods_Index) to see what else is possible!     

### Have the Bot interact with an API
- This code supports Javascript Promises
- To test this out, here's some code you can start with. It uses [the free OpenWeather API](https://openweathermap.org/current).
```
{
  regex: /\/weather/gim,
  func: (input) => {
    return new Promise((resolve, reject) => {
          request({
            // note: this API key is public and free. Too many calls will get it blocked.
            uri: 'http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=bd5e378503939ddaee76f12ad7a97608',
            method: 'GET'
          }, (err, response, body) => {
            if(err) { reject(err); }
            else {
              const jsonBody = JSON.parse(body);
              resolve(jsonBody.weather[0].description);
            }
          });
        });
  }

```
- You can see that the functionality is low level. Make this more fun by changing `London,uk` or by changing which output is shown from the API response. Remember, JavaScript is supported, and you can get messages from the chat users. :wink:
- Want to do more? Like add giphy support, or other APIs? Start by asking yourself (and google, if necessary) these questions:
  - What's the API I want to use, and how do I call it?
  - How can I use more advanced work with regexes, like groups, or string manipulation? How would I _want_ to?
  - Am I taking the correct properties from the API response?
  - If I am returning anything other than text, how can I format it in in gitter using markdown

### Make the bot persistant with a Heroku Server
- _Note: Depending on the type of server you want to use, this may require a paid account._
- Make a Heroku account and log in
- Create a project from the same existing fork
- In `app.js`, comment out line 7: `require('dotenv').config({path: '.env'});`
- In Heroku under settings, choose a buildpack of `heroku/nodejs`
- Also in settings, add config variables to equal those that were in your `.env` file on GoMix.
- Deploy the app.

### Make the bot run in Docker
- Make sure to install [Docker](https://docker.com)
- In your text editor, duplicate the file named `dot-EXAMPLE.env` with the new name `dot.env`.
- Build your Docker image using the command `docker build -t gitter .` This takes the [Dockerfile](Dockerfile) and configures the node app to run inside.
- You can now see your image using the command `docker images`.
- Your bot can be run with the command `docker run --rm -it gitter`
- If you want to distribute your bot run it using `docker run -d --rm gitter`,
  as this will run your bot as a service.
- You have now containerized your chatbot!

### Connect the bot to a repository's GitHub wiki
- This is done using submodules and scripts. The submodules are **not** included in this repository, but the scripts and directions are.
- The Bot functionality for calling wiki pages in this format already built in
- To connect your own wiki, add the repository with said wiki as a submodule of this repository.
- Use the script in `bin/wiki-update.sh` to update the file structure of this repository. This script will require updating based on your submodule's name and placement within your local repository.
- Files will be added to  match a structure like `data/wiki/ARTICLE.md`, and the bot already knows to search those files with the `wiki` message.


### :construction: WIP :construction: Give the bot some persistent data, like `.rem things`
? Maybe adapter that would interact with database, and have existing database set up for this example, with instructions on how to change the database and interactions

### :construction: WIP :construction: Longer strings of conversation, remembering past user things
?

### :construction: WIP :construction: Have the bot work in Slack instead of Gitter (Or...dream big...why not also integrate to Facebook or any other messaging platform?)
? Have functionality for both, put the functional chat code in a place that could be accessed by the slack or gitter code

## Part 3: Dream Big for Your Bot
Chatbot functionality is limited only by imagination. What are some dreams for chatbots? What are some cool functionalities we could show or feature without delving into 'how'? You can sort your dreams for your bot into 3 general tiers. Here are some of our ideas:

#### Tier 1: Static interaction
- When I say "hey", the bot says "ho!"
- Meeting reminders (with links to the calls!)
- FAQ ready to go

#### Tier 2: User inputs something, bot searches static information to give specific information
- Get the weather at a designated location
- Get the location of a specific user
- .gif display, like `/giphy chatbot`

#### Tier 3: User orders bot to do something, bot actually makes a change to something
- Onboarding
- Deploy
- Social conventions, like thanking others by giving them sparkles
- Scheduling bot
