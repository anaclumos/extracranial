import React, { useState, useEffect } from 'react'

const Intersprachraum = () => {
  const texts = [
    'Transcending the Linguistic Universe',
    'Преодоляване на езиковата вселена',
    'Překračování jazykového vesmíru',
    'At overskride det sproglige univers',
    'Die Überwindung des sprachlichen Universums',
    'Υπερβαίνοντας το γλωσσικό σύμπαν',
    'Trascender el universo lingüístico',
    'Keelelise universumi ületamine',
    'Kielellisen maailmankaikkeuden ylittäminen',
    "Transcender l'univers linguistique",
    'A nyelvi univerzum meghaladása',
    'Melampaui Alam Semesta Linguistik',
    "Trascendere l'universo linguistico",
    '言語宇宙を超える',
    '언어의 세계를 초월하다',
    'Kalbos visatos ribų peržengimas',
    'Lingvistiskā Visuma pārvarēšana',
    'Het taalkundig universum overstijgen',
    'Å overskride det språklige universet',
    'Przekraczanie językowego wszechświata',
    'Transcender o Universo Linguístico',
    'Transcenderea universului lingvistic',
    'Выход за пределы лингвистической вселенной',
    'Prekonávanie jazykového vesmíru',
    'Preseganje jezikovnega vesolja',
    'Att överskrida det språkliga universumet',
    'Dilsel Evreni Aşmak',
    'Вихід за межі мовного всесвіту',
    '超越语言宇宙',
  ]
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === texts.length - 1 ? 0 : prevIndex + 1))
    }, 200)
    return () => clearInterval(interval)
  }, [texts])

  return <p>{texts[currentIndex]}</p>
}

export default Intersprachraum
