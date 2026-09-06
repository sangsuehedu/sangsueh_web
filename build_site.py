# -*- coding: utf-8 -*-
import os, sys

scratch_dir = '/Users/babychen/.gemini/antigravity/scratch/summer_magazine_plan_c'
dropbox_dir = '/Users/babychen/Dropbox/尚學CMS.EDU/0尚學/行銷/網頁/2026暑期雙月成果誌_網頁原始碼'

# Extract footer HTML and CSS from summer-2026.html
with open(os.path.join(scratch_dir, 'summer-2026.html'), 'r', encoding='utf-8') as f:
    s_html = f.read()

footer_start = s_html.find('<footer class="site-footer">')
if footer_start == -1:
    footer_start = s_html.find('<footer class="footer-clean">')
footer_end = s_html.find('</footer>', footer_start) + len('</footer>')
shared_footer_html = s_html[footer_start:footer_end]

css_start = s_html.find('/* ========================================================\n       尚學文教官方品牌旗艦頁尾')
css_end = s_html.find('/* Lightbox Modal', css_start)
if css_end == -1:
    css_end = s_html.find('</style>', css_start)
shared_footer_css = s_html[css_start:css_end]

print("Footer extracted successfully.")
