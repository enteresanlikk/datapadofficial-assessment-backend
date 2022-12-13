# Datapad Backend Assessment

Original assessment repository: [Datapad Backend Assessment](https://github.com/datapadofficial/assessment-backend)

## Requirements
- Deno - [Install](https://deno.land/manual/getting_started/installation)
- Google Sheet API Key - [Create API Key](https://handsondataviz.org/google-sheets-api-key.html)
- Docker - [Install](https://docs.docker.com/engine/install/)
- Docker Compose - [Install](https://docs.docker.com/compose/install/)

## Project Setup and Run
- Clone this repository `git clone https://github.com/enteresanlikk/datapadofficial-assessment-backend.git`
- Go to the project directory `cd datapadofficial-assessment-backend`
- `.env.example` file rename to `.env` and fill the `Google Sheet API Key` value
- Open terminal/powershell in the project directory
- Write command and run project (your choice)
	- With docker `docker-compose up -d`
	- Without docker `deno run --allow-read --allow-env --allow-net ./src/app.ts`

## Scripts
Start: 
```bash
deno run --allow-read --allow-env --allow-net ./src/app.ts
```

Watch:
```bash
deno run --allow-read --allow-env --allow-net --watch ./src/app.ts
```

Docker:
```bash
docker-compose up -d
```

## API Information
### Avg. Revenue by Brand
    id=revenue
    dimensions=brand
    aggregate=avg

Request:
```http
GET /metrics?id=revenue&dimensions=brand&aggregate=avg
```
OR
```http
GET /metrics2?id=revenue&dimensions=brand&aggregate=avg
```

Response:
```json
{
	"metric": "revenue",
	"dimensions": [
		"brand"
	],
	"aggregation": "avg",
	"data": {
		"Supermicro": [
			{
				"value": "298.52"
			}
		],
		"Logitech": [
			{
				"value": "57.06"
			}
		],
		"Zyxel": [
			{
				"value": "178.44"
			}
		],
		"Samsung": [
			{
				"value": "91.84"
			}
		]
	}
}
```

### Weekly Sessions
    id=sessions
    dimensions=date.weeknum
    aggregate=distinct

Request:
```http
GET /metrics?id=sessions&dimensions=date.weeknum&aggregate=distinct
```
OR
```http
GET /metrics2?id=sessions&dimensions=date.weeknum&aggregate=distinct
```

Response:
```json
{
	"metric": "sessions",
	"dimensions": [
		"date.weeknum"
	],
	"aggregation": "distinct",
	"data": {
		"39": [
			{
				"value": "8175"
			}
		],
		"40": [
			{
				"value": "18361"
			}
		],
		"41": [
			{
				"value": "17971"
			}
		],
		"42": [
			{
				"value": "21294"
			}
		],
		"43": [
			{
				"value": "24709"
			}
		],
		"44": [
			{
				"value": "24972"
			}
		],
		"45": [
			{
				"value": "2914"
			}
		]
	}
}
```

### Daily Conversion Date %
    id=conversion
    dimensions=date
    aggregate=distinct

Request:
```http
GET /metrics?id=conversion&dimensions=date&aggregate=distinct
```
OR
```http
GET /metrics2?id=conversion&dimensions=date&aggregate=distinct
```

Response:
```json
{
	"metric": "conversion",
	"dimensions": [
		"date"
	],
	"aggregation": "distinct",
	"data": {
		"2020-09-24": [
			{
				"sessions": 1371,
				"purchases": 40,
				"value": "2.92"
			}
		],
		"2020-10-11": [
			{
				"sessions": 2478,
				"purchases": 68,
				"value": "2.74"
			}
		],
		"2020-09-25": [
			{
				"sessions": 2513,
				"purchases": 75,
				"value": "2.98"
			}
		],
		"2020-09-29": [
			{
				"sessions": 2863,
				"purchases": 93,
				"value": "3.25"
			}
		],
		"2020-11-02": [
			{
				"sessions": 2914,
				"purchases": 78,
				"value": "2.68"
			}
		]
	}
}
```

### Net Revenue of Each Customer
    id=net-revenue
    dimensions=customer
    aggregate=sum
    filter.date.from=2020-09-10
    filter.date.to=2021-09-15

Request:
```http
GET /metrics?id=net-revenue&dimensions=customer&aggregate=sum&filter.date.from=2020-09-10&filter.date.to=2021-09-15
```
OR
```http
GET /metrics2?id=net-revenue&dimensions=customer&aggregate=sum&filter.date.from=2020-09-10&filter.date.to=2021-09-15
```

Response:
```json
{
	"metric": "net-revenue",
	"dimensions": [
		"customer"
	],
	"aggregation": "sum",
	"filter": {
		"date": {
			"from": "2020-09-10",
			"to": "2021-09-15"
		}
	},
	"data": {
		"1515915625519390468": [
			{
				"value": "217.57"
			}
		],
		"1515915625513574486": [
			{
				"value": "616.75"
			}
		],
		"1515915625518130982": [
			{
				"value": "178.44"
			}
		],
		"1515915625519356010": [
			{
				"value": "206.81"
			}
		],
		"1515915625519401159": [
			{
				"value": "11.86"
			}
		],
		"1515915625513574581": [
			{
				"value": "123.35"
			}
		],
		"1515915625470995608": [
			{
				"value": "33.08"
			}
		],
		"1515915625519406565": [
			{
				"value": "36.03"
			}
		]
	}
}
```