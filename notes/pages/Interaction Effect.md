---
lang: 'en'
slug: '/9CF884'
---

An interaction effect in user experiments or statistical analysis refers to a situation where the impact of one variable on an outcome depends on the level of another variable. Related: [[Independence]]. Interaction can be examined in different types of models, such as in regression analysis or analysis of [[variance]] (ANOVA), but the basic idea is the same.

In the case of two-way interaction (interaction between two independent variables), let's denote our variables as follows:

- $X$ and $Y$ are your independent variables.
- $Z$ is your dependent variable.
- $XY$ represents the interaction between $X$ and $Y$.

In a regression model that includes an interaction term, the model would look like this:

$$
Z = \beta_0 + \beta_1X + \beta_2Y + \beta_3XY + \epsilon
$$

Here, $\beta_0$ is the intercept, $\beta_1$ and $\beta_2$ are the main effects of $X$ and $Y$ respectively, and $\beta_3$ represents the interaction effect of $X$ and $Y$ on $Z$. $\epsilon$ is the error term.

To calculate the interaction effect, you need to estimate the regression coefficients $\beta_0, \beta_1, \beta_2,$ and $\beta_3$. This is typically done through a method called Ordinary Least Squares (OLS) regression, which minimizes the sum of the squared residuals. In a factorial ANOVA setting, you would calculate the interaction effect as the difference between the effect of one factor at different levels of the other factor.

## Calculating $\beta$

### Linear Regression

In the regression model:

$$
Z = \beta_0 + \beta_1X + \beta_2Y + \beta_3XY + \epsilon
$$

The coefficients $\beta_0$, $\beta_1$, $\beta_2,$ and $\beta_3$ are typically estimated using the method of Ordinary Least Squares (OLS). OLS minimizes the sum of the squared residuals (the differences between the observed and predicted values of the dependent variable $Z$). In simple linear regression (only one predictor), the formulas to estimate the coefficients are:

$$
\beta_1 = \frac{\sum_{i=1}^{n} (X_i-\bar{X})(Z_i-\bar{Z})}{\sum_{i=1}^{n} (X_i-\bar{X})^2}
$$

$$
\beta_0 = \bar{Z} - \beta_1\bar{X}
$$

where

- $X_i$ and $Z_i$ are the individual observations,
- $\bar{X}$ and $\bar{Z}$ are the means of $X$ and $Z$ respectively,
- $n$ is the number of observations.

For multiple predictors and interaction terms, we typically use matrix notation and some linear algebra to solve a system of linear equations to estimate the coefficients. This process requires several assumptions to be valid, including linearity, independence, homoscedasticity, and normally distributed errors. If these assumptions are violated, other methods might be more appropriate to estimate the coefficients.

### Multiple Linear Regression

For multiple linear regression (which includes multiple predictors and interaction terms), as in the case of our model:

$$
Z = \beta_0 + \beta_1X + \beta_2Y + \beta_3XY + \epsilon
$$

The calculation of coefficients $\beta_0, \beta_1, \beta_2,$ and $\beta_3$ becomes more complex. The formula that generalizes the one for simple linear regression involves matrix operations.

If we denote:

- $X$ as a matrix that includes a column of ones (for the intercept), and the values of the predictor variables (and their products for interaction terms),
- $Y$ as a column vector of the outcome variable,
- $B$ as a column vector of the coefficients to be estimated,

Then the formula for the least squares estimates in multiple regression is:

$$
B = (X'X)^{-1}X'Y
$$

where $X'$ denotes the transpose of $X$ and $(X'X)^{-1}$ denotes the inverse of $X'X$.

As in the simple regression case, these estimates are based on minimizing the sum of the squared residuals (i.e., differences between observed and predicted values of the outcome variable), and the validity of the estimates depends on several assumptions, including linearity, independence, homoscedasticity (constant [[variance]] of errors), and normally distributed errors.
