---
lang: 'en'
slug: '/88A3F5'
---

- [Elo Rating](https://matt-rickard.ghost.io/elo-rating/)

If a higher-rated player beats a lower-rated player, their rating will go up, while the loser's rating will go down. Improving Elo is relatively easy but usually comes at the cost of complexity.

[[Probability]]

```
New rating = Old rating + K * (outcome - expected outcome)

where:
- New rating is the updated rating after the game
- Old rating is the player's rating before the game
- K is a constant that determines the weight of the outcome on the rating
- Outcome is the actual result of the game (1 for a win, 0 for a loss, 0.5 for a draw)
- The expected outcome is the probability of the player winning, calculated using the following formula:

Expected outcome = 1 / (1 + 10^((opponent's rating - player's rating) / 400))
```

```py
# Define a function to calculate the Elo rating for each player
def calculate_elo(player_A, player_B, result):
  # Set the basic parameters for the Elo calculation
  K = 32
  RA = player_A.rating
  RB = player_B.rating

  # Calculate the expected score for each player
  EA = 1 / (1 + 10**((RB - RA) / 400))
  EB = 1 / (1 + 10**((RA - RB) / 400))

  # Update the player's rating based on the actual result
  if result == "A":
    RA = RA + K * (1 - EA)
    RB = RB + K * (0 - EB)
  elif result == "B":
    RA = RA + K * (0 - EA)
    RB = RB + K * (1 - EB)
  elif result == "T":
    RA = RA + K * (0.5 - EA)
    RB = RB + K * (0.5 - EB)

  # Set the updated ratings for each player
  player_A.rating = RA
  player_B.rating = RB
```

## Use Cases

- Matching players in online multiplayer games
- Ranking professional sports teams or players
- Evaluating the performance of political candidates in an election
- Predicting the success of romantic relationships in online dating (Zuckerberg allegedly used Elo in his "Face Mash" app to rank students).
- Ranking the quality of restaurants or other businesses based on customer ratings and reviews

## Shortcomings

- Players who stop playing to keep their rating
- Selective match-making, where players seek out players that are overrated and avoid underrated players
- Inability to compare across periods, as ratings may be inflated or deflated over time.
