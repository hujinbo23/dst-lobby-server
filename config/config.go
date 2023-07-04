package config

import (
	"fmt"
	"gopkg.in/yaml.v3"
	"os"
)

type Config struct {
	Port     string `yaml:"port"`
	Interval struct {
		Collect    int64 `yaml:"collect"`
		Statistics int64 `yaml:"statistics"`
	} `yaml:"interval"`

	Database struct {
		LogLevel     int  `yaml:"logLevel"`
		EnableMemory bool `yaml:"enableMemory"`
	} `yaml:"database"`
}

func NewConfig(filepath string) *Config {
	yamlFile, err := os.ReadFile(filepath)
	if err != nil {
		fmt.Println(err.Error())
	}
	var _config *Config
	err = yaml.Unmarshal(yamlFile, &_config)
	if err != nil {
		fmt.Println(err.Error())
	}
	if _config.Interval.Collect == 0 {
		_config.Interval.Collect = 120
	}
	if _config.Interval.Statistics == 0 {
		_config.Interval.Statistics = 600
	}
	return _config
}
