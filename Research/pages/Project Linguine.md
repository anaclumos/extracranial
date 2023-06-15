---
lang: 'en'
slug: '/C1CF90'
---

Project Linguine is an initiative to define a deterministic list (i.e., the Linguine Recipe) to cover all linguistic [[Sprachraum]]. That is,

> How many people around the world do not speak any of the languages defined in Linguine?

... should be near zero.

## Candidate 1. [[BCP 47]]

- Pro: Much simpler, probably more practical
- Con: the format is slightly ugly

| Language Tag | Language   | Region             | Description                                             |
| ------------ | ---------- | ------------------ | ------------------------------------------------------- |
| ar-SA        | Arabic     | Saudi Arabia       | Arabic (Saudi Arabia)                                   |
| bn-BD        | Bangla     | Bangladesh         | Bangla (Bangladesh)                                     |
| bn-IN        | Bangla     | India              | Bangla (India)                                          |
| cs-CZ        | Czech      | Czech Republic     | Czech (Czech Republic)                                  |
| da-DK        | Danish     | Denmark            | Danish (Denmark)                                        |
| de-AT        | German     | Austria            | Austrian German                                         |
| de-CH        | German     | Switzerland        | "Swiss" German                                          |
| de-DE        | German     | Germany            | Standard German (as spoken in Germany)                  |
| el-GR        | Greek      | Greece             | Modern Greek                                            |
| en-AU        | English    | Australia          | Australian English                                      |
| en-CA        | English    | Canada             | Canadian English                                        |
| en-GB        | English    | United Kingdom     | British English                                         |
| en-IE        | English    | Ireland            | Irish English                                           |
| en-IN        | English    | India              | Indian English                                          |
| en-NZ        | English    | New Zealand        | New Zealand English                                     |
| en-US        | English    | United States      | US English                                              |
| en-ZA        | English    | South Africa       | English (South Africa)                                  |
| es-AR        | Spanish    | Argentina          | Argentine Spanish                                       |
| es-CL        | Spanish    | Chile              | Chilean Spanish                                         |
| es-CO        | Spanish    | Columbia           | Colombian Spanish                                       |
| es-ES        | Spanish    | Spain              | Castilian Spanish (as spoken in Central-Northern Spain) |
| es-MX        | Spanish    | Mexico             | Mexican Spanish                                         |
| es-US        | Spanish    | United States      | American Spanish                                        |
| fi-FI        | Finnish    | Finland            | Finnish (Finland)                                       |
| fr-BE        | French     | Belgium            | Belgian French                                          |
| fr-CA        | French     | Canada             | Canadian French                                         |
| fr-CH        | French     | Switzerland        | "Swiss" French                                          |
| fr-FR        | French     | France             | Standard French (especially in France)                  |
| he-IL        | Hebrew     | Israel             | Hebrew (Israel)                                         |
| hi-IN        | Hindi      | India              | Hindi (India)                                           |
| hu-HU        | Hungarian  | Hungary            | Hungarian (Hungary)                                     |
| id-ID        | Indonesian | Indonesia          | Indonesian (Indonesia)                                  |
| it-CH        | Italian    | Switzerland        | "Swiss" Italian                                         |
| it-IT        | Italian    | Italy              | Standard Italian (as spoken in Italy)                   |
| ja-JP        | Japanese   | Japan              | Japanese (Japan)                                        |
| ko-KR        | Korean     | Republic of Korea  | Korean (Republic of Korea)                              |
| nl-BE        | Dutch      | Belgium            | Belgian Dutch                                           |
| nl-NL        | Dutch      | The Netherlands    | Standard Dutch (as spoken in The Netherlands)           |
| no-NO        | Norwegian  | Norway             | Norwegian (Norway)                                      |
| pl-PL        | Polish     | Poland             | Polish (Poland)                                         |
| pt-BR        | Portugese  | Brazil             | Brazilian Portuguese                                    |
| pt-PT        | Portugese  | Portugal           | European Portuguese (as written and spoken in Portugal) |
| ro-RO        | Romanian   | Romania            | Romanian (Romania)                                      |
| ru-RU        | Russian    | Russian Federation | Russian (Russian Federation)                            |
| sk-SK        | Slovak     | Slovakia           | Slovak (Slovakia)                                       |
| sv-SE        | Swedish    | Sweden             | Swedish (Sweden)                                        |
| ta-IN        | Tamil      | India              | Indian Tamil                                            |
| ta-LK        | Tamil      | Sri Lanka          | Sri Lankan Tamil                                        |
| th-TH        | Thai       | Thailand           | Thai (Thailand)                                         |
| tr-TR        | Turkish    | Turkey             | Turkish (Turkey)                                        |
| zh-CN        | Chinese    | China              | Mainland China, simplified characters                   |
| zh-HK        | Chinese    | Hond Kong          | Hong Kong, traditional characters                       |
| zh-TW        | Chinese    | Taiwan             | Taiwan, traditional characters                          |

## Candidate 2. Ethnologue 200

- Pro: Super-maximalist; no one will make requests now
- Con: Some locale variants are missing, such as Taiwanese

| ISO_639 | Language_Name           | Uninverted_Name        | L1_Users  | All_Users  |
| ------- | ----------------------- | ---------------------- | --------- | ---------- |
| eng     | English                 | English                | 379007140 | 1132366680 |
| cmn     | Chinese, Mandarin       | Mandarin Chinese       | 917868640 | 1116596640 |
| hin     | Hindi                   | Hindi                  | 341208640 | 615475540  |
| spa     | Spanish                 | Spanish                | 460093030 | 534335730  |
| fra     | French                  | French                 | 77177210  | 279821930  |
| arb     | Arabic, Standard        | Standard Arabic        | 0         | 273989700  |
| ben     | Bengali                 | Bengali                | 228289600 | 265042480  |
| rus     | Russian                 | Russian                | 153746530 | 258227760  |
| por     | Portuguese              | Portuguese             | 220762620 | 234168620  |
| ind     | Indonesian              | Indonesian             | 43364600  | 198733600  |
| urd     | Urdu                    | Urdu                   | 68622980  | 170208780  |
| deu     | German, Standard        | Standard German        | 76090520  | 132176520  |
| jpn     | Japanese                | Japanese               | 128229330 | 128350830  |
| swh     | Swahili                 | Swahili                | 16027740  | 98327740   |
| mar     | Marathi                 | Marathi                | 83112800  | 95312800   |
| tel     | Telugu                  | Telugu                 | 82040340  | 93040340   |
| pnb     | Punjabi, Western        | Western Punjabi        | 92725700  | 92725700   |
| wuu     | Chinese, Wu             | Wu Chinese             | 81437890  | 81501290   |
| tam     | Tamil                   | Tamil                  | 75039130  | 80989130   |
| tur     | Turkish                 | Turkish                | 79399060  | 79779360   |
| kor     | Korean                  | Korean                 | 77264890  | 77264890   |
| vie     | Vietnamese              | Vietnamese             | 75950770  | 76950770   |
| yue     | Chinese, Yue            | Yue Chinese            | 73136610  | 73538610   |
| jav     | Javanese                | Javanese               | 68277600  | 68277600   |
| ita     | Italian                 | Italian                | 64844820  | 67894920   |
| arz     | Arabic, Egyptian Spoken | Egyptian Spoken Arabic | 64618100  | 64618100   |
| hau     | Hausa                   | Hausa                  | 43928100  | 63428100   |
| tha     | Thai                    | Thai                   | 20657660  | 60657660   |
| guj     | Gujarati                | Gujarati               | 56408970  | 60588970   |
| ...     | ...                     | ...                    | ...       | ...        |
