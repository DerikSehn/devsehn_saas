# Use a imagem oficial do Node.js como base
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos necessários para o diretório de trabalho
COPY package.json package-lock.json ./
COPY . .

# Instale as dependências do projeto
RUN npm install

# Exponha a porta 3000
EXPOSE 3000

# Comando para executar a aplicação
CMD ["npm", "run", "dev"]
