package utils

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"os"

	_ "github.com/go-sql-driver/mysql"
)

type dbConfig struct {
	DBUserName string `json:"dbUserName"`
	DBPassWord string `json:"dbPassWord"`
	DBName string `json:"dbName"`
}

func OpenMySQL() (*sql.DB , error){
	configFile := "dbConfig.json"
	config, err := LoadDBConfig(configFile)
	if err != nil {
		return nil, err
	}
	db, err := sql.Open("mysql", fmt.Sprintf("%s:%s@tcp(127.0.0.1:3306)/%s", config.DBUserName, config.DBPassWord, config.DBName))
	if err != nil {
		return nil, err
	}
	return db, nil
}

func LoadDBConfig(configFile string) (dbConfig, error){
	var dbConfig dbConfig
	file, err := os.Open(configFile)
	if err != nil {
		return dbConfig, err
	}
	defer file.Close()
	decoder := json.NewDecoder(file)
	err = decoder.Decode(&dbConfig)
	if err != nil {
		return dbConfig, err
	}
	return dbConfig, nil
}
