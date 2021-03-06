const Discord = require("discord.js");
const botUtils = require("../../../utils.js");

module.exports = (client, message) => {

  let canal = client.channels.cache.get("767982805908324411");
  let travas = botUtils.jsonPull("./dataBank/travas.json");

  travas.forEach(trava => {
    if(message.content.includes(trava)) {
      message.delete().catch(() => {});
      message.member.ban("Suspeito de trava discord").catch(() => {});

      let embed = new Discord.MessageEmbed()
        .setTitle("SUSPEITO DE TRAVA DISCORD")
        .setColor("RED")
        .setTimestamp()
        .setDescription(`${message.author} / ${message.author.tag} / ID: ${message.author.id}`)
        .addField("Conteudo da mensagem suspeita", `${message.content.slice(0, 100)}...`)
        .addField("String suspeita", trava);
      if(canal) canal.send(embed);
      return;
    }
  })
}