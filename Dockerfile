# Base images 基础镜像
FROM nginx:latest

#MAINTAINER 维护者信息
MAINTAINER Fei lcgblog@126.com

ENV RUN_USER nginx
ENV RUN_GROUP nginx
ENV DATA_DIR /var/www/html #ADD
#RUN 执行以下命令
RUN mkdir -p /var/www/html

#COPY
COPY ./resource/ /var/www/html 
COPY ./conf/nginx.conf /etc/nginx

#EXPOSE 映射端口
EXPOSE 7777

#CMD 运行以下命令
CMD ["nginx", "-g", "daemon off;"]
