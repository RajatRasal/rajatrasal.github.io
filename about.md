---
layout: default
title: About
---
### > `whoami`
I am a 2nd year student currently studying **Computing at Imperial College London**.
 
When I'm coding, I'll almost always be using **Python** and **Bash** (in <a class="inline-links" href="https://github.com/RajatRasal/vimrc">VIM</a>), but I have used a wide range of other programming languages and tools since **I started programming around 6 years ago**. These range from using cloud based technologies, such as **GCP and AWS**, and DevOps technologies, **Docker and Kubernetes**, to **JAVA** for most of my university projects and **C++ and C** for low level things, amongst many others. Web dev is fun too (I'm loving <a class="inline-links" href="https://medium.com/javascript-scene/the-typescript-tax-132ff4cb175b">Typescript</a> at the moment).

I would say I'm a full-stack developer with a good understanding of machine learning and data science concepts.

##### Experience
After working under <a class="inline-links" href="https://www.imperial.ac.uk/people/g.gorman">Gerard Gorman</a> and <a class="inline-links" href="https://www.imperial.ac.uk/people/p.kelly">Paul Kelly</a> at **IC last summer as a software research intern**, I became very interested in Machine Learning and Data Science. This was in part due to Gerard letting me borrow his copy of <a class="inline-links" href="https://www.amazon.co.uk/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1491962291">"Hands-On Machine Learning with Scikit-Learn and TensorFlow" by Aurélien Géron</a> (which I am yet to return) [^keras], which is an absolutely amazing book. 

[^keras]: There is a new version <a class="inline-links" href="https://www.amazon.co.uk/Hands-Machine-Learning-Scikit-Learn-TensorFlow/dp/1492032646/ref=pd_lpo_sbs_14_img_1/258-0149394-3034873?_encoding=UTF8&psc=1&refRID=D3YB5NMRD2P0RVTAKHM9">coming out soon</a> which includes Keras!

I've interned at **Bank of Tokyo Mitsubishi** and <a class="inline-links" href="https://www.pythonanywhere.com">**PythonAnywhere**</a> [^pa] for software engineering, and most recently held a **Data Science and Engineering intern position at HSBC**, where my work led to the development of a number of new and innovative projects which are currently being put into production.

{% for file in site.static_files %}
{% if file.name contains 'pythonanywhere' %}
[^pa]: PA works closely with the Python organisation and host the IDE present on <a class="inline-links" href="https://www.python.org">the Python website</a> <img src="{{ file.path }}" alt="Pythonanywhere on Python site" width="400" height="180">.
{% endif %}
{% endfor %}

##### Projects
I've worked on a number of large software engineering projects:
- **NotepaceAR** - An innovative mobile app for students who are visual-spacial learners. Students can post interactive virtual post-it notes through their camera using **AR technology**, which they can later view for interactive revision on their own or with friends.
- **WACC Compiler** - Used Java and ANTLR tool to create a compiler for the WACC programming language. 
- **PintOS** - Optimised/developed key features of a simple Operating System for the 80x86 architecture in a small team using C.
- **Cricket Scorecard** - Web based cricket scorecard using Django, JQuery and a Node.js server to post real-time score updates to Twitter.

I've also have worked on some awesome ML and Data Science projects:
- **Multivariate Bitcoin time series forecasting**.
- Performed a detailed data analysis and made predictions on the UK Road Accident’s dataset for <a class="inline-links" href="">Imperial AI Hack 2018</a>.
- **Predicted stocks movements based on sentiment analysis of Donald Trump’s tweets** at <a class="inline-links" href="">Hackkings</a>. We were runners up in <a class="inline-links" href="">Capital One</a> Financial Challenge.
- Used NLP models to **predict the success of a Kickstarter campaign**. 


You can find out more about some of my projects in my CV (in the footer), or at <a href="https://github.com/RajatRasal"><i class="fab fa-github-alt github-ic-inline"></i></a>.

##### Get in touch 
{% for file in site.static_files %}
  {% if file.name contains 'rajat_cv' %}
  Check out a more comprehensive <a class="inline-links" href="{{ file.path }}">CV</a> if you're interested.
  {% endif %}
{% endfor %}

{% for file in site.static_files %}
  {% if file.name contains 'email1' %}
    {% assign email1 = file %}
  {% endif %}
  {% if file.name contains 'email2' %}
    {% assign email2 = file %}
  {% endif %}
{% endfor %}

If you want to discuss anything I've mentioned above (or you're an just Imperial CompSci who wants to bitch about the course and life in general) then feel free to add me on <a href="https://www.facebook.com/rajat.rasal.52"><i class="fab fa-facebook-f facebook-ic-inline"></i></a>. Contact me at <img src="{{ email1.path }}" alt="email1" height="22" width="140"> or (more preferably) <img src="{{ email2.path }}" alt="email2" height="22" width="100"> if you want to do something a bit bigger. I'm always interested in what others are working on (particularly in the ML and Python space) and love collaborating with others on useful and interesting projects. <span class="error">**I've attached my email addresses as images to prevent any annoying crawlers/scrapers from capturing them and spamming me**</span>. Sorry for the inconvenience 😇.

---
