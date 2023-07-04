package api

import (
	"dst-lobby-server/database"
	"dst-lobby-server/global"
	"dst-lobby-server/lobbyServer"
	"fmt"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strconv"
)

type LobbyServerApi struct {
}

func (l *LobbyServerApi) QueryLobbyServerList(ctx *gin.Context) {

	db := global.LobbyServer.DB2
	db2 := global.LobbyServer.DB2

	if addr, isExist := ctx.GetQuery("__addr"); isExist {
		db = db.Where("addr = ?", addr)
		db2 = db2.Where("addr = ?", addr)
	}
	if rowID, isExist := ctx.GetQuery("__rowId"); isExist {
		db = db.Where("row_id = ?", rowID)
		db2 = db2.Where("row_id = ?", rowID)
	}
	if host, isExist := ctx.GetQuery("host"); isExist {
		db = db.Where("host = ?", host)
		db2 = db2.Where("host = ?", host)
	}
	if clanonly, isExist := ctx.GetQuery("clanonly"); isExist {
		db = db.Where("clanonly = ?", clanonly)
		db2 = db2.Where("clanonly = ?", clanonly)
	}
	if mods, isExist := ctx.GetQuery("mods"); isExist {
		db = db.Where("mods = ?", mods)
		db2 = db2.Where("mods = ?", mods)
	}
	if name, isExist := ctx.GetQuery("name"); isExist {
		db = db.Where("name like ?", "%"+name+"%")
		db2 = db2.Where("name like ?", "%"+name+"%")
	}
	if pvp, isExist := ctx.GetQuery("pvp"); isExist {
		db = db.Where("pvp = ?", pvp)
		db2 = db2.Where("pvp = ?", pvp)
	}
	if platform, isExist := ctx.GetQuery("platform"); isExist {
		if p, err := strconv.Atoi(platform); err == nil {
			db = db.Where("platform = ?", p)
			db2 = db2.Where("platform = ?", p)
		}
	}
	if password, isExist := ctx.GetQuery("password"); isExist {
		if p, err := strconv.Atoi(password); err == nil {
			db = db.Where("password = ?", p)
			db2 = db2.Where("password = ?", p)
		}
	}
	if season, isExist := ctx.GetQuery("season"); isExist {
		db = db.Where("season = ?", season)
		db2 = db2.Where("season = ?", season)
	}
	if mode, isExist := ctx.GetQuery("mode"); isExist {
		db = db.Where("mode = ?", mode)
		db2 = db2.Where("mode = ?", mode)
	}

	page, size := RequestPage(ctx)
	db = db.Order("created_at desc").Limit(size).Offset((page - 1) * size)

	lobbyHomeList := make([]lobbyServer.LobbyHome, 0)
	if err := db.Find(&lobbyHomeList).Error; err != nil {
		fmt.Println(err.Error())
	}

	var total int64
	db2.Model(&lobbyServer.LobbyHome{}).Count(&total)

	totalPages := total / int64(size)
	if total%int64(size) != 0 {
		totalPages++
	}

	ctx.JSON(http.StatusOK, Response{
		Code: 200,
		Msg:  "success",
		Data: Page{
			Data:       lobbyHomeList,
			Page:       page,
			Size:       size,
			Total:      total,
			TotalPages: totalPages,
		},
	})
}

func (l *LobbyServerApi) QueryLobbyServerDetail(ctx *gin.Context) {

	//获取查询参数
	region := ctx.Query("region")
	rowId := ctx.Query("rowId")

	homeDetail := global.LobbyServer.QueryLobbyHomeInfo(region, rowId)
	ctx.JSON(http.StatusOK, Response{
		Code: 200,
		Msg:  "success",
		Data: homeDetail,
	})

}

func (l *LobbyServerApi) QueryPlayer(ctx *gin.Context) {
	//获取查询参数
	name := ctx.Query("name")
	region := ctx.Query("region")
	lobbyHomeDetails := global.LobbyServer.QueryPlayer(region, name)
	ctx.JSON(http.StatusOK, Response{
		Code: 200,
		Msg:  "success",
		Data: lobbyHomeDetails,
	})

}

func (l *LobbyServerApi) QueryHistoryPlayersCount(ctx *gin.Context) {

	addr := ctx.Query("addr")
	port := ctx.Query("port")
	rowId := ctx.Query("rowId")
	startDate, endDate, u := DateRange(ctx)
	log.Println(addr, port, rowId, startDate, endDate, u)

	type history struct {
		Date           string `json:"date"`
		RowId          string `json:"rowId"`
		Addr           string `json:"addr"`
		Port           string `json:"port"`
		Name           string `json:"name"`
		Maxconnections int    `json:"maxconnections"`
		Connected      int    `json:"connected"`
	}
	var data []history
	db := database.DB
	db.Raw("select strftime('%Y-%m-%d %H:%M', datetime(created_at, 'localtime', 'utc')) AS date,row_id,addr, port, name, maxconnections, connected from lobby_home_briefs where created_at between ? and ? and row_id = ? group by date", startDate, endDate, rowId).Scan(&data)
	ctx.JSON(http.StatusOK, Response{
		Code: 200,
		Msg:  "success",
		Data: data,
	})
}
