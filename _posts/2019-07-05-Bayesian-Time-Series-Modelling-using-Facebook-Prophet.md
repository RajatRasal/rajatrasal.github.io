---
layout: post
author: Rajat
time: 10
type: blog 
---
Time series analysis is known to be a particularly challenging area of data science. I would put this down to three key factors:
1. **Datasets tend to be quite small.** So given 10 years of weekly data for example, this boils down to only around 520 usable data points *assuming the dataset is clean, well-structured and has no outlier/anomalies*. From this we may need to accurately forecast a trend for the next quarter which is obviously a challenging task[^example].
2. Following on from the previous point, **the rate of global change is increasing**. So although the historal data may suggest a certain trend, this may no longer be the case for the last 5 years. If we then try to analyse data from the last 5 years only, there may be too few data points to make any reliable predictions. An obvious example would be global climate temperature or global population growth.
3. **Many factors affecting the response variable cannot be captured in the dataset**. This is the case with most datasets and it is of course the job of the data scientist to engineer meaningful features to factor into the model. However, a lot of factors are circumstantial and can be near impossible to engineer e.g. factors affecting the bitcoin bubble prior to January 2018 or natural disasters which could cause an economy to collapse. New factors will also arise which were not meaningful in the context of the historical data. 

With so many factors at play, data scientists need a very thorough understanding of a time-varying system to provide useful insights. As a result, clients prefer *simpler*, explainable model with some confidence interval then a complicated one. So although a machine learning algorithm might be better able to learn unusual trends and features, it is essentially a black-box in terms of *what* it has learned. **A statistical model might be preferred.**

*Traditional* time series forecasting techniques from the ARMA family of models, showcase their strengths when there are noticeable patterns in the data (i.e seasonality and stationarity trends). Information about such patterns can be used directly to create the model. However, when there is some known business trend/insight which cannot be inferred from the data, the intuition for sampling and fitting a model on a prior becomes far more evident, as the underlying trends can be  Hence the need and **increasing popularity of Bayesian modelling techniques.**

Facebook has done a particularly good job at addressing this issue with their <span class="inline-links">[**Prophet API**](https://facebook.github.io/prophet/docs/quick_start.html)</span>. It uses a Markov Chain Monte Carlo (MCMC) sampling algorithm to fit and forecast time series data. It won't go into the details of the algorithm here but will rather focus on the software engineers perspective of how usable the package is and how its performance compares to ARMA models and RNNs[^more_info].

[^example]: The given example is the kind of thing you might come across when doing a Kaggle challenge or kernel. A more real world scenario might be if you were given 5 years worth of data regarding client transactions at uneven time intervals with features/columns split across tens of data sources. After joining together all the sources and selecting relevant features, you may end up with a few million records and a few hundred features. There will be many null values and a lot of duplication in the transactional data, purely down to the inefficient way in which data tends to be collected and inputted into large systems by humans (or computers) across many countries. After cleaning all of this up, you realise that each client only has a few hundred usable datapoints. A very skilled data scientist is needed at this stage to be able to do any meaningful data analysis and accruately identify trends.

[^more_info]: Refer to the 'Further Reading + References' section for more info on MCMC.

### Example: Temperature 
The following example uses the <span class="inline-links">[Earth surface temperature dataset](https://www.kaggle.com/berkeleyearth/climate-change-earth-surface-temperature-data)</span> on Kaggle put together by the <span class="inline-links">[Berkeley Earth](http://berkeleyearth.org/data/)</span> team.

##### Facebook Prophet
We rename columns to Prophet's expected format. There need to be 'ds' and 'y' columns; 'ds' will be in a Pandas datestamp or Pandas timestamp format and 'y' will be the numeric feature we want to forecast.
``` python
import pandas as pd

uk_avg_temp = pd.read_csv(...)

# Convert date strings to datetime objects.
uk_avg_temp['dt'] = pd.to_datetime(uk_avg_temp.dt)

columns = {'dt': 'ds', 'AverageTemperature': 'y'}
uk_avg_temp.rename(columns=columns, inplace=True)
```

<br>
We perform the train-test split and can train the out-of-the-box model on the training data.
``` python
from fbprophet import Prophet

model = Prophet()
model.fit(train)
```

<br>
A dataframe needs to be initialised to hold the forecasted values. **The default units of a period in Prophet are days**. We can change this by setting the ```freq``` argument.
``` python
# Forecast intervals will be month wise, so we set the future 
# df to being in monthly units.
future = model.make_future_dataframe(periods=len(test), freq='M')
forecast = model.predict(future)

model.plot_components(forecast)
```
<figure align="center">
  <img src="{{ site.url }}/assets/images/prophet_plot_components.png" height="400px" width="600px" alt="Components of the model">
  <figcaption>Prophet allows us to view the different components of the data which it has learnt.</figcaption>
</figure>

Prophet also produces an error bound under the ```yhat_lower``` and ```yhat_upper``` fields in the forecast dataframe. The expected forecast is under ```yhat```.
<br>
``` python
plt.fill_between(forecast.ds, forecast.yhat_lower,
                 forecast.yhat_upper, color='k', 
                 alpha=.2, label='confidence interval')
plt.plot(test.index, test.AverageTemperature, color='red', 
         label='actual')
plt.plot(forecast.ds, forecast.yhat, color='blue', 
         label='predicted')
plt.legend()
plt.show()
```
<figure align="center">
  <img src="{{ site.url }}/assets/images/prophet_forecast.png" height="150px" width="600px" alt="Components of the model">
  <figcaption>Forecast from Prophet model</figcaption>
</figure>



##### Comparison to ARIMA

##### Comparison to LSTMs

### Example: AAPL Stock Prices 
Refer to <span class="inline-links">[this]()</span> Jupyter notebook for another example where I specify custom seasonalities for the same model and train model regressors to catch these separate patterns. 


##### Conclusion
- Easier to use for non-experts
- 
- Accuracy Metrics
- Training Time
- Tuning Time
Prophet is a great untuned baseline. For another example of 

##### Further Reading + References:
{% for file in site.static_files %}
  {% if file.name contains 'time_series' %}
- <span class="inline-links">[Challenges to Time Series Analysis in the Computer Age]({{ file.path }})</span> by Clifford Lame from LSE
  {% endif %}
{% endfor %}
- <span class="inline-links">[Sorry ARIMA, but I’m Going Bayesian](https://multithreaded.stitchfix.com/blog/2016/04/21/forget-arima/)</span> from Kim Larsen's blog
- <span class="inline-links">[An Interactive Guide To The Fourier Transform](https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/)</span>

---
