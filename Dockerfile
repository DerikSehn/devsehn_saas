# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package.json package-lock.json ./
COPY . .

# Instale as dependências do projeto
RUN npm install --production --ignore-scripts
RUN npm install --save-dev eslint @types/lodash

RUN npm run build

# Comando para executar a aplicação
CMD ["npm", "start"]
