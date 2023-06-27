package api

import (
	"github.com/gin-gonic/gin"
	"strconv"
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
