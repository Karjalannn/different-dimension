---
layout: default
title: 《万能遥控》
permalink: /wanneng-yaokong/
---

{% assign chapters = site.posts | where: "column", "万能遥控" | sort: "chapter" %}

<h2 class="chapter-heading">章节<span class="chapter-count">共 {{ chapters | size }} 章</span></h2>

<ul class="chapter-list">
{% for post in chapters %}
  <li class="chapter-item">
    <a class="chapter-title" href="{{ post.url | relative_url }}">{% if post.chapter_label and post.chapter_label != post.title %}<span class="chapter-no">{{ post.chapter_label }}</span>{% endif %}{{ post.title }}</a>
    <span class="chapter-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% else %}
  <li class="chapter-item chapter-empty">这一章还没写呢。</li>
{% endfor %}
</ul>

<p class="post-back">
  <a href="{{ '/' | relative_url }}" class="btn-back">⬅️ 返回首页</a>
</p>
