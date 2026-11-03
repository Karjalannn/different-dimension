---
layout: default
title: Hi!!!我是柯宇！
---

# 异乡之翼

<h2 class="sec-title">连载 · 《万能遥控》</h2>

<p class="column-intro"><a class="column-more" href="{{ '/wanneng-yaokong/' | relative_url }}">进入栏目 →</a></p>

<ul class="post-list">
{% for post in site.posts %}
  {% if post.column == '万能遥控' %}
  <li class="post-item">
    <h2 class="post-item-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
    <p class="post-item-meta">{{ post.chapter_label }} · {{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-item-excerpt">{{ post.content | strip_html | normalize_whitespace | strip | truncate: 79, "…" }}</p>
  </li>
  {% endif %}
{% endfor %}
</ul>

<h2 class="sec-title">随笔</h2>

<ul class="post-list">
{% for post in site.posts %}
  {% unless post.column %}
  <li class="post-item">
    <h2 class="post-item-title"><a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a></h2>
    <p class="post-item-meta">{{ post.date | date: "%Y-%m-%d" }}</p>
    <p class="post-item-excerpt">{{ post.content | strip_html | normalize_whitespace | strip | truncate: 79, "…" }}</p>
  </li>
  {% endunless %}
{% endfor %}
</ul>

<h2 class="sec-title">作品演示</h2>

<ul class="demo-list">
  <li class="demo-item">
    <a class="demo-link" href="{{ '/jiejiaoxian.html' | relative_url }}" target="_blank" rel="noopener">立体截交线 · 三维交互演示 ↗</a>
    <p class="demo-desc">单个 HTML 文件，Three.js 全部内联、断网也能跑：切换立体、拖动截平面，实时看截交线与三视图。</p>
  </li>
</ul>
