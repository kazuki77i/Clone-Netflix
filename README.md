このリポジトリは Next.js + TypeScript + Tailwind で構築した Netflix クローンです。

## セットアップ

1. 依存関係のインストール

```bash
npm install
```

2. 環境変数の設定

`.env.example` をコピーして `.env.local` を作成し、TMDB の認証情報を設定します。

```bash
cp .env.example .env.local
# Windows の場合
copy .env.example .env.local
```

`.env.local` の内容:

```
# どちらか一方があれば動作します（優先: V4 トークン）
TMDB_API_V4_TOKEN=tmdb_v4_access_token
TMDB_API_KEY=tmdb_v3_api_key
TMDB_API_BASE=https://api.themoviedb.org/3
```

3. 開発サーバ起動

```bash
npm run dev
```

ブラウザで `http://localhost:3000` を開いて確認します。

## 機能

- ホーム: トレンド、人気、トップレート、ジャンル別の行
- 検索: 作品名で検索
- 詳細: 作品の概要と関連作品
- 画像最適化・ローディングUI（スケルトン）

## TMDB について

本アプリは `image.tmdb.org` の画像と TMDB API を利用します。API キーはクライアントに露出しないよう、サーバサイド/プロキシ経由で利用します。
