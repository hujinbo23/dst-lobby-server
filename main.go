package main

import (
	"dst-lobby-server/config"
	"dst-lobby-server/database"
	"dst-lobby-server/global"
	"dst-lobby-server/lobbyServer"
	"dst-lobby-server/route"
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
	"log"
)

func initDB(cfg *config.Config) {

	db, err := gorm.Open(sqlite.Open("lobby-db"), &gorm.Config{
		Logger: logger.Default.LogMode(logger.Error),
	})
	database.DB = db
	if err != nil {
		panic("failed to connect database")
	}
	err = database.DB.AutoMigrate(
		&lobbyServer.LobbyHome{},
		&lobbyServer.LobbyStatistics{},
		&lobbyServer.LobbyHomeBrief{},
	)
	lobbyServer2 := lobbyServer.NewLobbyServerWithDB(db)
	global.LobbyServer = lobbyServer2
	go lobbyServer2.StartCollect(cfg.Interval.Collect)
	go lobbyServer2.StartStatistics(cfg.Interval.Statistics)
}

func main() {

	cfg := config.NewConfig("./config.yml")
	initDB(cfg)

	app := route.NewRoute()
	err := app.Run(":" + cfg.Port)
	if err != nil {
		log.Println("启动失败")
	}

}
