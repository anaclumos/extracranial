---
lang: 'en'
slug: /EA9F85
---

CLI

```
incl auth login
```

```
incl config set --docker-image lunit/insight-ai-br:latest
```

```
incl config set --machine-type n2-standard-2
```

## BE on Mac (WIP)

```
gcloud compute ssh --zone "asia-northeast3-c" "sunghyun-cho" --project "ai-research-322406"
```

```
brew install mysql
export LIBRARY_PATH=$LIBRARY_PATH:$(brew --prefix zstd)/lib/
gcloud init
```

```
uv python install 3.10
uv python pin 3.10
uv venv
source .venv/bin/activate
uv pip install --requirements django/requirements.txt
```

## Status

```
docker ps -a | grep incl
```

## Build

```
docker compose up -d --build
```

## Test

```
docker exec -it incl-backend-django-1 bash
```

```
python manage.py test
```

```
python manage.py test --settings incl.test_settings core.tests.test_job_view_kill
```

<details>

<summary>

Setups

</summary>

```
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
apt-get update && apt-get install google-cloud-sdk -y
gcloud auth configure-docker asia-northeast3-docker.pkg.dev
```

</details>
