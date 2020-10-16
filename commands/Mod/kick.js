const Discord = require("discord.js");

module.exports = {
    // Execução do comando
    run: async (client, botUtils, message, args) => {
        newError = botUtils.newError;
        try {
            // Codigo do comando
			if(!message.member.hasPermission("KICK_MEMBERS", "ADMINISTRATOR")) return message.reply("Você não tem permissão para isso");
			
            const user = message.mentions.members.first();
			const channel = message.guild.channels.cache.find(ch => ch.name === 'punição');
			const reason =  args[1] ? args.slice(1).join(" ") : "[Nenhum motivo foi dado]"

			let rankUser = user.roles.highest.position;
			let rankAuthor = message.member.roles.highest.position;
			let rankBot = message.guild.member(client.user).roles.highest.position;

			if(rankUser >= rankAuthor) return message.reply(`Você é incapaz de expulsar o ${user.user.username}`);
			if(rankUser >= rankBot)    return message.reply(`Eu sou incapaz de expulsar o ${user.user.username}`);	

			user.kick(reason)
				.then( async () => {
					let embed = new Discord.MessageEmbed()
						.setColor('#FF0000')
						.setAuthor(message.author.tag,message.author.displayAvatarURL())
						.setTitle('Kick!')
						.setDescription(`${user} levou kick.\n\nMotivo: ${ reason }`)
						.setThumbnail(user.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
                        .setTimestamp();
					await channel.send(embed);
				});
				

        } catch(err) {
            let embed = new Discord.MessageEmbed()
                .setTitle("Erro inesperado")
                .setDescription("Um erro inesperado aconteceu. por favor contate os ADMs\n\nUm log foi criado com mais informações do erro");
            message.channel.send(embed)
            console.log(`=> ${newError(err, "kick", message.guild.id)}`);
        }
    },

    // Configuração do comando
    config: {
        name: "kick",
        noalias: "Sem sinonimos",
        aliases: [],
        description: "De um kick em um membro do server",
        usage: "kick <@member> [motivo]",
        accessableby: "STAFF"
    }
}