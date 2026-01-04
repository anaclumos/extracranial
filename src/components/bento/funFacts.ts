/**
 * Fun Facts - Source of Truth
 *
 * This file contains all fun fact snippets for the bento landing page.
 * Edit the English messages here. Korean translations are in i18n/ko/code.json
 *
 * To add a new snippet:
 * 1. Add it to this array with a semantic id (bento.bio.{topic})
 * 2. Add the Korean translation to i18n/ko/code.json with the same id
 */

export interface FunFactSnippet {
  id: string
  message: string
}

export const funFacts: FunFactSnippet[] = [
  {
    id: 'bento.bio.accelerationist',
    message:
      'I consider myself an accelerationist in many fields, albeit the only field I am actively participating in right now is oss/acc (i.e., build more, ship more, talk more open source!) I built and led some successful OSS projects, one even getting me MikeRoweSofted. Eventually I want to expand to nuc/acc, bme/acc, med/acc, and sci/acc.',
  },
  {
    id: 'bento.bio.medicalAI',
    message:
      'I am very fortunate to work in the field of my interest. I am working on MLOps for a Medical AI company. Our automation software solves all the medical AI issues. I want to contribute to a better ecosystem by building a competitive global open-market product and potentially open-sourcing them.',
  },
  {
    id: 'bento.bio.lateralThinking',
    message:
      'I love lateral thinking (thinking outside the box) and crazy ideas. For example, how can you say, "Shooting rockets are too expensive," then "OK, just land them and reuse them." When paired with exceptional engineering talents, lateral thinking can make amazing breakthroughs regardless of field.',
  },
  {
    id: 'bento.bio.earlyAdopter',
    message:
      'I am an early adopter and enthusiast in many fields. I love trying out half-baked products and early-stage prototypes. We must explore fresh ideas and converse on them as scientists and engineers. Alas, someone needs to fund them to improve the product, and if so, that better be me!',
  },
  {
    id: 'bento.bio.koreanCulture',
    message:
      'I am Korean, and I love Korean culture, not to mention I love K-pop. But more than the recent sprout in Korean cultures, my genuine interest lies in traditional Korean cultures, which are heavily underexplored. My favorite folklore is the story of Bulgasari (불가사리), a metal-eating fire-bending beast that brought the corrupt people to their knees and brought an end to a war and suffering. My favorite artifacts are Jangseung (a.k.a. Beoksu), a totem pole guarding well-being.',
  },
  {
    id: 'bento.bio.noEnglishName',
    message:
      'I don\'t have an English name, even when studying in the US. I think Kihong Lee and Uzoamaka Aduba put it best. "If they can learn to speak Tchaikovsky, Michelangelo, and Dostoevsky, then they can learn to say your name."',
  },
  {
    id: 'bento.bio.koreanHistory',
    message:
      "I can't mention my love for Korean history and East Asian geopolitics. I always feel significant turbulence whenever I look into any timespan in 5,000 years of Korean history, and I enjoy how our people saved themselves or screwed up. History doesn't repeat itself but rhymes, so better be prepared, right?",
  },
  {
    id: 'bento.bio.trading',
    message:
      "I trade a lot. I was honored to rank 1st place on couple of stock leaderboards on Toss Securities (Korean Robinhood). These days, I'm spending most of my free time studying many algorithmic trading strategies. I sometimes Simons and sometimes Newton myself, but I'm fortifying my strategy with lessons I learn every day. I am not a millionaire yet but I'm on my way!",
  },
  {
    id: 'bento.bio.consoleGamer',
    message:
      'I am a heavy console gamer, especially in story-rich games or games with great soundtrack. Those story games are the 21st-century evolution of great literature, from movies in the 20th century to novels in the 19th century. Knowing how to appreciate and savor a good game is a skill and privilege, and I am so happy when I encounter one.',
  },
  {
    id: 'bento.bio.favoriteGames',
    message:
      "My favorite games are Ghost of Tsushima/Yotei, Death Stranding 1 & 2, Detroit: Become Human, Expedition 33, and Sanabi. The Last of Us and Spidermen Series also name themselves in honorable mentions. Recently, I am obsessed with Rhythm Heaven, and I've been binge-playing it on Nintendo Wii, DS, and Gameboy (Analog Pocket). I guess I love games with great music after all.",
  },
  {
    id: 'bento.bio.a11yI18n',
    message:
      "I am obsessed with Accessibility and Internationalization. Two parts of me play with this. First, I felt left out for a while, not being in the loop with American Outlets. The notion of being on the scene is heavy, and I've seen so many talented friends missing out on so many opportunities due to their linguistic barriers. The linguistic barrier, especially in tech, is the new Apartheid, even though it is not intentional.",
  },
  {
    id: 'bento.bio.heroes',
    message:
      'I am very extroverted. Well, I used to be. I love talking to many intelligent people and making myself the dumbest person in the room. I eventually want to build a product or service based not on hype but on exceptional quality. That makes me look up to my heroes: Jen-Hsun Huang (I love his perserverance), Lisa Tzwu-Fang Su (I love her technological yet messianic leadership), and Guillermo Rauch (I love how he transitioned from a dev with a bold manifesto in 2014 and then transitioned into rectifying the future.).',
  },
  {
    id: 'bento.bio.medici',
    message:
      "I dream of becoming the Medici of Science & Technology. The Medici patronized brilliant people during the changing Renaissance era and revolutionized the art industry. I was deeply moved by the Medici's values - that by mobilizing brilliant people, we can shape a better future. I've decided I want to gather talented individuals to forge the future together. I want to turn my fantasies into reality, pave that path forward, and through this create an ecosystem where people can freely enjoy new adventures.",
  },
]
