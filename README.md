# KCL Works

### セットアップ

1. リポジトリをクローンする

   ```bash
   git clone git@github.com:Kyutech-Code-Lab/kcl-works.git
   ```

2. 依存関係をインストールする

   ```bash
   npm install
   ```

3. 開発サーバーを起動する

   ```bash
   npm run dev
   ```

4. ブラウザで `http://localhost:3000` を開く

### 命名規則

#### ブランチ名

以下の形式でブランチ名を付ける

```
接頭辞/issue番号-機能・修正内容
```

例: feature/12-add-login, fix/34-bug-in-header

#### コミットメッセージ

以下の形式でコミットメッセージを付ける

```
接頭辞: 機能・修正内容の簡潔な説明#issue番号
```

例: feature: ユーザーログイン機能の追加 #12

| 接頭辞   | 説明                     |
| -------- | ------------------------ |
| feature  | 新機能の追加             |
| update   | 既存機能の更新           |
| change   | 仕様変更                 |
| fix      | バグ修正                 |
| remove   | 機能の削除               |
| delete   | 不要ファイルの削除       |
| docs     | ドキュメントの変更       |
| style    | コードのフォーマット変更 |
| refactor | コードのリファクタリング |
| test     | テストコードの追加・修正 |
| chore    | その他の雑務             |
