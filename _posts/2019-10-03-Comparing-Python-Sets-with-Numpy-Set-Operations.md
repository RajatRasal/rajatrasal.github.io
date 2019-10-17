---
layout: post
Author: Rajat
time: 10
type: blog
---
Both builtin Python sets and NumPy arrays (ndarrays) allow us to efficiently perform set operations where Python lists would be impractical. Due to the differences in their underlying implementations however, their behaviour and therefore the types of problems they can be used to solve varies greatly. I want to elaborate on this with a few examples [^fluent_python].

[^fluent_python]: For those of you who have read it, you'll realise this article is greatly influenced by the chapter on sets and dictionaries in Fluent Python. 

### Numpy Arrays
Ndarrays implement a strided view of memory. So the same block of contiguously allocated data can be viewed differently by changing how the ndarray structure points to the underlying data. We do this by changing the number of bytes needed to reach the next element in an array, i.e. the strides of that array.We can think of ndarrays are more of a **wrapper for a block of data**.
 
- Give ipython example
- Diagram

### Sets 


Show Cpython example for set hash function

### An experiment - Needles in a haystack
To illustrate the behaviour of sets and numpy set operations, I will perform a simple timing experiment. I will initialise a la I will initialise the a set and an numpy array with the same valyes

#### Insserting
#### Searching 

### Profiling 

### Conclusion
Np arrays are optimised for complex mathematical problems and performance speed, in that the underlying data is never changed but might need to be copied across if size becomes an issue. We can build out large and complicated N-dimensional mathematical spaces. However for the simpler task of flexibility and indexing of data, in the case of a database or data warehouse client, a set is far more useful, since we can index large chunks of unstructured data (data does not have to be the same type). Insert and search times are far faster when using a hash table. 

### Further reading 
- Numpy paper https://arxiv.org/pdf/1102.1523.pdf
- https://jakevdp.github.io/PythonDataScienceHandbook/01.07-timing-and-profiling.html
- https://ipython-books.github.io/43-profiling-your-code-line-by-line-with-line_profiler/
- Chapter 18-19 Beuatiful Code
