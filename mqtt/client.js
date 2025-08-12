const mqtt = require("mqtt");
const client = mqtt.connect("http://<SEU BROKER AQUI>");
const tagsController = require("../controllers/tagsController");

// Tópicos
const atutenticarTopico = "esp32/tranca/autenticar";
const desbloquearTopico = "esp32/tranca/desbloquear";
const geralTopico       = "esp32/tranca/geral";

client.on('connect', () => {
    console.log('Conectado ao BROKER da tranca!');
    client.subscribe('esp32/tranca/autenticar');
    client.subscribe('esp32/tranca/geral')

    client.publish(geralTopico, '{"dispositivo": "Client-Node", "status": "conectado"}');
});


client.on('message', async (topic, message) => {
    if (topic === atutenticarTopico) {
        const messageString = message.toString();
        console.log("Mensagem de autenticação recebida!")

        try {
            const parsedMessage = JSON.parse(messageString);

            const response = await fetch("http://127.0.0.1:3000/api/tags/" + parsedMessage.uid);
            const contentType = response.headers.get('content-type');

            if (response.ok && contentType && contentType.includes('application/json')) {
                const tag = await response.json();
                console.log("Tag scaneada: "+tag.uid)

                if (tag && tag.uid && tag.ativo === "sim") {
                    client.publish(desbloquearTopico, '1');
                    console.log('Tag encontrada, acesso liberado!');
                } else if (tag.ativo === "nao") {
                    client.publish(desbloquearTopico, '0');
                    console.log('Tag se encontra desativada! Acesso negado!');
                } else {
                    client.publish(desbloquearTopico, '0');
                    console.log('Tag não encotrada ou codigo UID ausente!');
                }
            } else {
                console.error('Resposta inesperada da API. Código:', response.status);
            }

        } catch (error) {
            console.error('Erro ao processar a mensagem:', error);
        }
    }
});

module.exports = client