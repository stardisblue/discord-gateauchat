import { Client } from "discord.js";
import { token } from "./config.json";

// chien : 450743543850467330
// chat : 450395094869344276

const jo = setJoBehaviour(
  new Client(),
  /g[aâ]teau|\bchien\b|saucisson|\bjo\b/i,
  "450743543850467330"
);
login(jo, token.dog);

const hermine = setHermineBehaviour(
  new Client(),
  /\bchat\b|\bninouille\b|\bmimine\b/i,
  "450395094869344276"
);
login(hermine, token.cat);

/**
 * Set the Client to behave as Jo
 * @param {Client} client Client to set the behaviour to
 * @param {RegExp} regex
 * @param {string} emojiId jo emoji
 * @returns {Client} the same client
 */
function setJoBehaviour(client, regex, emojiId) {
  setUsername(client, "Jo");

  return client
    .on("message", m => {
      if (regex.test(m.content)) m.react(m.guild.emojis.get(emojiId));
    })
    .on("messageUpdate", (oldMessage, m) => {
      if (!regex.test(om) && regex.test(m))
        m.react(m.guild.emojis.get(emojiId));
    });
}

/**
 * Set the Client to behave as Hermine
 * @param {Client} client Client to set the behaviour to
 * @param {RegExp} regex
 * @param {string} emojiId chat emoji
 * @returns {Client} the same client
 */
function setHermineBehaviour(client, regex, emojiId) {
  setUsername(client, "Hermine");

  return client
    .on("message", m => {
      if (regex.test(m.content)) m.react(m.guild.emojis.get(emojiId));
    })
    .on("messageUpdate", (oldMessage, m) => {
      if (!regex.test(oldMessage) && regex.test(m))
        m.react(m.guild.emojis.get(emojiId));
    });
}

/**
 * Logs in a discordClient (method to avoid boilerplating)
 * @param {Client} client Discord client to login
 * @param {string} key
 */
function login(client, key) {
  client
    .login(key)
    .then(string => console.log("Connection successful :" + string))
    .catch(reason => console.error("Connection failed : " + reason.toString()));
}

/**
 * Changes the username on login, if different from the username (method to avoid boilerplating)
 * @param {Client} client
 * @param {string} username
 * @returns {client}
 */
function setUsername(client, username) {
  return client.on("ready", function() {
    if (client.user.username !== username) {
      client.user
        .setUsername(username)
        .then(value => console.log("username Set " + username))
        .catch(reason => console.error(reason));
    }
  });
}
