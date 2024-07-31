---
lang: 'en'
slug: '/8403B5'
---

I overall think it's making a new problem instead of fixing one, but sure it seems like a pattern.

I also prefer TypeScript over

## [FastHTML - Modern web applications in pure Python](https://fastht.ml/)

```
async def weather_table():
	"""Dynamically generated python content
	directly incorporated into the HTML"""
	# These are actual real-time weather.gov observations
	results = await all_weather()
	rows = [Tr(Td(city), *map(Td, d.values()), cls="even:bg-purple/5")
			for city,d in results.items()]
	flds = 'City', 'Temp (C)', 'Wind (kmh)', 'Humidity'
	head = Thead(*map(Th, flds), cls="bg-purple/10")
	return Table(head, *rows, cls="w-full")
```

## [Reflex · Web apps in Pure Python](https://reflex.dev/)

```
def index():
    return rx.hstack(
        rx.button(
            "Decrement",
            color_scheme="ruby",
            on_click=State.decrement,
        ),
        rx.heading(State.count, font_size="2em"),
        rx.button(
            "Increment",
            color_scheme="grass",
            on_click=State.increment,
        ),
        spacing="4",
    )
```
