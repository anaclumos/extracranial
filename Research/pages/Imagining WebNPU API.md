---
lang: 'en'
slug: '/56317F'
---

[WebGPU](https://gpuweb.github.io/gpuweb/) is a recently developed web interface that provides access to modern [[graphics]] processing unit ([[GPU]]) capabilities, such as Direct3D 12, Metal, and Vulkan, for rendering and computation tasks. Its aim is comparable to WebGL APIs, but WebGPU offers access to more advanced [[GPU]] features. **What if we could do this with [[NPU]]**? I hereby suggest a hypothetical **WebNPU** API. Think this way:

- [[WebAssembly]] unlocks the bare-metal power of [[CPU]]s.
- [[WebGPU]] unlocks the bare-metal power of [[GPU]]s.
- **WebNPU** unlocks the bare-metal power of [[NPU]]s.

We are already observing blooming [[On-device]] inferencing [[ML]] technology with [[Apple]]'s [[Neural Engine]]. This includes many jobs, from simple Siri commands to full-blown [Stable Diffusion](https://github.com/apple/ml-stable-diffusion) models. While they are way weaker in power compared to full-server scale inferencing, they have far better latency and privacy, which are required for some specific jobs. Other companies are catching up, such as [[Google]]'s [Tensor](https://blog.google/products/pixel/introducing-google-tensor/). Unfortunately, so far, these chips are only accessible through native applications. For web-based solutions, we have high-level services running on the [[CPU]], like [TensorFlow.js](https://www.tensorflow.org/js).

At one point in the future, when [[AI-native]] (just like us Cloud-Natives) become the norm, there will be more and more need for an [[On-device]] API to access [[NPU|NPUs]], especially with Web technologies. These are good for all stakeholders:

- **Customers**. Everything is local, fast, and secure—no need to install an app for an [[AI]] to be tailored to their specific preferences and behavior. Visiting a website will suffice.
- **Developers**. No need to ramp up an inferencing server. WebNPU can also simplify the development process for developers, as they can Write Once Run Everywhere.
- **Companies**. Aggregating data will be harder and harder due to regulations and restrictions in the future. WebNPU will eradicate the need for such things. WebNPU can also provide a more scalable solution for companies, as [[AI]] tasks can be performed on user devices, reducing the load on servers and enabling the company to scale its services more efficiently.
- **Hardware vendors**. WebNPU can provide new business opportunities for hardware vendors, as they can develop specialized hardware optimized for [[AI]] tasks and sell it to device manufacturers and other customers.
- **Regulatory bodies**. WebNPU can address privacy and security concerns by enabling [[AI]] tasks to be performed locally on user devices, reducing the amount of data that needs to be transmitted over the network and potentially reducing the risk of data breaches and other security issues. This can help regulatory bodies ensure that data is handled responsibly and securely.

However, it is noteworthy that we are still in the early days of [[AI]]. We do not have a standardized way of building [[NPU|NPUs]], as different hardware vendors have different approaches and requirements. For example, [[Core ML]] uses [[Core ML]] model formats, whereas TensorFlow Lite uses FlatBuffers formats. We will again see a battle between [[Apple]] and [[Google]], just like [[VP9 vs HEVC]]or [[USDZ vs glTF]] battles.
