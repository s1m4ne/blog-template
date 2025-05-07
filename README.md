# ブログテンプレート (Blog template)

このリポジトリは、[Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) を基にカスタマイズされたブログテンプレートです。オリジナルのデザインと機能を基に、デザインの変更と一部機能の変更を行いました。個人的に使用していたリポジトリを後からテンプレート化したため、コードにおかしな点やカスタマイズしにくいような構造になっているかもしれません。予めご了承ください。


This is a blog template customized based on the [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog). The template has been adjusted and personalized, building upon the original design and features to meet specific requirements.

## デモ (Demo)

このテンプレートを使って作成したブログのデモは、以下のリンクからアクセスできます：[https://s1m4ne.github.io/blog-template/](https://s1m4ne.github.io/blog-template/)

This is a demo of the blog created using this template, and it can be accessed from the following link:[https://s1m4ne.github.io/blog-template/](https://s1m4ne.github.io/blog-template/)


# ブログテンプレートのカスタマイズ内容(Customizations to the Blog Template)

### 日本語

以下は、このブログテンプレートに加えた主な変更点です。

1. **ヘッダーのアニメーション実装**  
   スクロール時に変形するアニメーション付きのヘッダーを実装しました。

2. **タグの表示改善**  
   タグが英語の大文字のみ表示されていたのを、日本語や小文字も表示できるように改善しました。

3. **タグページでの記事数表示**  
   タグページの右上に記事数を表示し、記事数に応じてそのサイズが大きくなるように設定しました（これは「タグクラウド」機能として一般的に知られています）。

4. **トップページのデザイン改訂**  
   トップページのデザインを大幅に改訂し、より魅力的で使いやすいレイアウトに変更しました。

5. **読書時間の計算**  
   各記事の読み終わるまでの時間を計算し、表示するようにしました。

6. **グラデーション背景色の追加**  
   デザインにグラデーション背景色を追加し、視覚的に魅力的にしました。

7. **Blogページのレイアウト変更**  
   Blogページのレイアウトを大幅に変更し、よりモダンで直感的に操作しやすいデザインにしました。

### English

Here are the main changes made to this blog template:

1. **Header Animation Implementation**  
   Implemented a header with an animation that transforms as you scroll.

2. **Improved Tag Display**  
   Improved the tag display to support Japanese and lowercase letters, in addition to uppercase English letters.

3. **Article Count Display on Tags Page**  
   Added the number of articles in the top right corner of the tags page, with the size increasing based on the number of articles. This is commonly known as the "Tag Cloud" feature.

4. **Redesign of the Homepage**  
   Significantly redesigned the homepage to make it more attractive and user-friendly.

5. **Reading Time Calculation**  
   Implemented a feature to calculate and display the estimated reading time for each article.

6. **Addition of Gradient Background Color**  
   Added a gradient background color to enhance the visual appeal of the design.

7. **Layout Changes on Blog Page**  
   Significantly revamped the layout of the Blog page to provide a more modern and intuitive user experience.

# デプロイ方法(Deployment Method)
1. リポジトリの Setting > Pages > Source > GitHub Actions を選択します。
2. main ブランチにコミットしてpushします（README.md を GitHub 上から更新するとすぐに公開できます）。

1.	Go to the repository’s Settings > Pages > Source and select GitHub Actions.
2.	Commit and push to the main branch (updating the README.md directly on GitHub will automatically publish the site).
