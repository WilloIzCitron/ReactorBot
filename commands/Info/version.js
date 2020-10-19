const Discord = require("discord.js");

module.exports = {
    // Execução do comando
    run: async (client, botUtils, message, args) => {
        newError = botUtils.newError;
        try {
            // Codigo do comando
            const config = botUtils.jsonPull('./config.json')
            message.reply(`A versão do bot atual é a: \`${config.version}\``)

        } catch(err) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Erro inesperado")
                .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
            message.channel.send(embed);

            let IDs = {
                server: message.guild.id,
                user: message.author.id,
                msg: message.id
            }
            console.log(`=> ${newError(err, "warn", IDs)}`);
        }
    },

    // Configuração do comando
    config: {
        name: "version",
        noalias: "Sem sinonimos",
        aliases: [],
        description: "Informa a versão do Bot",
        usage: "version",
        accessableby: "Membros"
    }
}