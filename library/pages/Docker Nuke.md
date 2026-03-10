---
slug: /95F21A
last_modified: 2025-04-29T00:00:00.000Z
---

```bash
docker compose down -v --remove-orphans; docker stop $(docker ps -q); docker rm -f $(docker ps -aq); docker rmi -f $(docker images -aq); docker volume rm -f $(docker volume ls -q); docker network rm $(docker network ls -q | grep -vE 'bridge|host|none'); docker builder prune -af;
```
