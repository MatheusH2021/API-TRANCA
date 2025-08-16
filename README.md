# 🔐 API para Tranca RFID

Este projeto é uma simples API para gerenciamento de uma **tranca eletrônica com desbloqueio por tags/cartões RFID**. O objetivo principal é cadastrar tags/cartões e, ao ler uma tag no leitor RFID, **receber uma mensagem via MQTT**, autenticar a tag lida e **liberar ou negar o acesso**.

---
> ⚠️ **OBS: Esse projeto funciona em conjunto com a [Tranca Eletronica RFID com ESP32](<https://github.com/MatheusH2021/tranca-eletronica-rfid.git>)  
> Para funcionamento completo, clone e configure o repositório da Tranca eletronica também!
## 🚀 Tecnologias Utilizadas

- Node.js
- Express.js
- Mongoose
- MongoDB
- MQTT.js

---

## ⚙️ Como Rodar o Projeto

1. **Clone ou baixe o repositório:**

```bash
git clone https://github.com/MatheusH2021/API-TRANCA.git
```

2. **Acesse a pasta do projeto:**

```bash
cd API-TRANCA
```

3. **Instale as dependências:**

```bash
npm install
```

4. **Configure o banco de dados:**

Abra o arquivo `database/database.js` e edite a string de conexão:

- Para uso local, mantenha:

```
mongodb://127.0.0.1:27017/tags-storage
```

- Para uso com MongoDB Atlas, insira sua string de conexão e **inclua `/tags-storage` no final**.

5. **Configure o broker MQTT:**

Abra o arquivo `mqtt/client.js` e edite a seguinte linha:

```js
const client = mqtt.connect('<SEU BROKER AQUI>');
```

Substitua `<SEU BROKER AQUI>` pelo endereço do broker MQTT usado pela sua tranca RFID.

> 💡 Mais detalhes sobre o broker podem ser encontrados no repositório do código-fonte da tranca eletrônica (ESP32).

6. **Inicie a aplicação:**

```bash
npm start
```

---

## 📡 Como Usar a API

### 🔍 Listar todas as tags

- **Método:** `GET`  
- **Endpoint:** `http://127.0.0.1:3000/tags/all`

### ➕ Cadastrar uma nova tag

- **Método:** `POST`  
- **Endpoint:** `http://127.0.0.1:3000/tags`  
- **Exemplo de corpo da requisição (JSON):**

```json
{
  "uid": "8F9FECC4",
  "ativo": "sim"
}
```
### ✅ Ativar/Desativar uma tag

- **Método:** `PUT`  
- **Endpoint:** `http://127.0.0.1:3000/tags/edit/<uid_da_tag>`  

### ❌ Excluir uma tag pelo UID

- **Método:** `DELETE`  
- **Endpoint:** `http://127.0.0.1:3000/tags/<uid_da_tag>`

---

## 🔄 Funcionamento Geral do Projeto

1. A ESP32 lê uma tag RFID e publica o UID no tópico MQTT `esp32/tranca/autenticar`.
2. A API escuta esse tópico e verifica no banco de dados se a tag existe e está ativa.
3. Se **válida**, a API publica `"1"` no tópico `esp32/tranca/desbloquear`, liberando a tranca.
4. Se **inválida ou desativada**, a API publica `"0"` no tópico `esp32/tranca/desbloquear`, negando o acesso.

---

## 📁 Estrutura de Pastas

```bash
.
├── controllers/
│   └── tagController.js   # Controller com as ações de cadastro, exclusão e leitura de todas as tags
├── database/
│   └── database.js        # Configuração da conexão com MongoDB
├── models/
│   └── RfidTag.js         # Modelo do documento das tags rfid salvas
├── mqtt/
│   └── client.js          # Conexão com broker MQTT e lógica de autenticação
├── routes/
│   └── router.js          
│   └── tags.js            # Rotas para cadastro, listagem e exclusão de tags
├── src/
│   └── app.js             # Inicialização da API Express
└── package.json           # Dependências e scripts
```

---

## 🛠️ Melhorias Futuras

- Interface web para gerenciamento de tags
- Histórico de acessos

---

## ✅ Requisitos

- Node.js instalado
- MongoDB (local ou na nuvem)
- Broker MQTT configurado
- ESP32 com firmware e conexão ao broker

---




