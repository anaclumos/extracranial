---
lang: 'en'
slug: '/1EF3C1'
---

```ts
// __mocks__/react-native-geolocation-service.ts
export default {};

export enum PositionError {
  PERMISSION_DENIED = 1,
  POSITION_UNAVAILABLE = 2,
  TIMEOUT = 3,
  PLAY_SERVICE_NOT_AVAILABLE = 4,
  SETTINGS_NOT_SATISFIED = 5,
  INTERNAL_ERROR = -1,
}
```

```ts
// __mocks__/@react-native-async-storage/async-storage.ts
export default '@react-native-async-storage/async-storage/jest/async-storage-mock';
```

```tsx
import React from 'react';
import App from '../src/App';

import renderer from 'react-test-renderer';

describe('<App />', () => {
  it('renders correctly', () => {
    renderer.create(<App />);
  });
});
```

```json
"jest": {
  "preset": "react-native",
  "transformIgnorePatterns": [
    "node_modules/(?!(jest-)?react-native|react-clone-referenced-element|@react-native-community|rollbar-react-native|@fortawesome|@react-native|@react-navigation)"
  ],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node"
  ]
}
```