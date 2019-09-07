---
layout: post
author: Rajat
time: 4
type: blog 
---
There was an error very similar to this that I came across recently - can you guess what caused it?

``` python
>>> from helper import *
...
...
>>> sum([1, 2, 3])
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Users/rajatrasal/anaconda3/envs/spark/lib/python3.7/site-packages/
pyspark/sql/functions.py", line 44, in _
    jc = getattr(sc._jvm.functions, name)(col._jc if isinstance(col, Column) else col)
AttributeError: 'NoneType' object has no attribute '_jvm'
```
<br>
*Why am I getting errors to do with the JVM when I'm using Python's inbuilt sum function?!?!?!* 😰😓

Before we go any further, I want to make it completely clear that **I would never write code like this!** There are so many issues associated with ```import *```-like statements. They polluate the global namespace and make code very unclear which results in many usual errors that, with very little extra effort, are completely avoidable.  

Python is greatly influenced by Java[^java_influence] and C++[^cpp_influence]. By examining how these languages handle errors with ```import *```   statements we can better understand the design of Python and why ```import *``` is always **bad**.

[^java_influence]: Obvious aspects of Python syntax and style, and the syntax of many other languages', is influenced by Java. <span class="inline-links"><a href="https://www.python.org/dev/peps/pep-0318/">https://www.python.org/dev/peps/pep-0318/</a></span> 

[^cpp_influence]: Python's class mechanism is greatly influenced by cpp: <span class="inline-links"><a href="https://docs.python.org/3/tutorial/classes.html">https://docs.python.org/3/tutorial/classes.html</a></span> 

#### Java
In Java, the ```import``` keyword is used to indicated packages and classes from which class/type declarations can be used within the Java file being compiled. There are 2 kinds of imports :
1. **Single type imports**, e.g. ```import java.util.List```, allows us to use a class/type within a file without having to use its fully qualified class name each time. 
2. **On-demand imports**, e.g. ```import java.util.*```, indicates that any class/type within the package could be used within the code without being fully qualified.[^java_interpreter]

These types of imports (and more) are also found in Python with the same behaviour.

[^java_interpreter]: The Java interpeter (i.e. ```java``` command line tool) is responsible for translating the .class file containing the Java bytecode to machine dependent object code which can be run.

This <span class="inline-links">[article](https://docs.oracle.com/javase/8/docs/technotes/tools/findingclasses.html)</span> better explains how the Java compiler goes about finding definitions for classes which have been used within a .java file. It is beyond the scope of this article but may help bridge the gaps in my part explanation.

```Packages``` and ```imports``` (as well as access controls) in Java allow the developer to split up a single namespace to prevent clashing names by maintaining encapsulation. However careless use of on-demand imports can result in the kind of confusing and unnecesary import errors we want to avoid. **So it's best not to use this style of imports altogether, and use fully qualified classnames if required.** Google's code style explicity prohibits <span class="inline-links">[*wildcard imports*](https://google.github.io/styleguide/javaguide.html#s3.3-import-statements)</span> for this reason.

``` java
>>> cat Test.java
import java.util.*;
import java.awt.*;

public class Test {
    public static void main(String[] args) { 
        List x = new ArrayList();
    }
}
>>>
>>>
>>> javac Test.java
Test.java:6: error: reference to List is ambiguous
  List x = new ArrayList();
  ^
  both interface java.util.List in java.util and class java.awt.List 
in java.awt match
1 error
```
<br>

The Java compiler handles this kind of error by throwing an error and preventing the compilation of the file. It seems as if all classes/types found by looking in the packages specified by the ```import``` statements at the top of the file are appended to the global namespace/symbol tables by the compiler, then during the semantic analysis stage of the compilation, an error is thrown when the conflicting class names are found in the class files. Luckily Java is a compiler language, so this bug will never make it to production [^test_pipelines].

[^test_pipelines]: given that your CI/CD pipeline is doing its job...

Even if the on-demand imports don't result in a clash, as the ones above did, they may still increase compile time given that the semantic analyser may have to search through large package structures, especially if the packages have not been converted to jars [^jars]. Although this may not cause a significant time delay for the (re)deployment of an application or result in any latency at runtime, it may slow down CI/CD pipelines and spin up times for Docker containers when testing as a project gets very large, which could be a real nuisance during development.

[^jars]: Of course all large Java projects should be split up into microservices, with each being packaged into a jar, but seeing as we are looking at bad coding practices I thought the case of not converting packages to jars would be appropriate to mention.

One of the most annoying situation I can imagine is when an external package you are on-demand importing gets updated. So if ```external_animal_package``` created its own ```Dog``` one fine day, my code below will suddenly fail, and I'll have to go through the effort of carefully refactoring what, at this stage, might have become a very large java file[^ide].
``` java
import animals.*;
import external_animals_package.*;

public class Test {
    public static void main(String[] args) { 
        Dog x = new Dog();
    }
}
```

[^ide]: Intellij, or even clever usage of sed, might make this process easier, but its still a real pain having to go through it. Just use explicit single type imports to begin with. *Please!*


#### C++
C introduces the concept of namespaces.

#### Back to the problem - Python 
In Python, import all issues come about as a combination of the Java and C++ lanaguage design style. 

Python works differently to Java and takes the latest definition it discovers.

Seems to be the product of having translated Spark's Scala interface to Python without much thought, as well as the - refer to the rule about clarity in the Zen of Python.

### TL;DR
Just use fully qualified explicit imports.

do and dont table
Java 
Cpp
Python

#### References
- https://www.tutorialspoint.com/compiler_design/compiler_design_phases_of_compiler.htm
- https://openjdk.java.net/groups/compiler/doc/compilation-overview/index.html
- Java in a nutshell - Importing Types page 90 - 95