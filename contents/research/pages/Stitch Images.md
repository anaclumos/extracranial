---
lang: 'en'
slug: '/D42480'
---

```py
from PIL import Image

image1 = Image.open('1.jpg')
image2 = Image.open('2.jpg')

total_height = image1.height + image2.height
concatenated_image = Image.new('RGB', (image1.width, total_height))

concatenated_image.paste(image1, (0, 0))
concatenated_image.paste(image2, (0, image1.height))

concatenated_image_path = './3.png'
concatenated_image.save(concatenated_image_path)
```
