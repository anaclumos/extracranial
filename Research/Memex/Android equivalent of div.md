---
lang: 'en'
slug: '/172E82'
---

- is a `ViewGroup`
- Example: `LinearLayout`

```xml
<LinearLayout
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:orientation="horizontal">

    <Button
        android:id="@+id/flag"
        android:layout_weight="1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="Button 1" />

    <Button
        android:id="@+id/timer"
        android:layout_weight="1"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:text="Button 2" />
</LinearLayout>
```

![[094016.png]]
