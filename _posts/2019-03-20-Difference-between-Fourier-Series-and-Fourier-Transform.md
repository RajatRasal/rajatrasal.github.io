---
layout: post
author: Rajat
time: 10
type: blog 
---
The **Fourier Series[^fs] of a periodic function allows us to represent the function in terms of a summation of sinusoids** (sines and cosines of varying powers). The **Fourier Transform extends this concept to aperiodic functions** (functions which are not periodic), by letting the period of the function go to $$\infty$$. In this article, I want to elaborate further on thow these two concepts differ by providing graphical visualisations of each[^insp].

[^fs]: I first read about the Fourier series at A-level when I trying to make sense of <a href="http://coding-geek.com/how-shazam-works/" class="inline-links">how the Shazam app works</a>. 
[^insp]: This article is in part inspired by this <a href="https://en.wikipedia.org/wiki/Fourier_transform#/media/File:Fourier_transform_time_and_frequency_domains_(small).gif" class="inline-links">gif</a>. I want to be able to do this for a more complicated example than a square wave and also write code to do it.

##### Fourier Series
A periodic function $$f(t)$$, with period $$T=2l$$, defined over $$[t_0, t_0+T]$$, can be approximated by a summation of sinusoids as follows:

$$
\begin{align}
  f(t) \approx f^N(t) &= \sum^N_{k=-N} c_k e^{i \omega_k t} & (1) \\
                      &= a_0 + \sum^N_{k=1} a_k cos(\omega_k t) + b_k sin(\omega_k t) & (2)
\end{align}
$$

where $$\omega_k = \frac{2 \pi k}{T}$$.

When it comes to using $$(1)$$, and given that we often assume $$t_0 = 0$$, we can find $$c_k$$ by:

$$c_k = \frac{1}{T} \int_{0}^{T} f^N(t) e^{-i w_k t} dt = \frac{1}{T} \int_{0}^{T} f(t) e^{-i w_k t} dt \quad (3)$$

since $$f^N(t) \rightarrow f(t)$$ as $$N \rightarrow \infty$$[^snd_method].

[^snd_method]: $$(2)$$ can be a lot simpler to use but requires much more working: $$ \\ \begin{align} a_0 &= \frac{1}{T} \int_{-l}^{l} f(t) dt \\ a_k &= \frac{2}{T} \int_{-l}^{l} f(t) cos(\omega_k t) dt \\ b_k &= \frac{2}{T} \int_{-l}^{l} f(t) sin(\omega_k t) dt \\ \end{align}$$

A proof for how **(1)** = **(2)** can be found <a class="inline-links" href="http://lpsa.swarthmore.edu/Fourier/Series/DerFS.html">here</a>, and an example Fourier series approx. using both methods (1) and (2) can be found <a class="inline-links">here</a>.

##### Fourier Transform
To begin with, it is important to notice the change in the behaviour of the Fourier Series approximation of a function as the **periodicity $$T$$ increases**. If we take the function $$f(t) = $$

We can sketch out the intuition behind the Fourier transform by starting at $$(1)$$ and considering infinitesimals.



Have the complex version of the formula and then show how this leads to the 3 equations.  

By using the Fourier Transform we can describe a signal/waveform as a complex function of its frequency. So **given any frequency as input, we get a complex number as an output whose magnitude describes the amplitude of the waveform at that frequency** (loudness of that particular frequency) and whose angle describes the relative phase of the wave. In many cases, this relative phase is unimportant and we can focus on the <a href="https://www.researchgate.net/figure/Frequency-spectrum-of-the-laser-vibrometer-measurement_fig4_233858387" class="inline-links">frequency spectrum</a> present in the sampled waveform. For example, if we consider some sound wave, then by using a Fourier Transform we can break this down into different frequencies represented by sinusodial waves of different relative phase to each other. We can take the magnitude of these waves and see how the frequency of a wave corresponds to the amplitude of the wave in order to gauge which frequencies are producing the loudest sounds in a song[^shazam_2].

[^shazam_2]: This is how Shazam makes hashes of songs to then be looked up in its database.

##### Comparing FS and FT 
Now we are at a point where we can find the FS of a wave and see what the FT of that wave reveals. Let's see how the spectrum of the 

Then 3D graphs for the s-plane showing the fractions of the waves at each harmonic.

##### Conclusion

##### Further Reading + References:
- <a class="inline-links" href="https://books.google.co.uk/books?id=X-RFRHxMzvYC&pg=PA192&dq=%22The+Fourier+integral+can+be+regarded+as+an+extension+of+the+concept+of+Fourier+series%22&hl=en&sa=X&ved=0ahUKEwj0iOuE_ZnhAhUCqXEKHZyICFoQuwUILTAA#v=onepage&q=%22The%20Fourier%20integral%20can%20be%20regarded%20as%20an%20extension%20of%20the%20concept%20of%20Fourier%20series%22&f=false">Advance Engineering Mathematics Volume 2 by H.C Taneja</a> 
- <a class="inline-links" href="http://lpsa.swarthmore.edu/Fourier/Series/DerFS.html">Proofs for Fourier Series Constants + Exponential and Trigonometric forms of series</a>
- <a class="inline-links" href="https://en.wikipedia.org/wiki/Frequency_domain#Magnitude_and_phase">Magnitude and Phase of Fourier Transform</a>

---
