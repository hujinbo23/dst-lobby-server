package api

import (
	"encoding/json"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"net/http"
	"net/url"
	"sync"
)

var steamAPIKey = "73DF9F781D195DFD3D19DED1CB72EEE6"

type ModApi struct {
}

func (m *ModApi) QueryMod(ctx *gin.Context) {

	var body struct {
		ModIds []string `json:"mod_ids"`
	}

	ctx.ShouldBind(&body)

	var wg sync.WaitGroup
	var modList []map[string]interface{}

	for i := range body.ModIds {
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			mod := m.queryModRequest(body.ModIds[i])
			modList = append(modList, mod)
		}(i)
	}

	wg.Wait()
	ctx.JSON(http.StatusOK, Response{
		Code: 200,
		Msg:  "success",
		Data: modList,
	})

}

func (m *ModApi) queryModRequest(modId string) map[string]interface{} {
	urlStr := "http://api.steampowered.com/IPublishedFileService/GetDetails/v1/"
	data := url.Values{}
	data.Set("key", steamAPIKey)
	data.Set("language", "6")
	data.Set("publishedfileids[0]", modId)
	urlStr = urlStr + "?" + data.Encode()

	req, err := http.NewRequest("GET", urlStr, nil)
	if err != nil {
		log.Panicln(err)
	}

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		log.Panicln(err)
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {

		}
	}(resp.Body)

	var result map[string]interface{}
	err = json.NewDecoder(resp.Body).Decode(&result)
	if err != nil {
		log.Panicln(err)
	}

	dataList, ok := result["response"].(map[string]interface{})["publishedfiledetails"].([]interface{})
	if !ok || len(dataList) == 0 {
		log.Panicln("get mod error")
	}
	return dataList[0].(map[string]interface{})

}
