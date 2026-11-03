---
layout: default
title: 《万能遥控》
permalink: /wanneng-yaokong/
---

<p class="column-intro">每周五放学，C1 栋负一层的停车场里，石山松都会撕开一扇通往异界的门。他是「辰星」的「异界使者」，手里那块能变形为短剑、光剑与魔杖的圆盘，叫「万能遥控」。而我，伍月楣，替他守了这个秘密七年。</p>

{% assign chapters = site.posts | where: "column", "万能遥控" | sort: "chapter" %}

<h2 class="chapter-heading">章节<span class="chapter-count">共 {{ chapters | size }} 章</span></h2>

<ul class="chapter-list">
{% for post in chapters %}
  <li class="chapter-item">
    <span class="chapter-no">{{ post.chapter_label | default: post.chapter }}</span>
    <a class="chapter-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
    <span class="chapter-date">{{ post.date | date: "%Y-%m-%d" }}</span>
  </li>
{% else %}
  <li class="chapter-item chapter-empty">这一章还没写呢。</li>
{% endfor %}
</ul>

<p class="post-back">
  <a href="{{ '/' | relative_url }}" class="btn-back">⬅️ 返回首页</a>
</p>
