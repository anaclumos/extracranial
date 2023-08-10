import { Marker } from 'cobe'

const defaultSize = 0.03

const ICN: Marker = {
  location: [37.4695, 126.4326],
  size: defaultSize,
}
const LAX: Marker = {
  location: [33.9438, 360 - 118.4091],
  size: defaultSize,
}

const SJC: Marker = {
  // 37.3641° N, 121.9289° W
  location: [37.3641, 360 - 121.9289],
  size: defaultSize,
}

const SFO: Marker = {
  // 37.6192° N, 122.3816° W
  location: [37.6192, 360 - 122.3816],
  size: defaultSize,
}

const EWR: Marker = {
  // 40.6895° N, 74.1745° W
  location: [40.6895, 360 - 74.1745],
  size: defaultSize,
}

const CJU: Marker = {
  // 33.5113° N, 126.4930° E
  location: [33.5113, 126.493],
  size: defaultSize,
}

const CJJ: Marker = {
  // 36.7220° N, 127.4959° E
  location: [36.722, 127.4959],
  size: defaultSize,
}

const LHR: Marker = {
  // 51.4680° N, 0.4551° W
  location: [51.468, 360 - 0.4551],
  size: defaultSize,
}

const GUM: Marker = {
  // 13.4856° N, 144.8001° E
  location: [13.4856, 144.8001],
  size: defaultSize,
}

const KIX: Marker = {
  // 34.4320° N, 135.2304° E
  location: [34.432, 135.2304],
  size: defaultSize,
}

const STL: Marker = {
  // 38.7499° N, 90.3748° W
  location: [38.7499, 360 - 90.3748],
  size: defaultSize,
}

const SIN: Marker = {
  // 1.3545° N, 103.9886° E
  location: [1.3545, 103.9886],
  size: defaultSize,
}

export const travels = [
  { from: SJC, to: SFO },
  { from: SFO, to: SJC },
  { from: LAX, to: SFO },
  { from: EWR, to: LAX },
  { from: LAX, to: EWR },
  { from: ICN, to: LAX },
  { from: LAX, to: ICN },
  // { from: ICN, to: LAX },
  // { from: LAX, to: ICN },
  // { from: ICN, to: LAX },
  // { from: LAX, to: ICN },
  { from: ICN, to: LAX },
  { from: SFO, to: ICN },
  { from: LAX, to: SFO },
  { from: ICN, to: LAX },
  { from: CJU, to: CJJ },
  { from: CJJ, to: CJU },
  { from: LHR, to: ICN },
  { from: ICN, to: LHR },
  { from: GUM, to: ICN },
  { from: ICN, to: GUM },
  { from: ICN, to: SFO },
  { from: KIX, to: CJJ },
  { from: CJJ, to: KIX },
  { from: LAX, to: ICN },
  { from: ICN, to: LAX },
  { from: SFO, to: ICN },
  { from: STL, to: SFO },
  { from: SFO, to: STL },
  { from: ICN, to: SFO },
  { from: SIN, to: ICN },
  { from: ICN, to: SIN },
]

export const coordinates = () => {
  const Markers: Marker[] = []
  travels.forEach(({ from, to }) => {
    const departure = Markers.find(
      ({ location }) => location[0] === from.location[0] && location[1] === from.location[1]
    )
    if (departure) {
      departure.size += defaultSize * 0.01
    } else {
      Markers.push({
        location: from.location,
        size: defaultSize,
      })
    }

    const destination = Markers.find(({ location }) => location[0] === to.location[0] && location[1] === to.location[1])
    if (destination) {
      destination.size += defaultSize * 0.01
    } else {
      Markers.push({
        location: to.location,
        size: defaultSize,
      })
    }
  })
  return Markers as Marker[]
}

export const randomJump = () => {
  const jumps = [ICN, LAX, SJC, SFO, EWR, LHR, GUM, KIX, STL, SIN]
  const markers: Marker[] = []
  const markersHistory: {
    from: Marker
    to: Marker
  }[] = []
  for (let i = 0; i < 50; i++) {
    const fromIdx = Math.floor(Math.random() * jumps.length)
    const toIdx = Math.floor(Math.random() * jumps.length)
    if (fromIdx === toIdx) {
      continue
    }
    const from = jumps[fromIdx]
    const to = jumps[toIdx]
    markers.push({
      location: from.location,
      size: defaultSize,
    } as Marker)
    markers.push({
      location: to.location,
      size: defaultSize,
    } as Marker)
    markersHistory.push({
      from,
      to,
    })
  }
  return { markers, markersHistory }
}
