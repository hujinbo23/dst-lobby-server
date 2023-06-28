FROM debian:buster-slim

# 拷贝程序二进制文件
COPY dst-lobby-server dst-lobby-server
RUN chmod 755 dst-lobby-server
COPY dist /dist

EXPOSE 80/tcp

# 运行命令
ENTRYPOINT ["./dst-lobby-server"]