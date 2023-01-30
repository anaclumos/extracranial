---
date: 2020-04-18
slug: '/615491'
---

```python
import os
import math


def getFileSize(path, kilo=1024, readable=False, shortRead=False):
    size = 0
    sizeArr = []
    units = ["B", "KB", "MB", "GB", "TB", "PB", "EB"]
    if os.path.isdir(path):
        for dirpath, dirnames, filenames in os.walk(path):
            for i in filenames:
                size += os.path.getsize(os.path.join(dirpath, i))
    elif os.path.isfile(path):
        size += os.path.getsize(path)
    unit = math.floor(math.log(size, kilo))
    for k in range(0, unit + 1):
        sizeArr.append(
            math.floor((size % kilo ** (k + 1)) / kilo ** k)
        )

    if readable:
        sizeString = ""
        if not shortRead:
            for x in range(unit, -1, -1):
                sizeString += str(sizeArr[x]) + units[x] + " "
            return sizeString[:-1]
        else:
            return (
                str(sizeArr[-1])
                + "."
                + str(math.floor(sizeArr[-2] / 1.024))
                + units[len(sizeArr) - 1]
            )
    else:
        return sizeArr
```

## Examples

### Reference

- `C:\Users\anacl\OneDrive\Documents (Folder)`: 3.13GB (3,366,343,239 Bytes)
- `C:\Users\anacl\OneDrive\Pictures (Folder)`: 83.4MB (87,468,781 Bytes)
- `C:\Users\anacl\OneDrive\Pictures\screenshot.png` (File): 139KB (143,262 Bytes)

### Default

    print(getFileSize("C:\\Users\\anacl\\OneDrive\\Documents"))
    print(getFileSize("C:\\Users\\anacl\\OneDrive\\Pictures"))
    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Pictures\\screenshot.png"
        )
    )

    # Expected Output
    # [583, 404, 138, 3]
    # [749, 426, 83]
    # [926, 139]

Each element in the returned `list` is the value of [B, KB, MB, GB, ...] of the file size.

### Full Readable Output

    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Documents", readable=True
        )
    )
    print(
        getFileSize("C:\\Users\\anacl\\OneDrive\\Pictures", readable=True)
    )
    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Pictures\\screenshot.png",
            readable=True,
        )
    )
    # Expected Output
    # 3GB 138MB 404KB 583B
    # 83MB 426KB 749B
    # 139KB 926B

### Short Readable Output

    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Documents",
            readable=True,
            shortRead=True,
        )
    )
    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Pictures",
            readable=True,
            shortRead=True,
        )
    )
    print(
        getFileSize(
            "C:\\Users\\anacl\\OneDrive\\Pictures\\screenshot.png",
            readable=True,
            shortRead=True,
        )
    )
    # Expected Output
    # 3.134GB
    # 83.416MB
    # 139.904KB

<head>
  <html lang="en-US"/>
</head>
