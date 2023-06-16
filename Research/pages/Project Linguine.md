---
lang: 'en'
slug: '/C1CF90'
---

[[Project]] Linguine is an initiative to define a deterministic list (i.e., the **_Linguine Recipe_**) to cover all linguistic [[Sprachraum]]. That is,

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

## Candidate 2. [[Ethnologue 200]]

- Pro: Super-maximalist; no one will make requests now
- Con: Some locale variants are missing, such as Taiwanese

| ISO 639 | Language Name           | Uninverted Name        | L1 Users    | All Users     |
| ------- | ----------------------- | ---------------------- | ----------- | ------------- |
| eng     | English                 | English                | 379,007,140 | 1,132,366,680 |
| cmn     | Chinese, Mandarin       | Mandarin Chinese       | 917,868,640 | 1,116,596,640 |
| hin     | Hindi                   | Hindi                  | 341,208,640 | 615,475,540   |
| spa     | Spanish                 | Spanish                | 460,093,030 | 534,335,730   |
| fra     | French                  | French                 | 77,177,210  | 279,821,930   |
| arb     | Arabic, Standard        | Standard Arabic        | -           | 273,989,700   |
| ben     | Bengali                 | Bengali                | 228,289,600 | 265,042,480   |
| rus     | Russian                 | Russian                | 153,746,530 | 258,227,760   |
| por     | Portuguese              | Portuguese             | 220,762,620 | 234,168,620   |
| ind     | Indonesian              | Indonesian             | 43,364,600  | 198,733,600   |
| urd     | Urdu                    | Urdu                   | 68,622,980  | 170,208,780   |
| deu     | German, Standard        | Standard German        | 76,090,520  | 132,176,520   |
| jpn     | Japanese                | Japanese               | 128,229,330 | 128,350,830   |
| swh     | Swahili                 | Swahili                | 16,027,740  | 98,327,740    |
| mar     | Marathi                 | Marathi                | 83,112,800  | 95,312,800    |
| tel     | Telugu                  | Telugu                 | 82,040,340  | 93,040,340    |
| pnb     | Punjabi, Western        | Western Punjabi        | 92,725,700  | 92,725,700    |
| wuu     | Chinese, Wu             | Wu Chinese             | 81,437,890  | 81,501,290    |
| tam     | Tamil                   | Tamil                  | 75,039,130  | 80,989,130    |
| tur     | Turkish                 | Turkish                | 79,399,060  | 79,779,360    |
| kor     | Korean                  | Korean                 | 77,264,890  | 77,264,890    |
| vie     | Vietnamese              | Vietnamese             | 75,950,770  | 76,950,770    |
| yue     | Chinese, Yue            | Yue Chinese            | 73,136,610  | 73,538,610    |
| jav     | Javanese                | Javanese               | 68,277,600  | 68,277,600    |
| ita     | Italian                 | Italian                | 64,844,820  | 67,894,920    |
| arz     | Arabic, Egyptian Spoken | Egyptian Spoken Arabic | 64,618,100  | 64,618,100    |
| hau     | Hausa                   | Hausa                  | 43,928,100  | 63,428,100    |
| tha     | Thai                    | Thai                   | 20,657,660  | 60,657,660    |
| guj     | Gujarati                | Gujarati               | 56,408,970  | 60,588,970    |
| ...     | ...                     | ...                    | ...         | ...           |
