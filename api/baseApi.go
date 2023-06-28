package api

import (
	"github.com/gin-gonic/gin"
	"strconv"
	"time"
)

type Response struct {
	Code int         `json:"code"` //提示代码
	Msg  string      `json:"msg"`  //提示信息
	Data interface{} `json:"data"` //数据
}

type Page struct {
	Data       interface{} `json:"data"`
	Total      int64       `json:"total"`
	TotalPages int64       `json:"totalPages"`
	Page       int         `json:"page"`
	Size       int         `json:"size"`
}

func RequestPage(ctx *gin.Context) (int, int) {
	page, _ := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	size, _ := strconv.Atoi(ctx.DefaultQuery("size", "10"))
	if page <= 0 {
		page = 1
	}
	if size < 0 {
		size = 10
	}
	return page, size
}

type DateUint string

var (
	Year   DateUint = "year"
	Month  DateUint = "month"
	Day    DateUint = "day"
	Hour   DateUint = "hour"
	Minute DateUint = "minute"
)

func DateRange(ctx *gin.Context) (time.Time, time.Time, DateUint) {
	var date1, date2 time.Time
	if t, isExist := ctx.GetQuery("startDate"); isExist {
		date1, _ = time.Parse("2006-01-02T15:04:05.000Z", t)
	}
	if t, isExist := ctx.GetQuery("endDate"); isExist {
		date2, _ = time.Parse("2006-01-02T15:04:05.000Z", t)
	}
	unit := ctx.Query("unit")
	return date1, date2, DateUint(unit)
}
