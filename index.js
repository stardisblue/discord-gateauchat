var Discord = require("discord.js");
var config = require("./config.json");
// chat : 450395094869344276
// chien : 450743543850467330
var dog = new Discord.Client();
var cat = new Discord.Client();

dog.on("message", function(m) {
  if (/g[aâ]teau|\bchien\b|saucisson|\bjo\b/i.test(m.content))
    m.react(m.guild.emojis.get("450743543850467330"));
});

cat.on("message", function(m) {
  if (/\bchat\b|\bninouille\b|\bmimine\b/i.test(m.content))
    m.react(m.guild.emojis.get("450395094869344276"));
});

dog.on("ready", function() {
  if (dog.user.username !== "Jo") {
    dog.user
      .setUsername("Jo")
      .then(function(value) {
        return console.log("username Set");
      })
      .catch(function(reason) {
        return console.error(reason);
      });
  }
});

cat.on("ready", function() {
  if (cat.user.username !== "Hermine") {
    cat.user
      .setUsername("Hermine")
      .then(function(value) {
        return console.log("username Set");
      })
      .catch(function(reason) {
        return console.error(reason);
      });
  }
});

dog
  .login(config.token.dog)
  .then(function(string) {
    console.log("Connection successful :" + string);
  })
  .catch(function(reason) {
    console.error("Connection failed : " + reason.toString());
  });

cat
  .login(config.token.cat)
  .then(function(string) {
    console.log("Connection successful :" + string);
  })
  .catch(function(reason) {
    console.error("Connection failed : " + reason.toString());
  });
