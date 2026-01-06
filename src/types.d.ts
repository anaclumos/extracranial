/// <reference types="@docusaurus/module-type-aliases" />
/// <reference types="@docusaurus/theme-classic" />
/// <reference types="@docusaurus/theme-common" />
/// <reference types="@docusaurus/theme-common/internal" />

interface MapKitInitOptions {
  authorizationCallback: (done: (token: string) => void) => void
  language?: string
}

interface MapKitCoordinate {
  latitude: number
  longitude: number
}

interface MapKitMapConstructorOptions {
  center?: MapKitCoordinate
  cameraDistance?: number
  mapType?: string
  showsCompass?: string
  showsZoomControl?: boolean
  showsMapTypeControl?: boolean
  isScrollEnabled?: boolean
  isZoomEnabled?: boolean
  isRotationEnabled?: boolean
}

interface MapKitMapInstance {
  destroy(): void
}

interface MapKitStatic {
  init(options: MapKitInitOptions): void
  Coordinate: new (latitude: number, longitude: number) => MapKitCoordinate
  Map: {
    new (
      element: HTMLElement,
      options?: MapKitMapConstructorOptions
    ): MapKitMapInstance
    MapTypes: { Standard: string }
  }
  FeatureVisibility: { Hidden: string }
}

interface Window {
  mapkit: MapKitStatic
}
