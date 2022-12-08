# datapadofficial-assessment-backend

    deno run --allow-read --allow-env --allow-net --watch ./src/app.ts

## Avg. Revenue by Brand
    id=revenue
    dimensions=brand
    aggregate=avg

## Weekly Sessions
    id=sessions
    dimensions=date.weeknum
    aggregate=distinct

## Daily Conversion Date %
    id=conversion
    dimensions=date
    aggregate=distinct

## Net Revenue of Each Customer
    id=net-revenue
    dimensions=customer
    aggregate=sum
    filter.date.from=2020-09-10
    filter.date.to=2020-09-15