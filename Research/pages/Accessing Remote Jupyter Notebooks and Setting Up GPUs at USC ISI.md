---
lang: 'en'
slug: '/F16ADE'
---

This guide provides instructions for accessing a Jupyter Notebook on a remote server and configuring a GPU for machine learning tasks using TensorFlow and PyTorch.

## Accessing the Remote Jupyter Notebook

### Prerequisites

- VPN connection, if required.
- SSH access to the server.
- Your server username (e.g., `username@bdnf.isi.edu`).

### Steps to Access

1. **Open Terminal:**

   - Windows: Use PowerShell or PuTTY.
   - macOS/Linux: Use the Terminal app.

2. **SSH Connection:**

   - Command:
     ```
     ssh -L 8080:localhost:8080 username@bdnf.isi.edu
     ```
   - Replace `username` with your server username.

3. **Navigate to Work Directory:**

   - Use `cd` to go to your directory:
     ```
     cd path/to/work/directory
     ```

4. **Start Jupyter Notebook:**

   - Run:
     ```
     jupyter notebook --no-browser --port=8080
     ```
   - Copy the provided URL.

5. **Access Notebook Locally:**
   - Paste the URL into your local browser.

## Setting Up GPU for TensorFlow

### Prerequisites

- TensorFlow and other packages installed.
- Knowledge of available GPU numbers (0 to 7).

### Steps for TensorFlow

1. **Check GPU Availability:**

   - In Jupyter, run:
     ```python
     !nvidia-smi
     ```

2. **Configure GPU in Notebook:**

   - After loading packages, set GPU:

     ```python
     import os
     import tensorflow as tf

     os.environ["CUDA_DEVICE_ORDER"] = "PCI_BUS_ID"
     os.environ["CUDA_VISIBLE_DEVICES"] = "0"  # Choose an available GPU

     physical_devices = tf.config.list_physical_devices('GPU')
     print("Num GPUs Available: ", len(physical_devices))

     if physical_devices:
         tf.config.experimental.set_memory_growth(physical_devices[0], True)
     ```

## Setting Up GPU for PyTorch

### Prerequisites

- PyTorch installed.
- Knowledge of available GPU numbers.

### Steps for PyTorch

1. **Check GPU Availability:**

   - Same as for TensorFlow, use `!nvidia-smi`.

2. **Configure GPU in Notebook:**

   - PyTorch automatically uses available GPUs, but you can specify one:

     ```python
     import torch

     # Check if CUDA is available
     if torch.cuda.is_available():
         device = torch.device("cuda:0")  # Replace 0 with your GPU number
         print("Using GPU:", torch.cuda.get_device_name(0))
     else:
         device = torch.device("cpu")
         print("Using CPU")
     ```

   - Use `device` to move tensors or models to the selected device:
     ```python
     model.to(device)
     ```

### Notes

- For TensorFlow, `CUDA_VISIBLE_DEVICES` sets the specific GPU.
- For PyTorch, `torch.device` is used to specify the GPU.
- Always check GPU availability and usage before selecting one.
