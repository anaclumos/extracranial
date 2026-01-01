---
lang: 'en'
slug: /EA9F85
---

CLI

```bash
incl auth login
```

```bash
incl config set --docker-image lunit/insight-ai-br:latest
```

```bash
incl config set --machine-type n2-standard-2
```

## BE on Mac (WIP)

```bash
gcloud compute ssh --zone "asia-northeast3-c" "sunghyun-cho" --project "ai-research-322406"
```

```bash
brew install mysql
export LIBRARY_PATH=$LIBRARY_PATH:$(brew --prefix zstd)/lib/
gcloud init

```

## Client

```bash
uv pip install --requirements requirements.txt
uv pip install --requirements sdk/requirements.txt
uv pip install -e .
```

## Backend

```bash
uv pip install --requirements django/requirements.txt
```

## Status

```bash
docker ps -a | grep incl
```

## Build

```bash
docker compose up -d --build
```

## Test

```bash
docker exec -it incl-backend-django-1 bash
```

```bash
python manage.py test
```

```bash
python manage.py test --settings incl.test_settings core.tests.test_job_view_kill
```

<details>
<summary>Setups</summary>

```
echo "deb [signed-by=/usr/share/keyrings/cloud.google.gpg] https://packages.cloud.google.com/apt cloud-sdk main" | tee -a /etc/apt/sources.list.d/google-cloud-sdk.list
curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | apt-key --keyring /usr/share/keyrings/cloud.google.gpg add -
apt-get update && apt-get install google-cloud-sdk -y
gcloud auth configure-docker asia-northeast3-docker.pkg.dev
```

</details>

## Authenticating on Gcloud ADC

```
gcloud auth login --update-adc
```
