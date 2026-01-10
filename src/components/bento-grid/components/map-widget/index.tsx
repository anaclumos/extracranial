import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import { cn } from '@site/src/util/cn'
import { useEffect, useRef } from 'react'
import { MAPKIT_TOKEN } from '../../constants'
import BentoWidget from '../bento-widget'
import styles from './styles.module.css'

export default function MapWidget({ className }: { className?: string }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const { i18n } = useDocusaurusContext()

  useEffect(() => {
    let map: MapKitMapInstance | null = null
    let script: HTMLScriptElement | null = null

    const initMap = () => {
      const mapkit = window.mapkit
      if (!(mapRef.current && mapkit)) {
        return
      }

      mapkit.init({
        authorizationCallback: (done: (token: string) => void) => {
          done(MAPKIT_TOKEN)
        },
        language: i18n.currentLocale,
      })

      const gangnamStation = new mapkit.Coordinate(37.4981, 127.0283)

      map = new mapkit.Map(mapRef.current, {
        center: gangnamStation,
        cameraDistance: 12_000,
        mapType: mapkit.Map.MapTypes.Standard,
        showsCompass: mapkit.FeatureVisibility.Hidden,
        showsZoomControl: false,
        showsMapTypeControl: false,
        isScrollEnabled: false,
        isZoomEnabled: false,
        isRotationEnabled: false,
      })
    }

    if (window.mapkit) {
      initMap()
    } else {
      script =
        document.querySelector<HTMLScriptElement>('script[data-mapkit]') ??
        document.createElement('script')

      if (!script.dataset.mapkit) {
        script.src = 'https://cdn.apple-mapkit.com/mk/5.x.x/mapkit.js'
        script.crossOrigin = 'anonymous'
        script.dataset.mapkit = 'true'
        document.head.appendChild(script)
      }

      script.addEventListener('load', initMap)
    }

    return () => {
      if (script) {
        script.removeEventListener('load', initMap)
      }
      if (map) {
        map.destroy()
      }
    }
  }, [i18n.currentLocale])

  return (
    <BentoWidget className={cn(className, styles.mapWidget)}>
      <div className={styles.mapWrapper}>
        <div className={styles.mapImage} ref={mapRef} />
        <span className={styles.mapPulse} />
      </div>
    </BentoWidget>
  )
}
