package route

import (
	"dst-lobby-server/api"
	"github.com/gin-gonic/gin"
)

func initStaticFile(app *gin.Engine) {

	defer func() {
		if r := recover(); r != nil {
		}
	}()

	app.LoadHTMLGlob("dist/index.html") // 添加入口index.html
	//r.LoadHTMLFiles("dist//*") // 添加资源路径
	app.Static("/assets", "./dist/assets")
	app.Static("/misc", "./dist/misc")
	app.Static("/static/js", "./dist/static/js")                         // 添加资源路径
	app.Static("/static/css", "./dist/static/css")                       // 添加资源路径
	app.Static("/static/img", "./dist/static/img")                       // 添加资源路径
	app.Static("/static/fonts", "./dist/static/fonts")                   // 添加资源路径
	app.Static("/static/media", "./dist/static/media")                   // 添加资源路径
	app.StaticFile("/favicon.ico", "./dist/favicon.ico")                 // 添加资源路径
	app.StaticFile("/asset-manifest.json", "./dist/asset-manifest.json") // 添加资源路径
	app.StaticFile("/", "./dist/index.html")
}

func initRouter(router *gin.RouterGroup) {
	lobbyServerApi := api.LobbyServerApi{}
	router.GET("/lobby/server/query", lobbyServerApi.QueryLobbyServerList)
	router.GET("/lobby/server/query/detail", lobbyServerApi.QueryLobbyServerDetail)
	router.GET("/lobby/server/query/player", lobbyServerApi.QueryPlayer)

	router.GET("/lobby/server/query/history", lobbyServerApi.QueryHistoryPlayersCount)
}

func NewRoute() *gin.Engine {
	app := gin.Default()
	router := app.Group("")
	initStaticFile(app)
	initRouter(router)
	return app
}
