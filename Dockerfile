# 使用 Node.js 18 作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制应用程序代码到工作目录
COPY . .

# 暴露端口（如果应用程序需要监听端口，则需要暴露）
EXPOSE 5173

# 启动应用程序
CMD ["npm", "run", "dev"]

