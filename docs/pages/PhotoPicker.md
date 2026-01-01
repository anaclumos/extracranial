---
lang: 'en'
slug: '/7ECDD0'
---

```swift

PhotosPicker(
        selection: $viewModel.selection,
        selectionBehavior: .continuous,
        matching: .images,
        preferredItemEncoding: .current,
        photoLibrary: .shared()
      ) {
        Text("Pick a photo")
      }
      .photosPickerStyle(.compact)
      .ignoresSafeArea()
      .photosPickerDisabledCapabilities(.selectionActions)
      .photosPickerAccessoryVisibility(.hidden, edges: .all)
      .frame(maxHeight: 120)
      .cornerRadius(15)
      .padding(.horizontal)
      .onChange(of: viewModel.selection) {
        viewModel.loadSelectedImages()
      }

```
