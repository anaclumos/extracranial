---
lang: 'ko'
slug: '/981439'
---

This post is AI Researched by GPT 5.2 Pro Extended Thinking

## Neon

핵심 리스크는 "서버리스 Postgres"라는 구조적 복잡도다. 일반적인 Postgres 한 대(또는 HA 클러스터)와 달리, 연결, 콜드스타트, 오토스케일, 스토리지 계층이 끼어들면서 꼬일 지점이 늘어난다.

1. 장애/복구 신뢰도 리스크(특히 2023년 Q4)
   - "2023년 Q4 몇 달 동안 프로덕션 DB가 여러 번 내려갔고, 한 번은 며칠 걸려서 완전히 해결됐다. 그 후 한 달쯤 뒤 가격도 크게 올렸다"는 강한 불신 서술이 있다. Neon CEO가 Q4 불안정성을 인정하고(인기 급증으로 불안정했음) 'preview'로 둔 이유라고 답한다.
     - [HN 코멘트(장애, 복구, 가격 인상 언급 + CEO 답변)](https://news.ycombinator.com/item?id=40072426)
   - 같은 GA 스레드에서 "Q4 2023에 2.5개월 동안 '12개의 significant outage'가 있었다"는 지적이 나온다(외부 링크 인용 형태).
     - [Neon GA 스레드](https://news.ycombinator.com/item?id=40040593)
2. "서버리스답게" 연결이 흔들리는 유형의 문제
   - 무료 티어에서 "몇 분 비활성 후 idle로 내려가고, 그 뒤 첫 요청이 연결 실패하는 경우가 있다"는 실사용 보고가 있다. 엔지니어는 "수 초면 regress"라고 답하지만, 요지는 '콜드스타트/풀링 설정 실수로 연결 실패가 실제로 나온다'는 점이다.
     - [Neon GA 스레드(콜드스타트/첫 연결 실패/풀 설정 언급)](https://news.ycombinator.com/item?id=40040593)
3. 상태 페이지/투명성 논란
   - "상태 페이지 퍼센트 숨긴 것 아니냐"는 의심이 나오고, Neon 엔지니어가 "다운이 많아서 숨긴 게 아니라 계산이 틀려서 숨겼고, Snowflake처럼 재구성 중"이라고 답한다. 투명성을 강조하지만, 고위험 의사결정 관점에서는 "상태 지표가 신뢰를 잃은 전력이 있다"로 읽힌다.
     - [Neon GA 스레드(상태 페이지 계산/숨김 논쟁)](https://news.ycombinator.com/item?id=40040593)
4. 인수 이후의 공급자 리스크(Neon 자체가 아니라 '소유주' 리스크)
   - Databricks가 Neon을 인수했다는 스레드에서 "가격 올리거나 망가뜨릴 것" 같은 불신이 노골적으로 나온다. 과장 섞인 감정도 있지만, "장기적으로 제품 방향/가격/우선순위가 바뀔 수 있다"는 리스크 자체는 실재한다.
     - [Databricks acquires Neon (HN)](https://news.ycombinator.com/item?id=43982777)
   - 같은 맥락에서 "Databricks가 bit.io를 인수했고 30일 내 DB를 종료했다"는 언급이 반복된다. 사실관계는 별개로, 고객들이 '인수→폐쇄/강제 마이그레이션' 시나리오를 실제로 떠올린다는 점이 리스크다.
     - [HN 코멘트(bit.io 30일 종료 언급)](https://news.ycombinator.com/item?id=43983253)

Neon은 "서버리스/브랜칭/스케일투제로"를 반드시 써서 돈을 버는 구조(브랜치 기반 워크플로우, 미리보기 환경 폭발, 데이터 복제/실험이 핵심)라면 후보가 된다. 반대로 "그냥 OLTP Postgres"에 수백만 달러를 걸면, 과거 Q4 장애 서술 + 서버리스 연결 실패 유형 + 인수 리스크가 한 번에 얹힌다.

## PlanetScale Postgres Metal

PlanetScale의 Postgres(Metal)는 방향이 정반대다. "서버리스 신기능" 대신 "빠른 로컬 NVMe + 복제 + 운영"에 베팅한다. 대신 하드웨어/복제 설계의 전제가 명확하고(에페메랄 NVMe), 그 전제가 깨질 때의 모델도 드러나 있다.

1. 내구성(ack) 모델이 비교적 명시적
   - "호스트 컴퓨트가 영구적으로 죽으면 NVMe 데이터는 복구 불가(우리가 접근할 API가 없다)"라고 직원이 명시한다. 즉 '로컬 디스크 성능'을 쓰는 대신, 데이터 생존은 복제에 의존한다는 전제가 공개돼 있다.
   - "semi-synchronous replication"을 설명하면서, "2개 replica 중 1개가 durable storage에 저장했다고 ack하면 primary가 클라이언트에 ack한다"는 식의 모델을 말한다(결과적으로 2 AZ 내구성 주장).
     - [HN 코멘트(에페메랄 NVMe + semi-sync 설명)](https://news.ycombinator.com/item?id=45337148)
2. 실사용 마이그레이션에서 성능/지원 체감 증언
   - "주말에 PlanetScale Postgres Metal로 마이그레이션했고 쿼리 성능이 크게 좋아졌다. 토요일 아침에도 팀이 바로 붙어서 도와줬다. Insights가 누락 인덱스를 잡아줬다"는 보고가 있다.
     - [PlanetScale Postgres GA 스레드(마이그레이션/성능/지원 증언)](https://news.ycombinator.com/item?id=45334545)
3. 원격 DB의 물리 지연(latency) 논쟁은 현실
   - 같은 스레드에서 "클라우드라 해도 지연은 현실이고, 트랜잭션 라운드트립이 병목이 된다"는 반박이 붙는다. 즉 PlanetScale이 '빠른 디스크'여도 앱-DB 거리 설계 실패하면 끝이다.
     - [PlanetScale Postgres GA 스레드(지연 논쟁)](https://news.ycombinator.com/item?id=45334545)
4. 사업/요금/신뢰 리스크는 존재
   - "수익성 우선 전환/감원" 스레드가 있다. 작은 공급자에 돈을 거는 순간, 조직 변화는 장애 대응력/제품 우선순위/가격에 영향을 준다.
     - [PlanetScale layoff & profitability (HN)](https://news.ycombinator.com/item?id=39618815)
   - "무료 DB 잠금" 및 "무료 티어 종료" 관련 불만도 있다. 대기업 유료 계약과는 성격이 다르지만, "정책/가격이 변한다"는 전력으로는 남는다.
     - [PlanetScale is locking people out of their free databases (HN)](https://news.ycombinator.com/item?id=39418583)
     - [PlanetScale Offering $5 Databases (HN)](https://news.ycombinator.com/item?id=45761027)

PlanetScale은 "기능 혁신"이 아니라 "성능/복제/운영"으로 먹고 사는 설계다. HN에서 보이는 논쟁도 대부분 그 축(로컬 NVMe, semi-sync, 지연, 운영 모델)이다. 수백만 달러 베팅의 관점에서는 Neon류 '서버리스 복잡도'보다 방어적이다. 다만 공급자 규모/정책 변경 리스크는 남는다.

## Render Postgres

Render는 DB 회사라기보다 PaaS 성격이 강하고, 그래서 DB도 "플랫폼 전체 장애"에 같이 빨려 들어가는 패턴이 치명적이다.

1. 플랫폼 광역 장애 + 상태 페이지 신뢰 문제
   - "Render Is Down" 스레드에서 서비스 전반 장애가 보고되고, "상태 페이지 자동 체크가 100% 업타임으로 찍히는데 실제는 완전 오프라인" 같은 불만이 나온다. CEO도 "자동 업데이트는 어렵다"는 취지로 답한다.
     - [Render Is Down (HN)](https://news.ycombinator.com/item?id=39829602)
2. 계정/서비스 강제 종료 리스크
   - "DB 복원 중 타임아웃이 났고, 대시보드에서 로그아웃된 뒤 서비스가 통째로 내려갔고, 사전 통보가 없었다"는 글이 있다. 사실관계 전부를 외부에서 확정할 수는 없지만, '계정 단위로 DB가 날아갈 수 있다'는 공포를 투자 판단에서 감내하기 어렵다.  
      [Render nuked my entire account with no notice (HN)](https://news.ycombinator.com/item?id=37107298)

Render Postgres는 "싸고 편해서 쓰는" 쪽에 가깝고, "DB에 회사 돈 걸기"에는 꼬리 리스크가 너무 크다.

## Railway Postgres

Railway는 개발자 UX로 유명하지만, HN에서 DB 신뢰도는 '작은/가벼운 용도'라는 톤이 많다.

1. "DB는 프로덕션용이 아니다"라는 직접적인 지적
   - "Railway 자체 문서가 프로덕션 레디가 아니라고 경고한다, 특히 데이터베이스"라는 코멘트가 있다. 이 한 줄이면 고위험 의사결정에서는 끝이다.
     - [Railway 프로덕션 레디 경고 언급 (HN)](https://news.ycombinator.com/item?id=34932526)
2. 실사용도 '소규모' 톤
   - 무료 플랜 Postgres가 "좋았지만 external access와 PostGIS가 없었다"는 언급이 있고, 전반적으로 '잔잔한 용도' 경험담이 많다.
     - [Railway free plan Postgres 경험 (HN)](https://news.ycombinator.com/item?id=36809634)
   - "low-use Postgres/PostGIS에 괜찮다"는 코멘트가 나온다.
     - [Railway는 low-use에 적합하다는 코멘트 (HN)](https://news.ycombinator.com/item?id=35906604)

Railway Postgres는 고액 베팅 대상이 아니다.

## 최종 판단

1. Railway Postgres: 제외. 문서/커뮤니티 톤 자체가 "DB는 프로덕션 보증 대상이 아니다" 쪽이다.
2. Render Postgres: 제외. 플랫폼 광역 장애 + 상태 페이지 신뢰 문제 + 계정/서비스 강제 종료 서술은 치명적이다.
3. Neon: 조건부. 서버리스 기능(브랜칭/스케일투제로)이 사업 핵심이면 선택 가능하지만, Q4 2023 장애 서술과 인수 리스크 때문에 "그냥 OLTP Postgres"로 돈 거는 선택으로는 불리하다.
4. PlanetScale Postgres Metal: 이 4개 중 최저 위험. 에페메랄 NVMe라는 전제와 semi-sync(ack) 모델이 공개돼 있고, 실제 마이그레이션/지원/성능 체감 증언이 있으며, '서버리스 특유의 연결/가격 변동성' 리스크가 상대적으로 적다.
