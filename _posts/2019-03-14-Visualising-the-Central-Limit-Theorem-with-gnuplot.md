---
layout: post
author: Rajat
time: 10
type: blog 
---
```Gnuplot``` is a command line based graphing tool that has really stood the test of time. Three decades on it is still quite popular and commonly used in university maths courses for demonstrations. I was excited to get hands on with it and get a feel for what it is like. 

#### Background: gnuplot
I am absolutely in awe of how well supported and feature-rich gnuplot is:

- it can export plots to a number of different formats (PNG, SVG, JPEG and even LaTeX)
- generate LaTeX snippets which can be included directly in a TeX file
- has APIs for every **popular** programming language (and also Haskell *sigh*)

After just scratching its surface, its influence on modern day graphing libraries, such as matplotlib in Python, are obvious.

I thought a nice example to explore some of gnuplot's vast array of features would be to visualise the central limit approximation with it.

#### Central Limit Theorem
The CLT states that the mean of a sample of $$n$$ independently and identically distributed random variables is distributed normally [^weak_form]. 

[^weak_form]: This is a weak form of the CLT. There are many other ways of describing the CLT which are far more meaningful in practice.

So take a random variable $$X \text{~} \textit{d}(\mu, \sigma^2)$$, then the sample {$$X_1,...,X_n$$} is such that $$X_1 \text{~} \textit{d}(\mu, \sigma^2)$$, $$X_2 \text{~} \textit{d}(\mu, \sigma^2)$$ and so on. We can define the mean of the sample as being $$S_n = \frac{X_1 + ... + X_n}{n}$$. Now I propose to you that $$S_n \text{~} \mathcal{N(\mu, \frac{\sigma^2}{n})}$$ [^proof_sum], which I will verify graphically below [^proof].

I won't go into this in much more detail here.

[^proof_sum]: As you can probably tell, we can alter this derivation slightly and see that the sum of the $$n$$ i.i.d random variables will also be normally distributed. 

[^proof]: There are many resources which much better describe <a class="inline-links" href="http://www.cs.toronto.edu/~yuvalf/CLT.pdf">how to prove the CLT</a>. I have just stated it here so that I can get on with some coding.

#### Sampling with Python
I wrote a short Python script which does the following: 
  1. Calculates the means of $$n$$ **samples taken from a Poisson distribution** with a rate parameter of 5, where n = 1, 2, 5, 10, 50, 100 and 1000. Each individual sample has 100 points in it.
  2. From the list of the n means, we tabulate the number of times each mean occurs in the list i.e. the frequency of each mean in the list.
  3. Each list of mean-frequency pairs is then dumped into a separate file. Each file is in a format which gnuplot can interpret.

``` python
def generate_plotting_values():
    # Mean of the distribution
    sample_mean = 5
    # Size of each sample
    sample_size = 100
    # Number of samples
    sample_nos = [1, 2, 5, 10, 50, 100, 1000]
    
    for sample in sample_nos:
        # Initialise empty list to hold the mean of each sample.
        means = np.zeros(sample)
        
        for i in range(sample):
            # Generate 100 instances about a mean of 5.
            poisson_sample = generate_poisson_sample(sample_mean, sample_size)
            # Calculate the mean of the sample and store it in the list.
            means[i] = calculate_sample_mean(poisson_sample)
            
        # Tabulate the number of occurances (frequency) of each mean and 
        # return this as a list of tuples :: [(mean, freq1)] 
        freq_pairs = calculate_frequencies(means)
        
        # Write the frequency pairs to a file in the format expected by gnuplot.
        filename = f'{sample}_sample.dat'
        write_sample_to_gnuplot_format(freq_pairs, filename)
```

Refer to this <span class="inline-links"><a href="https://gist.github.com/RajatRasal/a2179017cdb19a8175f6b6c25a27c2c4">gist</a></span> for the full code.

So when n = 50, 100 values are taken from the $$Poi(5)$$ distribution 50 times. For each set of 100, the mean is calculated and appended to the list ```means``` (above). We calculate the frequecy at which each mean occurs and add each mean-frequency pair to a list. This list is then written to a file.

<figure align="center">
  <img src="{{ site.url }}/assets/images/visualising_clt/mean_freq_pair.png" width="620px" height="200px">
  <figcaption>Mean-frequency list for 50 samples of size 100 each</figcaption>
</figure>

#### Visualisation with gnuplot
I then wrote some gnuplot graph specification files to plot the collected frequency data. The first one plotted each set of means on the sample graph. A **Bezier** curve [^bezier] is used to <span class="inline-links"><a href="http://heim.ifi.uio.no/inf3330/scripting/doc/gnuplot/Kawano/plot2-e.html">plot a smooth line</a></span> through the points.

[^bezier]: This curve gets its name from Pierre Bezier, a designer at Renault in the 1960s, who used this curve to shape the cars bodies. For more links click <span class="inline_links"><a href="https://books.google.co.uk/books?id=3ndQH4mTzWQC&pg=PA119#v=onepage&q&f=false">here</a></span>.

<script src="https://gist.github.com/RajatRasal/a2179017cdb19a8175f6b6c25a27c2c4.js?file=clt_comparison.plot"></script>

It is quite clear that the mean approaches 5 as we increase $$n$$.

<figure align="center">
  <img src="{{ site.url }}/assets/images/visualising_clt/clt1.png" height="400px" width="600px" alt="clt comparison">
  <figcaption>Comparison of CLT for the means of samples of varying sizes</figcaption>
</figure>

I also created a mutliplot to make the comparison more clear. The code for this plot can also be found in this <span class="inline-links"><a href="https://gist.github.com/RajatRasal/a2179017cdb19a8175f6b6c25a27c2c4">gist</a></span>.

<figure align="center">
  <img src="{{ site.url }}/assets/images/visualising_clt/clt2.png" height="450px" width="600px" alt="clt mulitplot comparison">
  <figcaption>Comparison of CLT for varying sample sizes as a mutliplot</figcaption>
</figure>

---
