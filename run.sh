BIN=dst-lobby-server
chomd +x dst-lobby-server
PID=$(ps -ef|grep "${BIN}"|grep -v grep|awk '{print $2}')
if [ -z "$PID" ]; then
    echo "PID is empty"
else
    kill -9 $PID
fi
nohup ./dst-lobby-server >log.log &