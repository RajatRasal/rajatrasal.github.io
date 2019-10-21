---
layout: post
Author: Rajat
time: 10
type: blog
---
Both builtin Python sets and NumPy arrays (ndarrays) can efficiently perform set operations where Python lists would be impractical. Due to the differences in their underlying implementations however the types of problems they can be used to solve varies greatly. I want to elaborate on this with a few examples [^fluent_python].

[^fluent_python]: For those of you who have read it, you'll realise this article is greatly influenced by the chapter on sets and dictionaries in Fluent Python. 

#### Sets 
Python sets are implemented very similarly to dictionaries; both use a hash table to store values in an index given by hashing a key. However for a set the value being stored will be the same object that was used to calculate the index, as opposed to a dictionary which behaves like a hash(key)-\>value map. 

- diagram of ```set_add_entry``` and ```set_lookkey``` function

For this reason, the set implementation shares a lot of its code with the ```dict```. Since dictionaries form the basis of Python's most pivotal language features, such as its object model and namespacing behaviour, they need to be optimised for fast entry lookup, creation and deletion with minimal memory usage. Sets share many of these core optimisations, resulting in very good performance [^optimisations].

[^optimisations]: The implementation of the Python dictionary is known for its simplicity. It has some simple optimisations which have been shown to improve performance based on 'real-life benchmarking' (Chapter 18 - Beautiful Code, Oram et al.). Some of these include collision prevention algorithms, table resizing policies and using a free list of previously ```malloc```ed dictionary structs.

- Set struct

Take <span class='inline-links'>[set intersection](https://wiki.python.org/moin/TimeComplexity)</span> ```x.intersection(y)``` $$\equiv x \cap y \in O(len(x) * len(y))$$; this operation offers us a clean way to check the membership of a set $$x$$ from a set $$y$$. The <span class="inline-links">[CPython interpreter](https://github.com/python/cpython/blob/master/Objects/setobject.c)</span> implements this operations simply by checking whether each entry in y is in x and returning a new set with the intersecting values. 

- implementations details or gist
- use pdb or ipython to show line by line

#### Numpy Arrays
Ndarrays implement a strided view of memory. So the same block of contiguously allocated data can be viewed differently by changing how the ndarray structure points to the underlying data. We do this by changing the number of bytes needed to reach the next element in an array, i.e. the strides of that array. We can think of ndarrays are more of a **wrapper for a contiguous block of memory**.
 
- Give ipython example
- Diagram

Although numpy doesn't offer a set data structure on top of ndarrays, we can still efficiently perform set operations on the data that we are indexing. This is mainly due to the highly efficient vectorised functions numpy can perform. For this reason, Numpy's [one-dimensional set intersection](https://docs.scipy.org/doc/numpy/reference/generated/numpy.intersect1d.html) implementation is quite unintuitive. I have removed some of the control flow from the [production code](https://github.com/numpy/numpy/blob/v1.17.0/numpy/lib/arraysetops.py#L335-L429) and presented a simplified version below.

- simplified code

Discuss runtime - behaviour of concat function and which type of sort is being used. Discuss how this implementation extends to the other one-dimensional set functions in numpy also.

#### An experiment - Needles in a haystack
As a result, numpy set operators result tend to be comparable but very slightly slower in terms of speed to the builtin set.

To illustrate this behaviour of sets and numpy set operations, I will perform a simple timing experiment. This is quite similar to the experiment described in Fluent Python. I will initialise a la I will initialise the a set and an numpy array with the same valyes

#### Inserting - building a haystack
- Main overhead with numpy comes from the malloc during concatenate
- Numpy is not so much for high speed data read and writes but for transformative operations on data, hence why a contiguous block of memory is malloced and manipulated.

#### Searching - looking for needles 
- Change order of magnitude of the haystack and needles


#### 

### Profiling 

### Conclusion
Np arrays are optimised for complex mathematical problems and performance speed, in that the underlying data is never changed but might need to be copied across if size becomes an issue. We can build out large and complicated N-dimensional mathematical spaces. However for the simpler task of flexibility and indexing of data, in the case of a database or data warehouse client, a set is far more useful, since we can index large chunks of unstructured data (data does not have to be the same type). Insert and search times are far faster when using a hash table. 

### Further reading 
- Numpy paper https://arxiv.org/pdf/1102.1523.pdf
- https://jakevdp.github.io/PythonDataScienceHandbook/01.07-timing-and-profiling.html
- https://ipython-books.github.io/43-profiling-your-code-line-by-line-with-line_profiler/
- Chapter 18-19 Beuatiful Code
