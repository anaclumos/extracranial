---
lang: 'en'
slug: '/FC8E1E'
aliases: ['Features']
---

In [[ML|machine learning]], a "feature" is an individual data point, measurable property, or characteristic of an observed phenomenon. Features represent the data in a form that is amenable to [[ML|machine learning]]. Essentially, they are the variables or attributes the algorithm uses to make predictions or decisions. For example, suppose you are building a [[ML|machine-learning]] model to predict the price of houses. In that case, features include the number of bedrooms, the square footage of the living space, the neighborhood crime rate, the distance to the nearest [[public transport]] station, and so on.

### Types of Features

1. **Numerical Features**. These are continuous features that can take any numerical value. Examples include height, weight, and temperature.
2. **Categorical Features**. These are features that can take on one of a limited set of values. Examples include gender (male, female), marital status (single, married, divorced), and educational level (high school, bachelor's, master's, [[Ph.D.]]).
3. **Ordinal Features**. These are similar to categorical features but have a clear sense of order. Examples include star ratings (1, 2, 3, 4, 5) and educational level (elementary, middle school, high school, college).
4. **Boolean or Binary Features**. These features take on one of two values: True/False or 0/1.
5. **Text Features**. These features come from text data and often need to be transformed into a numerical form through techniques like TF-IDF (Term Frequency-Inverse Document Frequency) or word embeddings before they can be used in a [[ML|machine-learning]] model.
6. **Time Series Features**. These are features that change over time and are usually part of time-series data.
7. **Image, Audio, Video Features**. These are features extracted from image, audio, or video data, often using specific techniques like convolutional neural networks or Fourier transforms for audio features.

### Feature Engineering

Feature engineering is selecting, transforming, or creating the most relevant features for a [[ML|machine learning]] model. Sound feature engineering can significantly improve the performance of a [[ML|machine learning]] model. Techniques include normalization, transformation, dealing with missing values, and creating interaction terms.

### Feature Selection

Not all features are equally informative. Feature selection is identifying and selecting the most essential elements for a model. This can improve the model's performance and reduce [[Overfitting]].

### Feature Extraction

Sometimes, the raw features need to be more sufficient or optimal for a learning task. Feature extraction aims to transform high-dimensional data into a lower-dimensional form, preserving the most critical information in the data. Techniques for feature extraction include Principal Component Analysis (PCA), autoencoders, and many others. In summary, features are the building blocks of the data used in [[ML|machine learning]] models. Effective selection, engineering, and extraction of features are critical steps in the [[ML|machine learning]] pipeline.
