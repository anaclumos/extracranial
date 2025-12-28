---
lang: 'en'
slug: '/563122'
---

[[CS576 Multimedia Design]]

To capture everything, you need to sample twice the maximum frequency

The bit rate determines how many bits are transmitted per second, which is calculated as the product of the number of samples per second and the bits per sample. The bit rate is related to the network throughput. To illustrate, consider the following bitrate examples: for audio, the CD bitrate is calculated as 44.1 KHz sampling frequency and 16 bits quantization, resulting in a bit-rate of 705.6 Kb/s per channel. As the sampling rate increases, the bit rate also increases. Similarly, as the number of quantization bits used increases, the bit rate also increases.

## Linear Time Invariant

Let us consider a multimedia system $x(t) \rightarrow f \rightarrow y(t)$

Then if $y_1 = f(x_1)$ and $y_2 = f(x_2)$, then $f(c_1x_1 + c_2x_2) = c_1y_1 + c_2y_2$

## Fourier Transform

The Fourier Transform of a signal $x(t)$ represented by $X(f)$ describes how the energy of $x(t)$ is distributed among frequencies $f$. If the highest frequency in $X(f)$ is $B$, we say $x(t)$ is Band-Limited to $B$. A filter is an operator that can be characterized by its frequency response, $H(f)$. The Fourier Transform of $y(t)$ is $Y(f) = H(f)X(f)$. Therefore, the band $B_y$ of $y(t)$ is less than or equal to the band $B_h$ of the filter. Filters can be low-pass, band-pass, or high-pass.

## Spatial Aliasing

- Moire lines

## Temporal Aliasing

- Helicopter Blades
