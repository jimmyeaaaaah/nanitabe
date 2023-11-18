package entities

type Food struct {
	ID     int64    `json:"id"`
	Type   string `json:"type"`
	Name   string `json:"name"`
	Amount int    `json:"amount"`
	Unit   string `json:"unit"`
}