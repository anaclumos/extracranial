import React, { useState, useEffect } from 'react'

const RandomParagraphs = ({ strings = [] }) => {
  const [selectedStrings, setSelectedStrings] = useState([])

  useEffect(() => {
    if (strings.length >= 3) {
      const arrayCopy = [...strings]
      const selected = []
      for (let i = 0; i < 3; i++) {
        const randomIndex = Math.floor(Math.random() * arrayCopy.length)
        selected.push(arrayCopy.splice(randomIndex, 1)[0])
      }

      // Fisher-Yates shuffle algorithm
      for (let i = selected.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[selected[i], selected[j]] = [selected[j], selected[i]]
      }

      setSelectedStrings(selected)
    }
  }, [strings])

  return (
    <>
      {selectedStrings.map((str, index) => (
        <p key={index} className="text-lg">
          {str}
        </p>
      ))}
    </>
  )
}

export const EnglishRandomParagraphs = () => {
  return (
    <RandomParagraphs
      strings={[
        'I consider myself an accelerationist in many fields, albeit the only field I am actively participating in right now is oss/acc (i.e., build more, ship more, talk more open source!) I built and led some successful OSS projects, one even getting me MikeRoweSofted. I feel particularly happy when people send me excellent and mindful thoughts. While oss/acc is the only field I am actively into, I want to expand to nuc/acc, bme/acc, med/acc, and eventually sci/acc. Speaking of med/acc, I am very fortunate to work in the field of my interest. I am working on MLOps for a Medical AI company. Our automation software solves all the medical AI issues. I want to contribute to a better ecosystem by building a competitive global open-market product and potentially open-sourcing them.',
        'I love lateral thinking (thinking outside the box) and crazy ideas. For example, how can you say, "Shooting rockets are too expensive," then "OK, just land them and reuse them." When paired with exceptional engineering talents, lateral thinking can make amazing breakthroughs regardless of field.',
        'I am an early adopter and enthusiast in many fields. I love trying out half-baked products and early-stage prototypes. We must explore fresh ideas and converse on them as scientists and engineers. Alas, someone needs to fund them to improve the product, and if so, that better be me! As a great perk other than helping them build the future, I think of those prices expedition costs for ideas, not a price tag of a product. I get ideas from them like, "Oh shit, they nailed this part" or "Oh no, this they missed the potential," and imagine how I would\'ve done it. If you\'re building something extraordinary, you can count me as your first customer. I\'ll drop my bucks!',
        'I am Korean, and I love Korean culture, not to mention I love K-pop. But more than the recent sprout in Korean cultures, my genuine interest lies in traditional Korean cultures, which are heavily underexplored. My favorite folklore is the story of Bulgasari (불가사리), a metal-eating fire-bending beast that brought the corrupt people to their knees and brought an end to a war and suffering. My favorite artifacts are Jangseung (a.k.a. Beoksu), a totem pole guarding well-being. In that same vein, I don\'t have an English name, even when studying in the US. I think Kihong Lee and Uzoamaka Aduba put it best. "If they can learn to speak Tchaikovsky, Michelangelo, and Dostoevsky, then they can learn to say your name."',
        "I can't mention my love for Korean history and East Asian geopolitics. I always feel significant turbulence whenever I look into any timespan in 5,000 years of Korean history, and I enjoy how our people saved themselves or screwed up. History doesn't repeat itself but rhymes, so better be prepared, right?",
        "I also trade a lot. I was honored to rank 1st place on couple of stock leaderboards on Toss Invest, one of the leading trading neo-platforms in Korea. These days, I'm spending most of my free time studying many algorithmic trading strategies. I sometimes Simons and sometimes Newton myself, but I'm fortifying my strategy with lessons I learn every day. I am not a millionaire yet but I'm on my way!",
        "I am a heavy console gamer, especially in story-rich games or games with great soundtrack. Those story games are the 21st-century evolution of great literature, from movies in the 20th century to novels in the 19th century. Knowing how to appreciate and savor a good game is a skill and privilege, and I am so happy when I encounter one. If you want me to list my favorite games, I'd say Ghost of Tsushima, Death Stranding, Detroit: Become Human and Sanabi. The Last of Us and Spidermen Series also name themselves in honorable mentions.",
        "I am obsessed with a11y (Accessibility) and i18n (Internationalization). Two parts of me play with this. First, I felt left out for a while, not being in the loop with American Outlets. The notion of being on the scene is heavy, and I've seen so many talented friends missing out on so many opportunities due to their linguistic barriers. The linguistic barrier, especially in tech, is the new Apartheid, even though it is not intentional. The second part is that these two are the fast and quick way to gauge how craftsmanshipful, mindful, and meticulously built the product is. If they screwed up on a11y and i18n, the chances are, it's not a mind-blowing product.",
        'I am very extroverted. Well, I used to be. I love talking to many intelligent people and making myself the dumbest person in the room. I eventually want to build a product or service based not on hype but on exceptional quality. That makes me look up to my heroes: Jen-Hsun Huang (I love his perserverance), Lisa Tzwu-Fang Su (I love her technological yet messianic leadership), and Guillermo Rauch (I love how he transitioned from a dev with a bold manifesto in 2014 and then transitioned into rectifying the future.).',
        "With everything, I eventually dream of becoming the Medici of Science & Technology. The Medici patronized brilliant people during the changing Renaissance era and revolutionized the art industry. I was deeply moved by the Medici's values - that by mobilizing brilliant people, we can shape a better future. I've decided I want to gather talented individuals to forge the future together. I want to turn my fantasies into reality, pave that path forward, and through this create an ecosystem where people can freely enjoy new adventures.",
      ]}
    />
  )
}

export const KoreanRandomParagraphs = () => {
  return (
    <RandomParagraphs
      strings={[
        '저는 여러 분야에서 가속주의(Accelerationist)자입니다. 그중 제일은 오픈소스 가속(oss/acc)입니다. "더 많이 만들고, 더 빨리 내놓고, 더 많이 대화하자"는 철학입니다. 저는 수십만 유저를 가진 오픈소스 프로젝트를 여럿 이끌었으며, 그중 하나는 마이크로소프트에게서 연락을 받는 경험도 했습니다. 새로운 사람들과 멋진 소통을 받고 생각을 교류하는 순간에 가장 큰 행복을 느낍니다. 비록 지금은 소프트웨어에만 주력하고 있지만, 언젠가는 원자력(nuc/acc), 생명공학(bme/acc), 의료기술(med/acc), 그리고 나아가 과학(sci/acc) 분야로도 확장해보고 싶습니다. med/acc 이야기가 나와서 말인데, 저는 운좋게도 관심 있는 영역에서 일하고 있습니다. 현재 의료AI 회사에서 MLOps를 담당하고 있습니다. 제 팀은 다양한 의료 AI 훈련의 어려움을 해결하는 플랫폼을 만듭니다. 궁극적으로 경쟁력 있는 세계적 제품을 만들어내고, 가능하다면 이를 오픈소스로 공개하여 더욱 나은 생태계를 구축하고 싶습니다.',
        '저는 상식을 뒤집는 "수평적 사고"와 독특한 아이디어를 매우 좋아합니다. "로켓 발사가 너무 비싸다"라는 말에 "그렇다면 착륙시켜 재활용하면 되지 않겠습니까!"라고 응수하는 발상이 바로 그 예입니다. 훌륭한 엔지니어링 능력과 결합된다면 어느 분야에서든 멋진 혁신을 이끌어낼 수 있다고 생각합니다.',
        '저는 여러 분야에서 얼리어답터입니다. 덜 다듬어진 제품이나 초기 프로토타입도 기꺼이 사용해보는 편입니다. 새로운 아이디어를 탐구하고, 서로 과학자나 엔지니어로서 대화하는 것을 좋아합니다. 이러한 시도를 지속하려면 당연히 누군가의 지원이 필요하고, 그 역할을 제가 기꺼이 맡는 셈입니다. 저는 이러한 제품들을 단순한 미완성품 구매가 아닌, 아이디어에 대한 탐험비로 여기고 있습니다. 이 과정에서 "아, 이런 결정은 정말 예리하네!" 혹은 "여기서는 디테일이 좀 아깝네."와 같은 평가를 통해 저만의 사고관을 성장시키는 투자라는 것입니다. 그러니 방문자님께서 대단한 무엇인가를 만들고 계시다면, 제가 기꺼이 첫 번째 손님이 되고 싶습니다.',
        '저는 한민족의 문화를 매우 좋아합니다. K-POP을 비롯한 최근의 한류도 좋지만, 사실은 전통문화에 더욱 많은 관심을 두고 있습니다. 한민족의 전통문화에는 아직 깊이 파헤쳐지지 않은 멋진 이야기들이 많습니다. 제가 가장 좋아하는 설화는 "불가사리"로, 쇠를 먹고 불을 뿜는 괴수이며 부패한 자들을 벌하고 전쟁과 고통을 끝낸 존재입니다. 제가 좋아하는 전통 유물인 장승(일명 벅수)은 공동체의 안녕을 지키는 토템 역할을 했습니다. 이러한 맥락에서 저는 미국에서 공부할 때도 별도의 영어 이름을 사용하지 않았습니다. 이기홍(Ki Hong Lee)이나 우조아마카 아두바(Uzoamaka Aduba)가 말했듯, 사람들이 차이콥스키나 미켈란젤로, 도스토옙스키 같은 이름을 익힐 수 있다면 제 이름도 충분히 외울 수 있다고 생각합니다.',
        '저는 한민족의 역사와 동아시아 지정학에도 깊은 관심을 가지고 있습니다. 한민족의 5천 년 역사 어느 시점을 들여다보아도 항상 큰 격변이 있었습니다. 그 과정에서 한민족은 스스로를 구하기도 하고 스스로를 무너뜨리기도 했습니다. 역사는 반복되지는 않지만 유사한 흐름을 가진다고 하니, 대비하는 자세가 필요하다고 생각합니다.',
        '저는 투자도 많이 하고 있습니다. 토스증권 여러 종목에서 수익률 1위를 달성한 경험도 있습니다. 현재는 여러 알고리즘 트레이딩 전략을 공부 중입니다. 가끔은 정교한 계산으로 대박을 터뜨리기도 하고 가끔은 시장의 광기에 쪽박을 보기도 하지만, 매일 배움을 통해 전략을 탄탄히 다져나가고 있습니다. 물론 지금 백만장자는 아니어도 언젠가는 큰 목표를 달성하리라 생각합니다.',
        '저는 콘솔 게임을 무척 좋아하고, 특히 스토리성이 풍부하거나 사운드트랙이 뛰어난 게임에 몰입합니다. 소설이 19세기의 문학, 영화가 20세기의 새로운 문학이었다면, 게임은 21세기의 새로운 문학이라 생각합니다. 좋은 게임을 감상하고 음미하는 것은 하나의 기술이자 특권이라 봅니다. 제가 특히 좋아하는 작품으로는 "고스트 오브 쓰시마", "데스 스트랜딩", "디트로이트: 비컴 휴먼", "스플래툰 3", "슈퍼마리오 오디세이" 그리고 "산나비"를 꼽을 수 있으며, "라스트 오브 어스"와 "스파이더맨" 시리즈 또한 훌륭한 작품으로 평가하고 있습니다.',
        '저는 a11y(접근성)와 i18n(국제화)에 대한 집착에 가까운 관심을 가지고 있습니다. 이유는 크게 두 가지입니다. 첫째, 제가 미국에서 생활할 때 현지 문화나 언론에 접근할 때 문턱을 느낀 경험이 있습니다. 주변의 뛰어난 한국인 친구들이 언어 장벽으로 기회를 놓치는 모습을 보며, 언어 장벽이 의도치 않게 새로운 형태의 차별이 될 수 있다는 생각을 하게 되었습니다. 둘째, 접근성과 국제화를 잘 고려한 제품일수록 장인정신과 배려심, 그리고 꼼꼼함이 담겨 있다고 생각합니다. a11y나 i18n을 소홀히 한 제품은 대개 기대만큼 훌륭하지 못하다는 판단을 하고 있습니다.',
        '저는 매우 외향적인 성격이...었습니다. 그럼에도 여전히 똑똑한 사람들과 대화하고, 제가 그 방에서 가장 부족한 사람으로 느껴지는 상황을 좋아합니다. 언젠가는 요란한 홍보나 허세 대신 진정한 품질로 승부하는 제품이나 서비스를 만들고 싶습니다. 이 목표를 위해 저는 제 롤모델들을 존경합니다. 예를 들어, 젠슨 황(Jen-Hsun Huang)의 끈기, 리사 수(Lisa Tzwu-Fang Su)의 기술적이면서 구원자 같은 리더십, 그리고 기예르모 라우치(Guillermo Rauch)가 2014년의 대담한 개발자에서 미래를 개척하는 경영자로 성장한 모습 등을 통해 많은 영감을 받습니다.',
        '결국 저는 과학과 기술의 메디치가 되고 싶습니다. 메디치는 변화하는 르네상스 시대에 맞춰 뛰어난 사람들을 후원해 예술 산업을 개부심했습니다. 뛰어난 사람들을 움직여 더 나은 미래를 빚어낼 수 있다는 메디치의 가치에 저는 큰 울림을 받았고, 뛰어난 사람들이 모아 미래를 빚어나가고 싶다고 결심했습니다. 제 공상들을 현실로 바꾸고, 그 길을 닦아나가며, 이를 통해 사람들이 새로운 모험을 더욱 마음껏 즐길 수 있는 생태계를 만들어나가고자 합니다.',
      ]}
    />
  )
}

export default RandomParagraphs
