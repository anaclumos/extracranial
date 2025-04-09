---
lang: 'en'
slug: '/95F21A'
---

```bash
docker compose down -v --remove-orphans; docker stop $(docker ps -q); docker rm -f $(docker ps -aq); docker rmi -f $(docker images -aq); docker volume rm -f $(docker volume ls -q); docker network rm $(docker network ls -q | grep -vE 'bridge|host|none'); docker builder prune -af;
```
